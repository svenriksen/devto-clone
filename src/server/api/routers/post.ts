import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

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
});
