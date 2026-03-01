import { z } from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(1, "First name required"),
    lastName: z.string().min(1, "Last name required"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export type RegisterFormData = z.infer<typeof registerSchema>;


export const loginSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string("Incorrect password"),
})

export type LoginFormData = z.infer<typeof loginSchema>;


export const userObject = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    avatar: z.string(),
})

export type userModel = z.infer<typeof userObject>;
