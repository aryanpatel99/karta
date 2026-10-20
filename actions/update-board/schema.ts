import z from "zod";

const UpdateBoard = z.object({
    title:z.string({
        error:"Title is required",
    }).min(3,{
        message:"Title must be atleast 3 characters",
    }),
    id: z.string(),
})

export default UpdateBoard;