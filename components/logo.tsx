import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

export const Logo = ({
    size,
    className,
}: {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}) => {
    const sizeMap = {
        sm: 'w-6 h-6 text-xl',
        md: 'w-10 h-10 text-3xl',
        lg: 'w-14 h-14 text-4xl',
    };
    return (
        <Link href={'/'}>
            <div className="hidden items-center gap-x-2 transition hover:opacity-75 md:flex">
                <Image src="/logo.svg" alt="Logo" width={30} height={30} />
                <p className={cn('text-2xl', sizeMap[size || 'md'], className)}>
                    Karta
                </p>
            </div>
        </Link>
    );
};
