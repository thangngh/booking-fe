'use client';
import MuiDrawer from '@mui/material/Drawer';
import {
    CSSObject,
    Collapse,
    CssBaseline,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Theme,
    Toolbar,
    Typography,
    styled,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import React from 'react';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from 'next-auth/react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

interface IMenu {
    id: number;
    title: string;
    subItem?: {
        id: number;
        title: string;
    }[];
}

interface IProp {
    data: IMenu[];
    title?: string;
    username?: string;
}
export default function Sidebar({ data, title, username }: IProp) {
    const [open, setOpen] = React.useState(false);
    const [openSubMenu, setOpenSubMenu] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSubMenu = () => {
        setOpenSubMenu(!openSubMenu);
    };

    // const mainPath = 'recipe';
    // const subPath = '/';
    return (
        <div>
            <CssBaseline />
            {/* header start */}
            <AppBar position="fixed" open={open}>
                <Toolbar className="flex justify-between items-center">
                    <div className="inline-flex items-center">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            className="hidden sm:block"
                        >
                            {title}
                        </Typography>
                    </div>
                    <div className="relative flex space-x-3 items-center">
                        {/* <Image
                            src={'https://i.pravatar.cc/150?img=32'}
                            alt="Picture of the author"
                            width={30}
                            height={30}
                            className="rounded-full"
                        /> */}
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
                        <span>{username}</span>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton
                        onClick={handleDrawerClose}
                        style={{ width: '100%' }}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        <div className="flex items-center justify-between w-full px-1">
                            <span className="text-base font-semibold">
                                LOGO
                            </span>
                            <MenuIcon />
                        </div>
                    </IconButton>
                </DrawerHeader>
                {data.map((text, index) => (
                    <List key={text.id}>
                        {'subItem' in text ? (
                            <ListItem
                                disablePadding
                                sx={{ display: 'block' }}
                                className="bg-gray-200 text-black"
                            >
                                <ListItemButton
                                    onClick={handleSubMenu}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open
                                            ? 'initial'
                                            : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemText
                                        primary={text.title.toUpperCase()}
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                    {openSubMenu ? (
                                        <ExpandLess
                                            className={`${
                                                open ? '' : '!hidden'
                                            }`}
                                        />
                                    ) : (
                                        <ExpandMore
                                            className={`${
                                                open ? '' : '!hidden'
                                            }`}
                                        />
                                    )}
                                </ListItemButton>
                                <Collapse
                                    in={openSubMenu}
                                    timeout="auto"
                                    unmountOnExit
                                    //   className={` ${
                                    //     text.title === mainPath ? " bg-gray-200 text-black" : ""
                                    //   }`}
                                    className="bg-gray-200 text-black"
                                >
                                    <List
                                        component="div"
                                        disablePadding
                                        sx={{ pl: 4 }}
                                        className={`${open ? '' : 'hidden'}`}
                                    >
                                        {text?.subItem &&
                                            text?.subItem.map(
                                                (subText, index) => (
                                                    <ListItem
                                                        key={index}
                                                        disablePadding
                                                        sx={{
                                                            display: 'block',
                                                        }}
                                                        className="bg-gray-200 text-black"
                                                    >
                                                        <Link
                                                            href={`/dashboard/${
                                                                text.title
                                                            }/${encodeURIComponent(
                                                                subText.title,
                                                            )}`}
                                                        >
                                                            <ListItemButton
                                                                sx={{
                                                                    minHeight: 48,
                                                                    justifyContent:
                                                                        open
                                                                            ? 'initial'
                                                                            : 'center',
                                                                    px: 2.5,
                                                                }}
                                                            >
                                                                <ListItemText
                                                                    primary={subText.title.toUpperCase()}
                                                                    sx={{
                                                                        opacity:
                                                                            open
                                                                                ? 1
                                                                                : 0,
                                                                    }}
                                                                />
                                                            </ListItemButton>
                                                        </Link>
                                                    </ListItem>
                                                ),
                                            )}
                                    </List>
                                </Collapse>
                            </ListItem>
                        ) : (
                            <ListItem
                                disablePadding
                                sx={{ display: 'block' }}
                                className="bg-gray-200 text-black"
                            >
                                <Link
                                    href={`/dashboard/${encodeURIComponent(
                                        text.title,
                                    )}`}
                                >
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open
                                                ? 'initial'
                                                : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemText
                                            primary={text.title.toUpperCase()}
                                            sx={{ opacity: open ? 1 : 0 }}
                                        />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        )}
                    </List>
                ))}
            </Drawer>
            {/* <div className="w-max -mb-3 absolute bottom-1 z-[9999]">
                <div
                    onClick={() => {
                        signOut({
                            callbackUrl: '/',
                            redirect: true,
                        });
                    }}
                    className="group flex items-center space-x-4 rounded-md px-5 py-3 text-gray-600 cursor-pointer"
                >
                    <svg
                        className="group-hover:text-gray-700 h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                    </svg>
                    <span
                        className={`group-hover:text-gray-700 ${
                            open ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        LOGOUT
                    </span>
                </div>
            </div> */}
        </div>
    );
}
