import { create } from "@/actions/create-board"
import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"

const OrganizationIdPage = async()=>{
    const {userId , orgId} = await auth()

    
    return (
        <div>
            <form action={create}>
                <input type="text" placeholder="text here" name="title" className="border border-black" />
                <Button type="submit">Create</Button>
            </form>
        </div>
    )
}


export default OrganizationIdPage