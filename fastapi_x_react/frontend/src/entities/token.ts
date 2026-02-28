import {z} from "zod";

export const tokenObject = z.object({
    access_token: z.string(),
    token_type: z.string(),
})

export type tokenModel = z.infer<typeof tokenObject>;