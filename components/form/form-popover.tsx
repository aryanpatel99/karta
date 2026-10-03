"use client"

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IconCross, IconPlus, IconX } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { FormInput } from "./form-input";
import { useAction } from "@/hooks/use-actions";
import { createBoard } from "@/actions/create-board/index";
import { FormSubmit } from "./form-submit";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";

interface FormPopoverProps{
    children: React.ReactNode,
    side?:"left"|"right"|"top"|"bottom",
    align?:"start"|"end"|"center",
    sideOffset?:number;
}

export const FormPopover = ({
    children,
    side ="bottom",
    align ="start",
    sideOffset =0
}:FormPopoverProps) =>{
    const {execute, fieldErrors} = useAction(createBoard,{
        onSuccess:()=>{
            toast.success("Board created successfully")
        },
        onError:(error)=>{
            toast.error(error)
        }
    })


    const onSubmit = (formData: FormData)=>{
        const title = formData.get("title") as string;
        const image = formData.get("image") as string;

        execute({title, image})
    }

    return (
        <Popover>
            <PopoverTrigger render={children as React.ReactElement}>
                {/* {children} */}
            </PopoverTrigger>
            <PopoverContent side={side} align={align} sideOffset={sideOffset} className="w-80 h-auto">
                <div className="text-sm font-medium text-center pb-4">
                    Create Board
                </div>
                <PopoverClose render={<Button className="absolute top-2 right-2" variant="ghost" aria-label="Close create board"/>}>
                    <IconX className="h-4 w-4 stroke-1.5"/>
                </PopoverClose>

                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormPicker
                            id="image"
                            errors={fieldErrors}
                        />
                    <FormInput id="title" label="Board Title" className="text-xs" errors={fieldErrors}/>

                    </div>
                    <FormSubmit children="Create Board" className="w-full"/>
                </form>
            </PopoverContent>
            
        </Popover>
    )
}