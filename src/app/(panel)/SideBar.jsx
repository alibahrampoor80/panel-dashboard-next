import Link from "next/link";
import {
    ArrowRightOnRectangleIcon, FingerPrintIcon,
    InboxArrowDownIcon, KeyIcon, PencilIcon,
    PencilSquareIcon,
    Square3Stack3DIcon
} from "@heroicons/react/24/outline";
import {UserCircleIcon} from "@heroicons/react/20/solid";
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import {Button} from "@mui/material";

const SideBar = () => {
    const StyledBadge = styled(Badge)(({theme}) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    return <>
        <div className={'bg-white overflow-y-auto flex flex-col p-5 h-screen pt-16 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700'}>
            <div className=" flex-1">
                <ul className={'flex flex-col space-y-2 w-full '}>
                    
                    <li className={'w-full'}>
                        <img src="/img/logo-shorou-transparent.png" alt=""/>
                    </li>
                    <li className={'w-full'}>
                        <Link href={'/'}
                              className={'flex items-center gap-x-2 rounded-2xl font-medium bg-primary-100/40 text-primary-900 hover:text-primary-900 transition-all duration-200 py-3 px-4 dark:text-white'}>
                            <Square3Stack3DIcon className={'w-6 h-6'}/>
                            کارهای من
                        </Link>
                    </li>
                    <li className={'w-full'}>
                        <Link href={'/profile'}
                              className={'flex items-center gap-x-2 rounded-2xl font-medium hover:text-primary-900 transition-all duration-200 text-secondary-700 py-3 px-4 dark:text-white dark:hover:text-primary-900'}>
                            <InboxArrowDownIcon className={'w-6 h-6'}/>
                            نامه ها
                        </Link>
                    </li>
                    <li className={'w-full'}>
                        <Link href={'/profile/me'}
                              className={'flex items-center gap-x-2 rounded-2xl font-medium hover:text-primary-900 transition-all duration-200 text-secondary-700 py-3 px-4 dark:text-white dark:hover:text-primary-900'}>
                            <PencilSquareIcon className={'w-6 h-6'}/>
                            امضا
                        </Link>
                    </li>
                    <li className={'w-full'}>
                        <Link href={'/profile/me'}
                              className={'flex items-center gap-x-2 rounded-2xl font-medium hover:text-primary-900 transition-all duration-200 text-secondary-700 py-3 px-4 dark:text-white dark:hover:text-primary-900'}>
                            <FingerPrintIcon className={'w-6 h-6'}/>
                            مهر
                        </Link>
                    </li>
                    <li className={'w-full'}>
                        <Link href={'/profile/me'}
                              className={'flex items-center gap-x-2 rounded-2xl font-medium hover:text-primary-900 transition-all duration-200 text-secondary-700 py-3 px-4 dark:text-white dark:hover:text-primary-900'}>
                            <UserCircleIcon className={'w-6 h-6'}/>
                            حساب
                            های فعال
                        </Link>
                    </li>
                    <li className={'w-full'}>
                        <Link href={'/profile/me'}
                              className={'flex items-center gap-x-2 rounded-2xl font-medium hover:text-primary-900 transition-all duration-200 text-secondary-700 py-3 px-4 dark:text-white dark:hover:text-primary-900'}>
                            <KeyIcon className={'w-6 h-6'}/>
                            تغییر
                            رمز عبور</Link>
                    </li>
                    <li className={'w-full'}>
                        <button
                            className={'w-full flex items-center gap-x-2 rounded-2xl font-medium transition-all duration-200 text-secondary-700 py-3 px-4 hover:text-red-400 cursor-pointer dark:text-white dark:hover:text-red-400'}>
                            <ArrowRightOnRectangleIcon className={'w-6 h-6'}/>
                            خروج
                        </button>
                    </li>
                </ul>
            </div>
            <div className="mt-5 ">
                <div className="w-full flex justify-between text-center">
                    <div className="flex items-center flex-1">
                        <div className="relative ml-2">
                            <Link href="">
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                    variant="dot"
                                >
                                    <Avatar alt="Remy Sharp" src="/img/kk.jpg"/>
                                </StyledBadge>

                            </Link>
                        </div>
                        <div className="text-sm flex flex-col text-right text-secondary-700 flex-1 dark:text-white">
                            <Link href={''}>
                                <span
                                    className="font-bold block mb-0.5 text-sm truncate w-32 lg:w-24 ">علی بهرامپور</span>
                            </Link>
                            <span className="block opacity-60 text-xs w-full">دانشجو</span>
                        </div>

                        <a href="/profile/me">
                            <Button className={'rounded-full flex items-center justify-center border-gray-200 dark:text-white'}>

                                <PencilIcon className={'w-5 h-5'}/>

                                <span className="MuiTouchRipple-root muirtl-w0pj6f"></span>
                            </Button>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    </>
}
export default SideBar