import { BoardList } from "./_components/board-list"
import { Info } from "./_components/info"
import { Separator } from "@/components/ui/separator"

const OrganizationIdPage = async()=>{
    
    return (
        <div className="mb-20 w-full">
            {/* check the subscription here */}
            <Info/>
            <Separator className="my-4"/>
            <div className="px-2 md:px-4">
                <BoardList/>
            </div>
        </div>
    )
}


export default OrganizationIdPage