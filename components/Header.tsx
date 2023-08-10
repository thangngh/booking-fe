'use client';

import { signOut, useSession } from 'next-auth/react';
import {
    ClickAwayListener,
    ThemeProvider,
    Tooltip,
    createTheme,
} from '@mui/material';
import React, { Suspense } from 'react';
import Link from 'next/link';
import Hamburger from './Hamburger';
const theme = createTheme({
    components: {
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    padding: '0px',
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: 'transparent',
                    color: '#fff',
                },
                popper: {
                    margin: '0px',
                    top: '-10px !important',
                },
                tooltipPlacementBottom: {
                    margin: '0px !important',
                },
            },
        },
    },
});
export default function Header() {
    const session = useSession();
    const [isOpenHamburger, setIsOpenHamburger] = React.useState(false);
    const [showPopUp, setShowPopUp] = React.useState(false);

    const handleHamburger = () => {
        setIsOpenHamburger(!isOpenHamburger);
    };

    const handleShowPopUp = () => {
        setShowPopUp(!showPopUp);
    };

    const handleClosePopUp = () => {
        setShowPopUp(false);
    };

    const logout = () => {
        signOut({
            callbackUrl: '/',
            redirect: true,
        });
    };
    return (
        <ThemeProvider theme={theme}>
            <div
                className={`overlay ${
                    // openModal
                    false
                        ? 'fixed top-0 left-0 pointer-events-auto opacity-50 w-screen h-screen bg-[#000] z-50'
                        : 'pointer-events-none'
                }`}
            ></div>
            <div className="w-full relative mx-auto bg-white">
                <div className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div className="w-auto max-w-full flex items-center space-x-2">
                            <span className="text-black font-mono">LOGO</span>
                        </div>
                        <div className="max-w-full flex items-center justify-end space-x-4">
                            <div className="cursor-pointer">
                                <Hamburger
                                    isOpenHamburger={isOpenHamburger}
                                    handleHamburger={handleHamburger}
                                />
                                <div className="hidden relative px-1 md:block tracking-wider ">
                                    {session.data ? (
                                        <>
                                            <div className="inline-flex items-center space-x-2">
                                                <div className="w-6 h-6 block relative border rounded-full border-black">
                                                    <svg
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            className="fill-current text-gray-300 group-hover:text-cyan-300"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                        />
                                                    </svg>
                                                </div>
                                                <ClickAwayListener
                                                    onClickAway={
                                                        handleClosePopUp
                                                    }
                                                >
                                                    <div className="bg-transparent relative">
                                                        <Tooltip
                                                            PopperProps={{
                                                                disablePortal:
                                                                    true,
                                                            }}
                                                            onClose={
                                                                handleClosePopUp
                                                            }
                                                            placement="bottom"
                                                            open={showPopUp}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={
                                                                <div
                                                                    className={`flex flex-col font-nunito absolute z-[900] top-7 p-1 border min-w-[230px] w-full h-fit bg-white text-cyan-800 md:right-[-20px] 
                                    ${
                                        !showPopUp
                                            ? 'invisible'
                                            : 'visible rounded-lg'
                                    }  animate-slide-in-up hover:visible text-lg`}
                                                                >
                                                                    <div className="text-gray-900">
                                                                        <div
                                                                            className="p-1 my-1 border-l-2  border-white hover:border-[#848ABD] hover:text-[#848ABD] cursor-pointer "
                                                                            onClick={
                                                                                logout
                                                                            }
                                                                        >
                                                                            <span>
                                                                                Logout
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
                                                        >
                                                            <span
                                                                className={`text-black px-2 font-mono  cursor-pointer`}
                                                                onClick={
                                                                    handleShowPopUp
                                                                }
                                                            >
                                                                {
                                                                    session.data
                                                                        ?.user
                                                                        ?.name
                                                                }
                                                            </span>
                                                        </Tooltip>
                                                    </div>
                                                </ClickAwayListener>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="inline-flex space-x-1 font-mono">
                                            <div className="cursor-pointer text-black text-sm font-medium hover:underline hidden md:block">
                                                <Link href={'/login'}>
                                                    Login
                                                </Link>
                                            </div>
                                            <span className="text-black">
                                                /
                                            </span>
                                            <div className="cursor-pointer text-black text-sm font-medium hover:underline hidden md:block">
                                                <Link href={'/register'}>
                                                    Register
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
