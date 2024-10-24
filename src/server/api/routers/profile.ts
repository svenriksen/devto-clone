import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";

export const profileRouter = createTRPCRouter({
    getProfile: publicProcedure.input(z.string().min(1)).query(({ ctx, input }) => {
        return ctx.db.user.findUnique({
            where: {
                id: input,
            },
        });
    }),

    getPostCount: publicProcedure.input(z.string().min(1)).query(({ ctx, input }) => {
        return ctx.db.post.count({
            where: {
                createdBy: {
                    id: input,
                },
            },
        });
    }),

    getCommentCount: publicProcedure.input(z.string().min(1)).query(({ ctx, input }) => {
        return ctx.db.comment.count({
            where: {
                createdBy: {
                    id: input,
                },
            },
        });
    }),

    getAllPostsFromUser: publicProcedure.input(z.string().min(1)).query(({ ctx, input }) => {
        return ctx.db.post.findMany({
            where: {
                createdBy: {
                    id: input,
                },
            },
        });
    }),

    updateProfile: protectedProcedure.input(z.object({
        name: z.string(),
        bio: z.string(),
        username: z.string(),
        email: z.string(),
    })).mutation(({ ctx, input }) => {

        return ctx.db.user.update({
            where: {
                id: ctx.session.user.id,
            },
            data: {
                name: input.name,
                bio: input.bio,
                id: input.username,
                email: input.email,
            },
        });
    }),
});