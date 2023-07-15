import {ToLocalDateString} from "@/utils/toLocalDate";
import {Tooltip} from "flowbite-react";
import {styled} from '@mui/material/styles';

import {
    KeyIcon,
    PencilIcon,
    PencilSquareIcon,
    TrashIcon
} from "@heroicons/react/24/outline";
import Switch from '@mui/material/Switch';
import Link from "next/link";

export default function ListUsersTable({users, handelStatusUser, handelChecked}) {

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({theme}) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));

    return <>
        {
            users.map(item => (
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={item.id}>

                    <td className="px-6 py-4">
                        <Link href={`/users/profile/${item.id}`}>
                            {item.first_name} {item.last_name}
                        </Link>
                    </td>
                    <td className="px-6 py-4">
                        {item.mobile_number}
                    </td>
                    <td className="px-6 py-4">
                        $2999
                    </td>
                    <td className="px-6 py-4">
                        {ToLocalDateString(item.date_joined)}
                    </td>
                    <td className="px-6 py-4">
                        <IOSSwitch sx={{m: 1}}
                                   onChange={(e, value) => handelStatusUser(e, value, item)}
                                   defaultChecked={false}/>
                    </td>
                    <td className="px-6 py-4">
                        <span className="flex gap-x-3">
                            <Tooltip content="عقد قرارداد">
                                <button
                                    className={'bg-violet-500 p-2 rounded-xl text-white transition-all duration-300 hover:bg-violet-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:border-gray-600'}>
                                    <PencilSquareIcon className={'w-6 h-6'}/>
                                </button>
                            </Tooltip>
                            <Tooltip content="تغییر کلمه ی عبور">
                                <button
                                    className={'bg-yellow-300 p-2 rounded-xl text-white transition-all duration-300 hover:bg-yellow-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:border-gray-600'}>
                                    <KeyIcon className={'w-6 h-6'}/>
                                </button>
                            </Tooltip>
                            <Tooltip content="ویرایش">
                                <button
                                    className={'bg-primary-600 p-2 rounded-xl text-white transition-all duration-300 hover:bg-primary-700 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:border-gray-600'}>
                                    <PencilIcon className={'w-6 h-6'}/>
                                </button>
                            </Tooltip>
                            <Tooltip content="حذف">
                                <button
                                    className={'bg-red-600 p-2 rounded-xl text-white transition-all duration-300 hover:bg-red-700 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:border-gray-600'}>
                                    <TrashIcon className={'w-6 h-6'}/>
                                </button>
                            </Tooltip>

                        </span>
                    </td>

                </tr>

            ))
        }
    </>
}