import {z} from "zod"

export const signUpSchema= z.object({
    name:z.string({required_error:"Name is required"}).min(3,{message:"Must be 3 or more characters long"}),
    cellPh:z.string().length(10,{message:"Phone number should be of 10 digits"}),
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(6,{message:"Password must be minimum 6 length"})
})

export const signInSchema=signUpSchema.pick({
    cellPh:true,
    password:true
})

export const addFormSchema = z.object({
    name:z.string().min(3,{message:"Name must be of 3 or more letters"}),
    address:z.string().min(6,"Enter a valid address"),
    phoneNumber:z.string().length(10,{message:"Phone number should be of 10 digits"}),

})

export const paramsId = z.string().uuid({message:"This is not a valid uuid"})