"use client"

import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { IconActivity, IconSettings, IconCreditCard, IconLayout } from "@tabler/icons-react";

export type Organization = {
    id:string;
    slug:string | null;
    imageUrl:string;
    name:string;
}

interface NavItemProps {
    organization:Organization;
    isActive:boolean;
    isExpanded:boolean;
    onExpand:(id:string) => void;
    
}


export const NavItem = ({
    organization,
    isActive,
    isExpanded,
    onExpand,
}:NavItemProps) =>{

    const routes = [
        {
            label:"Boards",
            icon: <IconLayout className="h-4 w-4 mr-2" />,
            href: `organization/${organization.id}`
        },
        {
            label:"Activity",
            icon:<IconActivity className="h-4 w-4 mr-2"/>,
            href: `organization/${organization.id}/activity`
        },
        {
            label:"Settings",
            icon:<IconSettings className="h-4 w-4 mr-2"/>,
            href: `organization/${organization.id}/settings`
        },
        {
            label:"Billing",
            icon:<IconCreditCard className="h-4 w-4 mr-2"/>,
            href: `organization/${organization.id}/billing`
        }
    ]

    return(
        <AccordionItem value={organization.id}>
            <AccordionTrigger onClick={() => onExpand(organization.id)}
                className={cn("flex items-center gap-x-2 hover:bg-neutral-500/10 border-none outline-none transition-none p-2 rounded-lg",isActive && !isExpanded && "bg-sky-500/10 text-sky-700")}
                >
                    <div className="flex items-center gap-x-2">
                        <div className="h-7 w-7 relative">
                            <Image
                            src={organization.imageUrl}
                            alt={"Organization"}
                            fill
                            className="rounded-md object-cover"
                            />
                        </div>

                        <span className="font-medium text-sm">{organization.name}</span>
                    </div>

            </AccordionTrigger>
        </AccordionItem>
    )
}