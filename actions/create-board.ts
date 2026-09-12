"use server"

import { db } from "@/src/prisma/db"

export async function create(formData: FormData){
    const title = formData.get("title") as string

    await db.orm.public.Board.create({
        title:title
    })
}