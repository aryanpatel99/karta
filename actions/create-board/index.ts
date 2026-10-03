"use server"

import { auth } from "@clerk/nextjs/server"
import { InputType, ReturnType } from "./types"
import { db } from "@/src/prisma/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { CreateBoard } from "./schema"

const handler = async(data:InputType):Promise<ReturnType>=>{

    const {userId, orgId} = await auth()

    if(!userId || !orgId){
        return {error:"Unauthorized"}
    }

    const {title, image} = data

    const [imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName] = image.split("|")

    if(!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHtml || !imageUserName){
        return {error:"Missing image fields. Please select an image."}
    }

    let board;

    try{
        board = await db.orm.public.Board.create({
            title,
            orgId,
            imageId,
            imageThumbUrl,
            imageFullUrl,
            imageLinkHtml,
            imageUserName,
        })
    }
    catch(error){
        return {error:"Failed to create board"}
    }


    revalidatePath(`/board/${board.id}`)  
    return {data:board};

}


export const createBoard = createSafeAction(CreateBoard, handler)