import {z} from "zod";

export const todoObject = z.object({
    id: z.string(),
    title: z.string(),
    priority: z.number().int().min(1).max(4),
    isActive: z.boolean(),
    dueDate: z.coerce.date(),
})

export type todoModel = z.infer<typeof todoObject>;
