import { FormPicker } from "@/components/form/form-picker"
import { FormPopover } from "@/components/form/form-popover"
import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { db } from "@/src/prisma/db"
import { auth } from "@clerk/nextjs/server"
import { User } from "@hugeicons/core-free-icons"
import { IconHelp, IconPlus, IconUser } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

export const BoardList = async ()=>{
    // fetching board
    const {orgId} = await auth()

    if(!orgId){
        return redirect("select-org");
    }

    const boards = await db.orm.public.Board.where({ orgId }).orderBy(m => m.createdAt.desc()).all()
        

    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-md text-neutral-500 mb-2">
                <IconUser className="w-5 h-5 mr-2"/>
                Your Workspace
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* boards */}
                {boards.map((board) => (
                    <Link key={board.id} href={`/board/${board.id}`}
                    style={{backgroundImage: `url(${board.imageThumbUrl})`}}
                    className="group relative aspect-video bg-cover bg-center rounded-sm h-full w-full p-2 overflow-hidden hover:border-sky-200 transition-all"
                    >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"/>
                        <p className="relative font-semibold text-white">{board.title}</p>
                    </Link>
                ))}
                
                    <FormPopover align="start" side="right" sideOffset={10}>
                <div role="button" className="relative aspect-video bg-gray-200 rounded-md flex flex-col items-center justify-center gap-y-2 hover:opacity-75 transition">
                    <IconPlus className="h-6 w-6 stroke-1.5"/>
                    <p className="font-semibold">New Board</p>
                    <span className="text-xs">5 remaining</span>
                    <Hint sideOffset={30}
                    description={`Free workspaces can have upto 5 boards. Please upgrade to create more boards.`}
                    >
                        <IconHelp className="absolute bottom-2 right-2 w-3.5 h-3.5"/>
                    </Hint>
                </div>
                </FormPopover>
            </div>

        </div>
    )
}


BoardList.Skeleton = function BoardListSkeleton(){
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="aspect-video w-full p-2"/>
            <Skeleton className="aspect-video w-full p-2"/>
            <Skeleton className="aspect-video w-full p-2"/>
            <Skeleton className="aspect-video w-full p-2"/>
            <Skeleton className="aspect-video w-full p-2"/>
            <Skeleton className="aspect-video w-full p-2"/>
            <Skeleton className="aspect-video w-full p-2"/>
            <Skeleton className="aspect-video w-full p-2"/>
        </div>
    )
}