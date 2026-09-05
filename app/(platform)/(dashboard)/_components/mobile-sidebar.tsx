"use client"

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import { IconMenu } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";






export const MobileSidebar = () => {

    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false)

    // using the hooks now here for opening and closing state
    const onOpen = useMobileSidebar((state) => state.onOpen);
    const onClose = useMobileSidebar((state) => state.onClose);
    const toggle = useMobileSidebar((state) => state.toggle);
    const isOpen = useMobileSidebar((state) => state.isOpen);

    useEffect(()=>{
        setIsMounted(true)
    },[])

    useEffect(()=>{
        if(isOpen){
            onClose()  
        }
    },[pathname,onClose])

    if(!isMounted){   //this will prevent hydration errors
        return null
    }


    return (
        <>
        <Button
        onClick={onOpen}
        className="p-0 h-auto w-auto mr-2 block md:hidden"
        variant="ghost"
        >
            <IconMenu className="h-8 w-8"/>
        </Button>
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="left" className="p-2 pt-10 bg-white">
                <Sidebar storageKey="t-sidebar-mobile-state"/>
            </SheetContent>

        </Sheet>

        </>
    )
}