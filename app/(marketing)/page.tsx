import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';

const MarketingPage = async () => {

    // Doing this in the middleware is more efficient.

    // const { userId, orgId } = await auth();

    // if (userId) {
    //     if (orgId) {
    //         redirect(`/organization/${orgId}`);
    //     } else {
    //         redirect('/select-org');
    //     }
    // }
    
    return (
        <div className="flex h-full flex-col">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-6xl font-medium tracking-tight">
                    Karta helps you
                </h1>
                <p className="font-base text-3xl tracking-tight">
                    Move Forward
                </p>
            </div>
            <div className="mt-6 flex items-center justify-center">
                <Button size="lg" className="mt-6">
                    <Link href={'/sign-up'}>Get Started for free</Link>
                </Button>
            </div>
        </div>
    );
};

export default MarketingPage;
