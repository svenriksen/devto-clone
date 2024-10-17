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

    updateProfile: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
        return null;
    }),
});