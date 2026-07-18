import { auth } from "@clerk/nextjs/server"

const OrganizationIdPage = async()=>{
    const {userId , orgId} = await auth()

    
    return (
        <div>
            Organization Id Page 
            <br />
            {userId} 
            <br />
            OrgId : {orgId}
        </div>
    )
}


export default OrganizationIdPage