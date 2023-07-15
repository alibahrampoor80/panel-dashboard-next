import Link from "next/link";
import {ChevronLeftIcon, HomeIcon} from "@heroicons/react/24/outline";

const BreadCrumbComponents = () => {

    return <>
        <div className="bread-crumb mb-5">
            <ul className="flex items-center">
                <li className="inline-flex items-center">
                    <Link href="#" className=" text-blue-500 transition-all duration-300 hover:text-blue-600">
                        <HomeIcon className={'w-5 h-5'}/>
                    </Link>

                    <ChevronLeftIcon className={'w-5 h-5'}/>
                </li>


                <li className="inline-flex items-center">
                    <Link href="#" className=" text-blue-500 transition-all duration-300 hover:text-blue-600">
                        کاربران
                    </Link>

                    <ChevronLeftIcon className={'w-5 h-5'}/>
                </li>

                <li className="inline-flex items-center">
                    <Link href="#" className=" text-blue-500 transition-all duration-300 hover:text-blue-600">
                        لیست کاربران
                    </Link>
                </li>
            </ul>
        </div>
    </>
}
export default BreadCrumbComponents