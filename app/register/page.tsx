import RegisterForm from './form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cooking | Register',
};

export default function Register() {
    return (
        <>
            <RegisterForm />
        </>
    );
}
