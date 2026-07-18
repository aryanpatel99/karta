import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { IconPlus } from "@tabler/icons-react"



export const Navbar = () => {
    return (
        <nav className="fixed z-50 top-0 w-full h-14 border-b shadow-sm bg-white flex items-center justify-between px-4">
            {/* Mobile sidebar */}
            <div className="flex items-center gap-x-4">
                <div className="hidden md:block">
                <Logo />
                </div>
                <Button className="rounded-sm hidden md:block px-2">
                    Create
                </Button>
                <Button className="rounded-md block md:hidden" size="lg">
                    <IconPlus/>
                </Button>
            </div>

            <div className="ml-auto flex items-center gap-x-4">
                <OrganizationSwitcher
                hidePersonal
                afterCreateOrganizationUrl="/organization/:id"
                afterSelectOrganizationUrl="/organization/:id"
                afterLeaveOrganizationUrl="/select-org"
                />

                <UserButton/>

            </div>
        </nav>
    )
}