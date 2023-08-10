'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILogin } from '@/types/auth.interface';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { IPrams } from '@/types/params.interface';

const schemaValidation = Yup.object({
    username: Yup.string()
        .required('username is requested')
        .trim('username is requested'),
    password: Yup.string()
        .required('password is requested')
        .trim('password is requested'),
});

export default function LoginForm({ params, searchParams }: IPrams) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILogin>({
        resolver: yupResolver(schemaValidation),
    });

    const callbackUrl = (searchParams.callbackUrl as string) || '/';

    const onLogin: SubmitHandler<ILogin> = async (data: ILogin) => {
        const { username, password } = data;
        try {
            await signIn('credentials', {
                username,
                password,
                redirect: true,
                callbackUrl,
            });
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <div className="w-full p-5">
            <div className="flex flex-col justify-center items-center ">
                <div className=" w-full max-w-sm mx-auto mt-6 p-4 rounded-lg shadow-xl border border-spacing-1">
                    <h1 className="text-2xl my-3 font-medium">Login</h1>
                    <form onSubmit={handleSubmit(onLogin)}>
                        <div className="space-y-6">
                            <input
                                placeholder="username"
                                type="text"
                                {...register('username')}
                                className="w-full px-4 py-3 rounded-lg ring-red-200 bg-black focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl"
                            />
                            {errors.username && (
                                <p className="text-primary text-sm">
                                    {errors.username.message}
                                </p>
                            )}
                            <input
                                placeholder="password"
                                type="password"
                                {...register('password')}
                                className="w-full px-4 py-3 rounded-lg ring-red-200 bg-black focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl"
                            />
                            {errors.password && (
                                <p className="text-primary text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="bg-primary border border-gray-300 text-white shadow-card-layout-sm block text-center 3xl:text-xl rounded-lg py-2 px-5 w-full  mt-4 mx-auto"
                        >
                            Sign in
                        </button>
                        <Link href={'/register'}>
                            <p className="text-base text-primary cursor-pointer text-center my-6 hover:underline">
                                Create new account?
                            </p>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
