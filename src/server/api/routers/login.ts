import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";

export const loginRouter = createTRPCRouter({
    login: publicProcedure.input(z.object({})).mutation(async ({ ctx }) => {
        return "Hello, world!";
    }),
});