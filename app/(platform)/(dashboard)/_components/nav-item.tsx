"use client"

import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { IconActivity, IconSettings, IconCreditCard, IconLayout } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

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
    const router = useRouter();
    const pathname = usePathname();

    const routes = [
        {
            label:"Boards",
            icon: <IconLayout className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}`
        },
        {
            label:"Activity",
            icon:<IconActivity className="h-4 w-4 mr-2"/>,
            href: `/organization/${organization.id}/activity`
        },
        {
            label:"Settings",
            icon:<IconSettings className="h-4 w-4 mr-2"/>,
            href: `/organization/${organization.id}/settings`
        },
        {
            label:"Billing",
            icon:<IconCreditCard className="h-4 w-4 mr-2"/>,
            href: `/organization/${organization.id}/billing`
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
            <AccordionContent>
                {
                    routes.map((route) => (
                        <Button key={route.href} size="lg" variant="ghost"
                        onClick={() => router.push(route.href)}
                         className={cn("w-full justify-start h-auto p-2 px-5 text-sm font-medium bg-gray-200", pathname === route.href && "bg-sky-500/10 text-sky-700")}>
                            {route.icon}
                            {route.label}
                        </Button>
                    ))
                }
            </AccordionContent>
        </AccordionItem>
    )
}


NavItem.Skeleton = function SkeletonNavItem(){
    return (
        <div className="flex items-center gap-x-2">
            <div className="h-10 w-10 relative shrink-0">
                <Skeleton className="h-full w-full absolute"/>
            </div>
            <Skeleton className="h-8 w-full"/>

        </div>
    )
}