'use client';

import { DrawerHeader } from '@/components/Sidebar';
import { IPrams } from '@/types/params.interface';

export default function DashboardPage({ params, searchParams }: IPrams) {
    return (
        <div>
            <DrawerHeader />
            <h1 className="text-black">dashboard</h1>
        </div>
    );
}
