import z from "zod";
export declare const signupInput: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createBlogPost: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogPost: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    Id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    Id: string;
}, {
    title: string;
    content: string;
    Id: string;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogPost = z.infer<typeof createBlogPost>;
export type UpdateBlogPost = z.infer<typeof updateBlogPost>;
