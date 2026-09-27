"use client"

import { forwardRef } from "react"
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormError } from "./form-error";
import { cn } from "@/lib/utils";


interface FormInputProps {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[]> | undefined;
    className?: string;
    defaultValue?: string;
    onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({
        id,
        label,
        type,
        placeholder,
        required,
        disabled,
        errors,
        className,
        defaultValue = "",
        onBlur,
    }, ref) => {
        const {pending} = useFormStatus()
        return (
            <div className="space-y-2">
                <div className="space-y-1">
                    {label ? (
                        <Label 
                        htmlFor={id}
                        className="text-xs font-semibold text-muted-foreground"
                        >
                            {label}
                        </Label>
                    ) : null }

                    <Input
                    ref={ref}
                    type={type}
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    className={cn("text-sm px-2 py-1 h-7",className)}
                    defaultValue={defaultValue}
                    onBlur={onBlur}
                    aria-describedby={`${id}-error`}
                    />
                </div>

                <FormError
                id={id}
                errors={errors}
                />

            </div>
        )
    }
)