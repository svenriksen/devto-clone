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

  getPostReactions: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.db.reaction.findMany({ where: { postId: input.id } });
  }),

  getPostComments: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.db.comment.findMany({ where: { postId: input.id } });
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


});
