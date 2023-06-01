import Link from "next/link";

const SideBar = () => {

    return <>
        <div>
            <ul className={'flex flex-col space-y-8 w-full p-4'}>
                <li className={'w-full'}><Link href={'/'} className={'w-full block'}>صفحه ی اصلی</Link></li>
                <li className={'w-full'}><Link href={'/profile'} className={'w-full block'}>داشبورد</Link></li>
                <li className={'w-full'}><Link href={'/profile/me'} className={'w-full block'}>اطلاعات کاربری</Link></li>
                <li>
                    <button>
                        خروج
                    </button>
                </li>
            </ul>
        </div>
    </>
}
export default SideBar