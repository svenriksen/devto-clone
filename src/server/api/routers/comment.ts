import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";

export const commentRouter = createTRPCRouter({
    replyComment: protectedProcedure.input(z.object({
        commentId: z.string(),
        content: z.string(),
    })).mutation(async ({ ctx, input }) => {
        return await ctx.db.comment.create({
            data: {
                content: input.content,
                subId: input.commentId,
                createdById: ctx.session.user.id,
                createdAt: new Date(),
            },
        });
    }),

    getAllReplyComments: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
        return await ctx.db.comment.findMany({ where: { subId: input.id } });
    }),
});