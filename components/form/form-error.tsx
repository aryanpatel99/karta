"use client"

import { IconX } from "@tabler/icons-react";
import { useFormStatus } from "react-dom";


interface FormErrorProps {
    id: string;
    errors?: Record<string, string[]> | undefined;
}

export const FormError = ({
    id,
    errors
}:FormErrorProps) => {
    if(!errors){
        return null
    }

    return (
        <div
        id={`${id}-error`}
        aria-live="polite"
        className="text-xs font-medium text-red-500 mt-2"
        >
            {errors?.[id]?.map((error:string)=>(
                <div key={error} className="flex items-center gap-x-1.5 py-1 px-2 border border-rose-500 bg-rose-500/10 rounded-md">
                    <IconX className="h-4 w-4"/>
                    {error}
                </div>
            ))}
        </div>
    )
}