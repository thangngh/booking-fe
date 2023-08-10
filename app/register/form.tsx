'use client';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IRegister } from '@/types/auth.interface';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';

const schemaValidation = Yup.object({
    firstName: Yup.string()
        .required('firstName is requested')
        .trim('firstName is requested')
        .max(20, 'firstName to long'),
    lastName: Yup.string()
        .required('lastName is requested')
        .trim('lastName is requested')
        .max(20, 'lastName to long'),
    email: Yup.string()
        .required('Email is requested')
        .trim('Email is requested')
        .max(50, 'Email to long')
        .matches(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm, {
            message: 'Email not matches',
        }),
    username: Yup.string()
        .required('Username is requested')
        .trim('Username is requested')
        .max(20, 'Username to long'),
    password: Yup.string()
        .required('Password is requested')
        .trim('Password is requested')
        .max(20, 'Password to long')
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g,
            {
                message:
                    'Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character',
            },
        ),
});

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegister>({
        resolver: yupResolver(schemaValidation),
    });

    const onRegister: SubmitHandler<IRegister> = async (data: IRegister) => {};

    return (
        <div className="w-full p-5">
            <div className="flex flex-col justify-center items-center ">
                <div className=" w-full max-w-sm mx-auto mt-6 p-4 rounded-lg shadow-xl border border-spacing-1">
                    <h1 className="text-2xl my-3 font-medium">Register</h1>
                    <form onSubmit={handleSubmit(onRegister)}>
                        <div className="flex flex-col space-y-6">
                            <div className="space-y-6 flex-1">
                                <input
                                    type="text"
                                    placeholder="first name"
                                    {...register('firstName')}
                                    className={`w-full px-4 py-3 rounded-lg bg-black ${
                                        errors.firstName
                                            ? 'ring-red-200'
                                            : 'ring-green-200'
                                    } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                                />
                                {errors.firstName && (
                                    <p className="text-primary text-sm mt-0">
                                        {errors.firstName.message}
                                    </p>
                                )}

                                <input
                                    type="text"
                                    placeholder="last name"
                                    {...register('lastName')}
                                    className={`w-full px-4 py-3 rounded-lg bg-black ${
                                        errors.lastName
                                            ? 'ring-red-200'
                                            : 'ring-green-200'
                                    } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                                />
                                {errors.lastName && (
                                    <p className="text-primary text-sm mt-0">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                            <input
                                type="text"
                                placeholder="email"
                                {...register('email')}
                                className={`w-full px-4 py-3 rounded-lg  bg-black ${
                                    errors.email
                                        ? 'ring-red-200'
                                        : 'ring-green-200'
                                } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                            />
                            {errors.email && (
                                <p className="text-primary text-sm mt-0">
                                    {errors.email.message}
                                </p>
                            )}
                            <input
                                type="text"
                                placeholder="username"
                                {...register('username')}
                                className={`w-full px-4 py-3 rounded-lg  bg-black ${
                                    errors.username
                                        ? 'ring-red-200'
                                        : 'ring-green-200'
                                } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                            />
                            {errors.username && (
                                <p className="text-primary text-sm mt-0">
                                    {errors.username.message}
                                </p>
                            )}
                            <input
                                type="password"
                                placeholder="password"
                                {...register('password')}
                                className={`w-full px-4 py-3 rounded-lg  bg-black ${
                                    errors.password
                                        ? 'ring-red-200'
                                        : 'ring-green-200'
                                } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                            />
                            {errors.password && (
                                <p className="text-primary text-sm mt-0">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="bg-primary btn border border-gray-300 btn-outline text-white block text-center 3xl:text-xl rounded-lg py-2 px-5 w-full shadow-lg mt-4 mx-auto"
                        >
                            Register
                        </button>
                        <Link href={'/login'}>
                            <p className="text-base text-primary cursor-pointer text-center my-6 hover:underline">
                                Already have an account? Log in
                            </p>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
