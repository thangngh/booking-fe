import './globals.css';
import 'antd/dist/reset.css';
import type { Metadata } from 'next';
import Provider from './Provider';
import Header from '@/components/Header';

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
            <Provider>
                <body>
                    <Header />
                    {children}
                </body>
            </Provider>
        </html>
    );
}
