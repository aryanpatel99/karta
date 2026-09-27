import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HintProps{
    children:React.ReactNode;
    description:string;
    side?: "left" | "right" | "top" | "bottom";
    sideOffset?: number;
}


export const Hint=(
   { children,
    description,
    side = "bottom",
    sideOffset = 0,}:HintProps
)=>{
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                side={side}
                sideOffset={sideOffset}
                className="text-xs max-w-55 wrap-break-word"
                >
                    {description}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}