"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useOrganization } from "@clerk/nextjs"
import { IconCreditCard } from "@tabler/icons-react"
import Image from "next/image"



export const Info = ()=>{

    const {organization, isLoaded} = useOrganization()

    if(!isLoaded){
        return (
            <Info.Skeleton/>
        )
    }

    return (
        <div className="flex items-center gap-x-4">
            <div className="w-[60] h-[60] relative">
                <Image
                fill
                alt="Organization logo"
            src={organization?.imageUrl!}
                className="rounded-md"
                />
            </div>

            <div className="space-y-2">
                <p className="text-xl font-semibold">{organization?.name}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                    <IconCreditCard className="h-3 w-3 mr-1"/>
                    Free
                </div>
            </div>

        </div>
    )
}


Info.Skeleton = function SkeletonInfo(){
    return (
        <div className="flex items-center gap-x-4">
            <div className="w-[60] h-[60] relative">
                <Skeleton
                className="w-full h-full absolute"
                />
            </div>

            <div className="space-y-2">
                <Skeleton
                className="h-10 w-50"
                />
                <div className="flex items-center text-xs text-muted-foreground">
                    <Skeleton
                    className="h-4 w-4 mr-2"
                    />
                    <Skeleton
                    className="h-4 w-12"
                    />
                </div>
            </div>

        </div>
    )
}