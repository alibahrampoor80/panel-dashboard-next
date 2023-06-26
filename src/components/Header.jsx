'use client'

import Link from "next/link";
import {
    HomeIcon,
    FolderIcon,
    BuildingOfficeIcon,
    UsersIcon,
    CodeBracketIcon,
    PencilSquareIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ChevronDownIcon,
    UserPlusIcon,
    UserGroupIcon,
    ArrowTrendingUpIcon, ComputerDesktopIcon, SunIcon, MoonIcon as MoonIconOutline
} from '@heroicons/react/24/outline'

import {usePathname} from 'next/navigation';
import {MoonIcon} from "@heroicons/react/24/solid";
import {useTheme} from "next-themes";
import {useEffect} from "react";

const Header = () => {

    const pathname = usePathname();

    const {theme, setTheme, systemTheme} = useTheme()


    return <>
        <header
            className={'fixed top-0 w-full transiton-all duration-100 ease-out z-30 shadow-menu backdrop-blur-2xl blur-0 opacity-100 shadow-md dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700'}>
            <div className=" top-0 py-2 md:py-3 md:px-5 ">
                <div className="w-full mx-auto">
                    <div className="md:flex items-center">

                        <ul className={'md:gap-y-0 flex flex-col md:flex-row md:items-center justify-between gap-x-8 gap-y-6 text-secondary-700 md:text-skin-base '}>
                            <li className={'block'}>
                                <Link href={''}
                                      className={`py-2 md:py-1 flex items-center gap-x-2  cursor-pointer transition-all duration-300 dark:text-white ${pathname === '/' ? "text-primary-900 font-bold" : "md:hover:text-primary-900"}`}>
                                    <HomeIcon className={'w-6 h-6'}/>
                                    صفحه ی اصلی
                                </Link></li>
                            <li className={'block'}>
                                <Link href={''}
                                      className={'py-2 md:py-1 flex items-center gap-x-2 md:hover:text-primary-900 cursor-pointer transition-all duration-300 dark:text-white'}>
                                    <FolderIcon className={'w-6 h-6'}/>
                                    کارتابل
                                </Link>
                            </li>
                            <li className={'block'}>
                                <Link href={''}
                                      className={'py-2 md:py-1 flex items-center gap-x-2 md:hover:text-primary-900 cursor-pointer transition-all duration-300 dark:text-white'}>

                                    <BuildingOfficeIcon className={'w-6 h-6'}/>
                                    پردیس ها
                                </Link>
                            </li>
                            <li className={'block'}>
                                <Link href={''}
                                      className={'py-2 md:py-1 flex items-center gap-x-2 md:hover:text-primary-900 cursor-pointer transition-all duration-300 dark:text-white'}>
                                    <UsersIcon className={'w-6 h-6'}/>
                                    تیم
                                    های رشد</Link>
                            </li>
                            <li className={'block'}>
                                <Link href={''}
                                      className={'py-2 md:py-1 flex items-center gap-x-2 md:hover:text-primary-900 cursor-pointer transition-all duration-300 dark:text-white'}>
                                    <CodeBracketIcon className={'w-6 h-6'}/>
                                    پروژه
                                </Link>
                            </li>
                            <li className={'block'}>
                                <Link href={''}
                                      className={'py-2 md:py-1 flex items-center gap-x-2 md:hover:text-primary-900 cursor-pointer transition-all duration-300 dark:text-white'}>
                                    <PencilSquareIcon className={'w-6 h-6'}/>
                                    قراردادها
                                </Link>
                            </li>
                            <li className={'block hs-dropdown relative [--strategy:absolute]'}>
                                <button id="hs-dropdown-left-but-right-on-lg"
                                        className={`py-2 md:py-1 flex items-center gap-x-2 cursor-pointer transition-all duration-300 hs-dropdown-toggle dark:text-white
                                        ${pathname === '/users' ? "text-primary-900 font-bold" : "md:hover:text-primary-900"}
                                         ${pathname === '/users/create' ? "text-primary-900 font-bold" : "md:hover:text-primary-900"}
                                         ${pathname === '/users/usercreatefast' ? "text-primary-900 font-bold" : "md:hover:text-primary-900"}
                                         ${pathname === '/users/top' ? "text-primary-900" : "md:hover:text-primary-900"}
                                         ${pathname === '/users/logs' ? "text-primary-900 font-bold" : "md:hover:text-primary-900"}
                                         ${pathname === '/users/list' ? "text-primary-900 font-bold" : "md:hover:text-primary-900"}
                                        
                                        `}>
                                    <UsersIcon className={'w-6 h-6'}/>
                                    کاربران
                                    <ChevronDownIcon className={'w-6 h-6'}/>
                                </button>
                                <div
                                    className={'hs-dropdown-menu w-20 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 top-0 lg:left-auto lg:right-0 min-w-[12.5rem] bg-white shadow-md rounded-lg p-2 mt-2   dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700'}
                                    aria-labelledby="hs-dropdown-left-but-right-on-lg">

                                    <div className="py-2 first:pt-0 last:pb-0">
                                        <Link
                                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 hover:text-primary-900 transition-all duration-300 dark:hover:bg-primary-100/40  dark:text-white "
                                            href="/users/create">
                                            <UserPlusIcon className={'w-6 h-6'}/>
                                            افزودن کاربر
                                        </Link>

                                        <Link
                                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 hover:text-primary-900 transition-all duration-300 dark:hover:bg-primary-100/40 dark:text-white"
                                            href="/users/usercreatefast">
                                            <UserPlusIcon className={'w-6 h-6'}/>
                                            افزودن سریع کاربر
                                        </Link>
                                        <Link
                                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 hover:text-primary-900 transition-all duration-300 dark:hover:bg-primary-100/40 dark:text-white"
                                            href="/users/list">
                                            <UserGroupIcon className={'w-6 h-6'}/>

                                            مدیریت کاربران
                                        </Link>
                                        <Link
                                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 hover:text-primary-900 transition-all duration-300 dark:hover:bg-primary-100/40 dark:text-white"
                                            href="/users/logs">
                                            <ChartBarIcon className={'w-6 h-6'}/>
                                            گزارشات سامانه
                                        </Link>

                                        <Link
                                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 hover:text-primary-900 transition-all duration-300 dark:hover:bg-primary-100/40 dark:text-white"
                                            href="#">
                                            <ArrowTrendingUpIcon className={'w-6 h-6'}/>
                                            فعال ترین ها
                                        </Link>
                                    </div>
                                </div>
                            </li>
                            <li className={'block'}>
                                <Link href={''}
                                      className={'py-2 md:py-1 flex items-center gap-x-2 md:hover:text-primary-900 cursor-pointer transition-all duration-300 dark:text-white'}>
                                    <ChartBarIcon className={'w-6 h-6'}/>
                                    گزارشات</Link>
                            </li>
                            <li className={'block'}>
                                <Link href={''}
                                      className={'py-2 md:py-1 flex items-center gap-x-2 md:hover:text-primary-900 cursor-pointer transition-all duration-300 dark:text-white'}>
                                    <Cog6ToothIcon className={'w-6 h-6'}/>
                                    تنظیمات</Link>
                            </li>
                        </ul>
                        <div className="flex-1 text-white flex justify-end hs-dropdown relative [--strategy:absolute]">
                            <button id="hs-dropdown-default"
                                    className={'hs-dropdown-toggle hs-dropdown-toggle flex gap-x-1 text-primary-900 font-bold'}>
                                <MoonIcon className={'w-6 h-6'}/>
                                تم برنامه :
                                {" "}
                                {/*{theme}*/}
                                <ChevronDownIcon className={'w-6 h-6'}/>
                            </button>

                            <div
                                className={'hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-[9rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700'}
                                aria-labelledby="hs-dropdown-default">


                                <button onClick={() => setTheme('system')}
                                        className={'flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 hover:text-primary-900 transition-all duration-300 dark:hover:bg-primary-100/40 dark:text-white w-full'}>
                                    <ComputerDesktopIcon className={'w-6 h-6'}/>
                                    سیستم
                                </button>
                                <button onClick={() => setTheme('light')}
                                        className={'flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 hover:text-primary-900 transition-all duration-300 dark:hover:bg-primary-100/40 dark:text-white w-full sun'}>
                                    <SunIcon className={'w-6 h-6'}/>
                                    تم روشن
                                </button>
                                <button onClick={() => setTheme('dark')}
                                        className={'flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-black hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 hover:text-primary-900 transition-all duration-300 dark:hover:bg-primary-100/40 dark:text-white w-full moon'}>
                                    <MoonIconOutline className={'w-6 h-6'}/>
                                    تم دارک
                                </button>


                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </header>
    </>
}
export default Header