import { Board, db } from "@/src/prisma/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { BoardTitleForm } from "./board-title-form";
import { BoardOptions } from "./board-options";

interface BoardNavbarProps{
    data : Board;
}

export const BoardNavbar = async ({data}:BoardNavbarProps)=>{
   
    return (
        <div className="w-full h-14 z-40 bg-black/50 fixed top-14 flex items-center  px-6 gap-x-4 text-white">
            <BoardTitleForm data={{ id: data.id, title: data.title }}/>
            <div className="ml-auto">
                <BoardOptions id={data.id}/>

            </div>
        </div>
    )
}