import { db } from "@/src/prisma/db"
import { auth } from "@clerk/nextjs/server"
import { notFound, redirect } from "next/navigation"
import { BoardNavbar } from "./_components/board-navbar"

export async function generateMetadata({
    params
}:{
    params:Promise<{boardId:string}>
}){

    const {orgId} = await auth()
    if(!orgId){
        redirect("/select-org")
    }
    const board = await db.orm.public.Board.where({ id: (await params).boardId, orgId }).first()
    
    if(!board){
        notFound()
    }

    return {
        title: board.title,
    }
}
    

const BoardIdLayout =async (
    {children,params}:{
        children:React.ReactNode,
        params:Promise<{boardId:string}>

    }
) => {
    const {orgId} =await auth()

    if(!orgId){
        redirect("/select-org")
    }

    const board = await db.orm.public.Board.where({ id: (await params).boardId, orgId }).first()

    if(!board){
        notFound()
    }

    return (
        <div
        style={{backgroundImage: `url(${board.imageFullUrl})`}}
        className="relative h-full bg-no-repeat bg-cover bg-center">
            <BoardNavbar data={board}/>
            <div className="absolute inset-0 bg-black/20"/>
            <main className="pt-28 relative h-full">
                {children}
            </main>
        </div>
    )
}

export default BoardIdLayout