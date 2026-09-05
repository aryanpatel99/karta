"use client"

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import { NavItem } from "./nav-item";




interface SidebarProps {
    storageKey?: string;

}

export const Sidebar = ({
    storageKey = "t-sidebar-state"
}: SidebarProps) => {

    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})

    const {
        organization: activeOrganization,
        isLoaded: isLoadedOrg
    } = useOrganization()

    const {
        userMemberships,
        isLoaded: isLoadedOrgList
    } = useOrganizationList({
        userMemberships: {
            infinite: true
        }
    })

    const defaultAccordionValue: string[] = Object.keys(expanded)
        .reduce((acc: string[], key: string) => {
            if (expanded[key]) {
                acc.push(key);
            }

            return acc;
        }, []);

    const onExpanded = (id: string) => {
        setExpanded((curr) => {
            return {
                ...curr,
                [id]: !expanded[id],
            }
        })
    }

    if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
        return (
            <>
                <div className="flex items-center justify-between mb-2 p-3">
                    <Skeleton className="h-8 w-[50%]" />
                    <Skeleton className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                    <NavItem.Skeleton/>
                    <NavItem.Skeleton/>
                    <NavItem.Skeleton/>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="font-medium text-xs flex items-center mb-1">
                <span className="pl-4">
                    Workspaces
                </span>
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="ml-auto"
                >
                    <Link href="/select-org">
                        <IconPlus
                            className="h-4 w-4"
                        />
                    </Link>
                </Button>
            </div>
            <Accordion
                multiple
                defaultValue={defaultAccordionValue}
                className="space-y-2"
            >
                {userMemberships.data.map(({ organization }) => (
                    // <p key={organization.id}>
                    //     {organization.name}

                    // </p>

                    <NavItem
                        key={organization.id}
                        isActive={activeOrganization?.id === organization.id}
                        isExpanded={expanded[organization.id]}
                        onExpand={onExpanded}
                        organization={organization}
                    />
                ))}
            </Accordion>
        </>
    )
}