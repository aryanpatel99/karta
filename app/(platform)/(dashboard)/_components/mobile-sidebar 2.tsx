"use client"

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"






export const MobileSidebar = () => {
    // using the hooks now here for opening and closing state
    const onOpen = useMobileSidebar((state) => state.onOpen);
    const onClose = useMobileSidebar((state) => state.onClose);
    const toggle = useMobileSidebar((state) => state.toggle);
    const isOpen = useMobileSidebar((state) => state.isOpen);

    return (
        <div>Mobile sidebar</div>
    )
}