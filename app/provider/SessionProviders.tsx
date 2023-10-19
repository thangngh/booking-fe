'use client';

import { SessionProvider } from 'next-auth/react';

export interface ProviderProps {
    children: React.ReactNode;
}
export default function SessionProviders({ children }: ProviderProps) {
    return <SessionProvider>{children}</SessionProvider>;
}
