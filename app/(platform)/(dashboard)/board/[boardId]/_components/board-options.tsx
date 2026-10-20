"use client"

import { Button } from "@/components/ui/button"
import { Popover,PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { IconMenu, IconX } from "@tabler/icons-react"
import { useAction } from "@/hooks/use-actions";
import { deleteBoard } from "@/actions/delete-board";
import { toast } from "sonner";


export const BoardOptions = ({id}: {id:string}) =>{

    const {execute, isLoading} = useAction(deleteBoard,{
        onError: (error)=>{
            toast.error(error);
        }
    });

    const onDelete = ()=>{
        execute({id});
    }

    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="ghost" size="sm">
                    <IconMenu className="h-4 w-4"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" side="bottom" sideOffset={10} className="px-0 pt-3 pb-3">
                    <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                        Board actions
                    </div>
                <PopoverClose>
                    <Button variant="ghost" size="sm" className="absolute right-2 top-2 rounded-none">
                        <IconX className="h-4 w-4"/>
                    </Button>
                </PopoverClose>

                <Button onClick={onDelete} disabled={isLoading} size="sm" variant="ghost" className="rounded-none w-full justify-start p-2 px-5 text-sm">
                    Delete Board
                </Button>
            </PopoverContent>
            
        </Popover>
    )
}   

