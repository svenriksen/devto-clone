import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { get } from "http";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({
      title: z.string(),
      tags: z.array(z.string()),
      content: z.string(),
      coverImage: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.post.create({
        data: {
          title: input.title,
          tags: input.tags,
          content: input.content,
          createdBy: { connect: { id: ctx.session.user.id } },
          createdAt: new Date(),
          coverImage: input.coverImage,
        },
      });

    }),

  getPostById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    return await ctx.db.post.findUnique({ where: { id: input.id } });
  }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    return post ?? null;
  }),

  getAllLatestPosts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  getTopReactionWeek: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany({
      // orderby reaction count
      include: {
        _count: {
          select: {
            Comments: {
              where: {
                // range query
                // createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
                createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },

              },
            },
            Reaction: {
              where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },

            },
          },
        },
      },
      orderBy: [
        {
          Reaction: {
            _count: "desc",
          },
        },
        {
          Comments: {
            _count: "desc",
          }
        },
      ],

    });
  }),

  getTopReactionMonth: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany({
      // orderby reaction count
      include: {
        _count: {
          select: {
            Comments: {
              where: {
                createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
              },
            },
            Reaction: {
              where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },

            },
          },
        },
      },
      orderBy: [
        {
          Reaction: {
            _count: "desc",
          },
        },
        {
          Comments: {
            _count: "desc",
          }
        },
      ],

    });
  }),

  getTopReactionYear: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany({
      // orderby reaction count
      include: {
        _count: {
          select: {
            Comments: {
              where: {
                createdAt: { gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
              },
            },
            Reaction: {
              where: { createdAt: { gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) } },

            },
          },
        },
      },
      orderBy: [
        {
          Reaction: {
            _count: "desc",
          },
        },
        {
          Comments: {
            _count: "desc",
          }
        },
      ],

    });
  }),

  getTopReactionInfinity: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany({
      // orderby reaction count
      include: {
        _count: {
          select: {
            Comments: true,
            Reaction: true,
          },
        },
      },
      orderBy: [
        {
          Reaction: {
            _count: "desc",
          },
        },
        {
          Comments: {
            _count: "desc",
          }
        },
      ],

    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany();
  }),

  deletePosts: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    return await ctx.db.post.delete({ where: { id: input.id } });
  }),

  getPostCommentsCount: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.db.comment.count({ where: { postId: input.id } });
  }),

  getPostReactionCount: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.db.reaction.count({ where: { postId: input.id } });
  }),

  reactToPost: protectedProcedure.input(z.object({ id: z.string(), reaction: z.string() })).mutation(async ({ ctx, input }) => {
    return await ctx.db.reaction.create({
      data: {
        postId: input.id,
        type: input.reaction,
        createdById: ctx.session.user.id,
      },
    });
  }),

  getPostReactions: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.db.reaction.findMany({ where: { postId: input.id, createdById: ctx.session.user.id } });
  }),

  removePostReaction: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    return await ctx.db.reaction.delete({
      where: {
        like: { postId: input.id, createdById: ctx.session.user.id },

      }
    });
  }),

  getPostAllComments: publicProcedure.input(z.object({ id: z.string(), quantity: z.number() })).query(async ({ ctx, input }) => {
    if (input.quantity === -1) { return await ctx.db.comment.findMany({ where: { postId: input.id } }); }
    else { return await ctx.db.comment.findMany({ where: { postId: input.id }, take: input.quantity }); }
  }),

  getPostCommentById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.db.comment.findUnique({ where: { id: input.id } });
  }),


  createComment: protectedProcedure.input(z.object({ postId: z.string(), content: z.string() })).mutation(async ({ ctx, input }) => {
    return await ctx.db.comment.create({
      data: {
        content: input.content,
        postId: input.postId,
        createdById: ctx.session.user.id,
        createdAt: new Date(),
      },
    });
  }),
  deleteComment: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    return await ctx.db.comment.delete({ where: { id: input.id } });
  }),

  searchPosts: publicProcedure.input(z.object({ query: z.string() })).query(async ({ ctx, input }) => {

    return await ctx.db.post.findMany({ where: { title: { contains: input.query } } });
  }),

  searchFirstFivePosts: publicProcedure.input(z.object({ query: z.string() })).query(async ({ ctx, input }) => {
    if (input.query === "") { return []; }
    return await ctx.db.post.findMany({ where: { title: { contains: input.query } }, take: 5 });
  }),

});
