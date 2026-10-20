"use client"
import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-actions";
import { Board } from "@/src/prisma/db";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleFormProps {
  data: Pick<Board, "id" | "title">;
};


export const BoardTitleForm = ({
  data,
}: BoardTitleFormProps) => {
    const {execute} = useAction(updateBoard,{
        onSuccess: (data)=>{
            toast.success(`Board "${data.title}" updated.`);
            setTitle(data.title);
            disableEditing();
        },
        onError: (error)=>{
            toast.error(error);
        }
    })

    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(data.title);


    const disableEditing =()=>{
        setIsEditing(false);
    }


    const enableEditing =()=>{
        setIsEditing(true);
        // inputs
        setTimeout(()=>{
            inputRef.current?.focus();
            inputRef.current?.select();
        })
    }

    const onSubmit = async (formData:FormData)=>{
       const newTitle = formData.get("title") as string;
       if (newTitle === title) return disableEditing();
       // TODO: call updateBoard server action here
       setTitle(newTitle);
       execute({
        title: newTitle,
        id: data.id,
       })
    }


    const onBlur =()=>{
        // submit form when user click off the input
        formRef.current?.requestSubmit()
    }

    if (isEditing){
        return (
            <form action={onSubmit} ref={formRef} className="flex items-center gap-x-2">
                <FormInput
                ref={inputRef}
                id="title"
                onBlur={onBlur}
                defaultValue={title}
                className="text-lg font-medium px-2.5"   
                />
            </form>
        )
    }

    return (
        
            <Button
            onClick={enableEditing}
            size="sm"
            variant="secondary">
                {title}
            </Button>
    )
};