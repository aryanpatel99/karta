import { UserButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';

const ProtectedPage = async () => {
    const user = await currentUser();

    const { userId } = await auth();

    if (!user) {
        return null;
    }

    return (
        <div>
            Protected Page! User: {user.firstName}
            UserId:{userId}
            <div>
                <UserButton />
            </div>
        </div>
    );
};

export default ProtectedPage;
