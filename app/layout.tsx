import './globals.css';
import 'antd/dist/reset.css';
import type { Metadata } from 'next';
import SessionProviders from './provider/SessionProviders';
import Header from '@/components/Header';
import { Providers } from './provider/ReduxProvider';
// import { SocketProvider } from './SocketProvider';

export const metadata: Metadata = {
    title: 'Cooking recipe App',
};

const scrollSmooth = 'scroll-smooth';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={scrollSmooth}>
            <SessionProviders>
                {/* <SocketProvider > */}
                <Providers>
                    <body>
                        <Header />
                        {children}
                    </body>
                </Providers>
                {/* </SocketProvider> */}
            </SessionProviders>
        </html>
    );
}
