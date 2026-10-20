import z from "zod";

const DeleteBoard = z.object({
    id: z.string(),
})

export default DeleteBoard;