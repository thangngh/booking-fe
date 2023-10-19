import { IPrams } from '@/types/params.interface';
import LoginForm from './form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cooking | Login',
};

export default function Login({ params, searchParams }: IPrams) {
    return (
        <>
            <LoginForm params={params} searchParams={searchParams} />
        </>
    );
}
