import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { User } from "@hugeicons/core-free-icons"
import { IconHelp, IconPlus, IconUser } from "@tabler/icons-react"

export const BoardList = ()=>{
    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-md text-neutral-500 mb-2">
                <IconUser className="w-5 h-5 mr-2"/>
                Your Workspace
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* boards */}
                <div role="button" className="relative aspect-video bg-gray-200 rounded-md flex flex-col items-center justify-center gap-y-2 hover:opacity-75 transition">
                    <IconPlus className="h-6 w-6 stroke-1.5"/>
                    <p className="font-semibold">New Board</p>
                    <span className="text-xs">5 remaining</span>
                    <Hint sideOffset={30}
                    description={`Free workspaces can have upto 5 boards. Please upgrade to create more boards.`}
                    >
                        <IconHelp className="absolute bottom-2 right-2 w-3.5 h-3.5"/>
                    </Hint>
                </div>
            </div>

        </div>
    )
}