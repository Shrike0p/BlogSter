import zod from "zod";
export const signup=zod.object({
    email:zod.string().email(),
    name:zod.string().optional(),
    password:zod.string().min(6)
})
export const signin=zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)
})
export const createBlogInput=zod.object({
    title:zod.string(),
    content:zod.string()
})
export const updateBlogInput=zod.object({
    title:zod.string(),
    content:zod.string(),
    id:zod.string ()
})


export type SignupInput=zod.infer<typeof signup>
export type SigninInput=zod.infer<typeof signin>
export type createBlogInput=zod.infer<typeof createBlogInput>
export type updateBlogInput=zod.infer<typeof updateBlogInput>