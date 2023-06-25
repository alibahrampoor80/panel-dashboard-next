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
    ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'

import {usePathname} from 'next/navigation';


const Header = () => {

    const pathname = usePathname();


    return <>
        <header
            className={'sticky top-0 w-full transiton-all duration-100 ease-out z-30 shadow-menu md:shadow-none backdrop-blur-2xl blur-0 opacity-100 shadow-xl'}>
            <div className="container xl:max-w-screen-xl top-0 py-2 md:py-5 md:px-0 ">
                <div className="w-full mx-auto">
                    <div className="md:flex items-center">

                        <ul className={'md:gap-y-0 flex flex-col md:flex-row md:items-center justify-between gap-x-8 gap-y-6 text-secondary-700 md:text-skin-base'}>
                            <li className={'block'}>
                                <Link href={''}
                                      className={`py-2 md:py-1 flex items-center gap-x-2  cursor-pointer transition-all duration-300 ${pathname === '/' ? "text-primary-900" : "md:hover:text-primary-900"}`}>
                                    <HomeIcon className={'w-6 h-6'}/>
                                    صفحه ی اصلی

                                </Link></li>
                            <li className={'block'}>
                                <Link href={''}
                                      className={'py-2 md:py-1 flex items-center gap-x-2 md:hover:text-primary-900 cursor-pointer transition-all duration-300'}>
                                    <FolderIcon className={'w-6 h-6'}/>
                                    کارتابل
                                </Link>
                            </li>
                            <li className={'block'}>
                                <Link href={''}
                                      className={'py-2 md:py-1 flex items-center gap-x-2 md:hover:text-primary-900 cursor-pointer transition-all duration-300'}>

                                    <BuildingOfficeIcon className={'w-6 h-6'}/>

                                    پردیس ها
                                </Link>
                            </li>
                            <li className={'block'}>
                                <Link href={''}
                                      className={'py-2 md:py-1 flex items-center gap-x-2 md:hover:text-primary-900 cursor-pointer transition-all duration-300'}>
                                    <UsersIcon className={'w-6 h-6'}/>
                                    تیم
                                    های رشد</Link>
                            </li>
                            <li className={'block'}>
                                <Link href={''}
                                      className={'py-2 md:py-1 flex items-center gap-x-2 md:hover:text-primary-900 cursor-pointer transition-all duration-300'}>
                                    <CodeBracketIcon className={'w-6 h-6'}/>
                                    پروژه
                                </Link>
                            </li>
                            <li className={'block'}>
                                <Link href={''}
                                      className={'py-2 md:py-1 flex items-center gap-x-2 md:hover:text-primary-900 cursor-pointer transition-all duration-300'}>
                                    <PencilSquareIcon className={'w-6 h-6'}/>
                                    قراردادها
                                </Link>
                            </li>
                            <li className={'block hs-dropdown relative [--strategy:absolute]'}>
                                <button id="hs-dropdown-left-but-right-on-lg"
                                        className={`py-2 md:py-1 flex items-center gap-x-2 cursor-pointer transition-all duration-300 hs-dropdown-toggle ${pathname === '/users' ? "text-primary-900" : "md:hover:text-primary-900"}
                                         ${pathname === '/users/create' ? "text-primary-900" : "md:hover:text-primary-900"}
                                         ${pathname === '/users/usercreatefast' ? "text-primary-900" : "md:hover:text-primary-900"}
                                         ${pathname === '/users/top' ? "text-primary-900" : "md:hover:text-primary-900"}
                                         ${pathname === '/users/logs' ? "text-primary-900" : "md:hover:text-primary-900"}
                                         ${pathname === '/users/list' ? "text-primary-900" : "md:hover:text-primary-900"}
                                        
                                        `}>
                                    <UsersIcon className={'w-6 h-6'}/>
                                    کاربران
                                    <ChevronDownIcon className={'w-6 h-6'}/>
                                </button>
                                <div
                                    className={'hs-dropdown-menu w-20 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 top-0 lg:left-auto lg:right-0 min-w-[12.5rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700'}
                                    aria-labelledby="hs-dropdown-left-but-right-on-lg">

                                    <div className="py-2 first:pt-0 last:pb-0">
                                        <Link
                                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                            href="/users/create">
                                            <UserPlusIcon className={'w-6 h-6'}/>
                                            افزودن کاربر
                                        </Link>

                                        <Link
                                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                            href="/users/usercreatefast">
                                            <UserPlusIcon className={'w-6 h-6'}/>
                                            افزودن سریع کاربر
                                        </Link>
                                        <Link
                                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                            href="/users/list">
                                            <UserGroupIcon className={'w-6 h-6'}/>

                                            مدیریت کاربران
                                        </Link>
                                        <Link
                                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                            href="/users/logs">
                                            <ChartBarIcon className={'w-6 h-6'}/>
                                            گزارشات سامانه
                                        </Link>

                                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                           href="#">
                                            <ArrowTrendingUpIcon className={'w-6 h-6'}/>
                                            فعال ترین ها
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className={'block'}>
                                <Link href={''}
                                      className={'py-2 md:py-1 flex items-center gap-x-2 md:hover:text-primary-900 cursor-pointer transition-all duration-300'}>
                                    <ChartBarIcon className={'w-6 h-6'}/>
                                    گزارشات</Link>
                            </li>
                            <li className={'block'}>
                                <Link href={''}
                                      className={'py-2 md:py-1 flex items-center gap-x-2 md:hover:text-primary-900 cursor-pointer transition-all duration-300'}>
                                    <Cog6ToothIcon className={'w-6 h-6'}/>
                                    تنظیمات</Link>
                            </li>
                        </ul>
                    </div>


                </div>
            </div>
        </header>
    </>
}
export default Header