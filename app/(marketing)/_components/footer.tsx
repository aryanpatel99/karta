import Link from 'next/link';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export const Footer = () => {
    return (
        <div className="fixed bottom-0 flex h-14 w-full items-center border-b bg-white p-4 shadow-sm">
            <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
                <Logo />

                <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
                    <Button variant="ghost">
                        <Link href={'/privacy-policy'}>Privacy Policy</Link>
                    </Button>
                    <Button variant="ghost">
                        <Link href={'/terms-of-service'}>Terms of Service</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
