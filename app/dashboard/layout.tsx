'use client';
import Sidebar from '@/components/Sidebar';
import { ILayouts } from '@/types/layouts.inteface';
import { useSession } from 'next-auth/react';

export const Menu = [
    {
        id: 1,
        title: 'dashboard',
    },
    {
        id: 2,
        title: 'recipe',
    },
];

export default function Layout({ children }: ILayouts) {
    const session = useSession();
    return (
        <div className="w-full bg-white">
            <div className=" w-full mx-auto max-w-6xl h-screen  bg-white  text-black">
                <Sidebar
                    data={Menu}
                    title="Dashboard"
                    username={session.data?.user?.name as string}
                />
                {children}
            </div>
        </div>
    );
}
