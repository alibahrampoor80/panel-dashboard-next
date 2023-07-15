'use client'

import Link from "next/link";

import {useCallback, useEffect, useState} from "react";
import BreadCrumbComponents from "@/components/BreadCrumb";


import dynamic from 'next/dynamic'

import PaginationComponents from "@/common/Pagination";
import {useMutation} from "react-query";
import {getAlUsers} from "@/services/getAlUsers";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import InputTextField from "@/common/InputTextField";
import {useFormik} from "formik";
import {MultiSelect} from 'primereact/multiselect';
import {Dropdown} from 'primereact/dropdown';

import {useSkills} from "@/hooks/useSkills";
import {useEducationLevel} from "@/hooks/useEducation";
import {useRoles} from "@/hooks/useRols";
import {useStates} from "@/hooks/useStateCity";
import ListUsersTable from "@/components/ListUsersTable";
import toast from "react-hot-toast";
import checkBadgeIcon from "@heroicons/react/24/outline/esm/CheckBadgeIcon";
import Select from "react-tailwindcss-select";
import {getStatesSlugCities} from "@/services/stateCityService";

const Spinner =
    dynamic(() => import('@/common/SpinnerLoading'), {ssr: false})


export default function ListUsers() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [pages, setPages] = useState(searchParams.get('page') || 1)
    const [users, setUsers] = useState([] || "")
    const [showSearch, setShowSearch] = useState(true)
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    const {data: EducationLevelData, isLoading: isLoadingEducationLevel} = useEducationLevel()
    const {data, isLoading, error, mutateAsync} =
        useMutation({mutationFn: getAlUsers})
    const {data: dataSkills, isLoading: isLoadingSkills} = useSkills()
    const {data: dataRoles, isLoading: isLoadingRoles} = useRoles()
    const {data: statesData, isLoading: isLoadingStates} = useStates()

    console.log(statesData)

    const createQueryString = useCallback((name, value) => {
        const params = new URLSearchParams(searchParams)
        params.set(name, value)
        return params.toString()
    }, [searchParams])


    useEffect(() => {
        const getPages = async () => {
            const data = await mutateAsync(pages)
            setUsers(data?.results)
        }
        getPages()
    }, [pages])


    const handelStatusUser = (e, value, userValue) => {
        console.log(e)
    }
    const handelPaginationUsers = (event, value) => {
        setPages(value)
        const queryString = value
        router.push(pathname + "?" + createQueryString("page", queryString))
    }


    const handelSearchBox = (e) => {
        // console.log(e.target.value)
    }


    // const loopUsers = () => {
    //     return (
    //         isLoading ? <Spinner/> :
    // }


    const genderRadioOption = [
        {label: "خانم", value: "خانم",},
        {label: "آقا", value: "آقا",}
    ]
    // formik send data for search ♫
    const initialValues = {
        first_name: '',
        last_name: "",
        username: '',
        mobile_number: '',
        gender: '',
        national_code: '',
        states: "",
        city: "",
        skill: "",
        role: "",
        education_level: ""
    }
    // send data formik
    const onSubmit = async (values) => {
        console.log(values)
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
    })


    const handelSkillsForm = (value) => {
        formik.setFieldValue('skill', value.value)
    }
    const handelGetValueEducationLevel = (event) => {
        const {value} = event
        formik.setFieldValue('education_level', value.title)
    }
    const handelGetValueGender = (event) => {
        formik.setFieldValue('gender', event.value)
    }
    const handelGetValueRoles = (event) => {
        const {value} = event
        // console.log(value)
        formik.setFieldValue('role', value.id)
    }
    const handelGetLabelRole = () => {
        const label = dataRoles?.results?.find(item => item.id == formik.values.role)
        return label?.name || "جایگاه"
    }

    const handelStatesForm = async (event) => {
        const {value} = event
        const resCities = await getStatesSlugCities(value)
        setCities(resCities.results ? resCities.results : [])
        formik.setFieldValue('states', value)
    }

    const handelCitiesForm = (event) => {
        const {value} = event
        formik.setFieldValue('city', value)
    }


    useEffect(() => {
        setStates(statesData)
    }, [statesData, cities])

    console.log(formik.values)


    const handelChecked = (item) => {
        console.log(item)
    }


    return <>

        <div className=" rounded-tr-3xl p-4 md:p-6 lg:p-10 overflow-y-auto mt-10 h-screen">
            <BreadCrumbComponents/>

            <h1 className={'text-3xl'}>لیست کاربران</h1>

            <div className="relative overflow-x-auto  sm:rounded-lg">
                <div className=" py-4 ">
                    <button className={'btn btn--primary my-3'} onClick={() =>
                        setShowSearch(!showSearch)}>جستجوی پیشرفته
                    </button>

                    {
                        showSearch ? (
                            <div className={'gap-3  w-full rounded-xl shadow-md  p-3'}>
                                <p className={'font-bold text-2xl'}>جستجو بر اساس : </p>
                                <form onSubmit={formik.handleSubmit} className={'space-y-3 mt-3 form w-100'}>
                                    <div className="grid grid-cols-4 gap-3">

                                        <InputTextField label={'نام کاربری'}
                                                        name={'username'}
                                                        formik={formik}
                                        />
                                        <InputTextField label={'نام'}
                                                        name={'first_name'}
                                                        formik={formik}
                                        />
                                        <InputTextField label={'نام خانوادگی'}
                                                        name={'last_name'}
                                                        formik={formik}
                                        />
                                        <InputTextField label={'شماره ی موبایل'}
                                                        name={'mobile_number'}
                                                        formik={formik}
                                        />
                                        <InputTextField label={'کد ملی'}
                                                        name={'national_code'}
                                                        formik={formik}
                                        />
                                        <div>
                                            <label className={'block text-black font-bold dark:text-white'}
                                                   htmlFor={'skill'}>تخصص:</label>
                                            <MultiSelect
                                                id={'skill'}
                                                name={'skill'}
                                                value={formik.values.skill}
                                                options={dataSkills?.results}
                                                onChange={(e) =>
                                                    handelSkillsForm(e)}
                                                optionLabel="title"
                                                optionValue={'id'}
                                                display="chip"
                                                filter
                                                placeholder="تخصص"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm !rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "/>
                                        </div>

                                        <div>
                                            <label className={'block text-black font-bold dark:text-white'}
                                                   htmlFor={'skill'}>تحصیلات:</label>
                                            <Dropdown
                                                value={formik.values.education_level}
                                                onChange={(e) => handelGetValueEducationLevel(e)}
                                                options={EducationLevelData?.results}
                                                optionLabel="title"
                                                inputId="education_level"
                                                placeholder={formik.values.education_level || "تحصیلات"}
                                                name="education_level"
                                                className="bg-gray-50 border border-gray-300  text-sm !rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:!text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                        </div>

                                        <div>
                                            <label className={'block text-black font-bold dark:text-white'}
                                                   htmlFor={'skill'}>جنسیت:</label>
                                            <Dropdown
                                                value={formik.values.gender}
                                                onChange={(e) => handelGetValueGender(e)}
                                                options={genderRadioOption}
                                                optionLabel="label"
                                                inputId="gender"
                                                placeholder={formik.values.gender || "جنسیت"}
                                                name="gender"
                                                className="bg-gray-50 border border-gray-300  text-sm !rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:!text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                        </div>

                                        <div>
                                            <label className={'block text-black font-bold dark:text-white'}
                                                   htmlFor={'skill'}>جایگاه:</label>

                                            <Dropdown
                                                value={formik.values.role}
                                                onChange={(e) => handelGetValueRoles(e)}
                                                options={dataRoles?.results}
                                                optionLabel="name"
                                                inputId="role"
                                                placeholder={handelGetLabelRole()}
                                                name="role"
                                                className="bg-gray-50 border border-gray-300  text-sm !rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:!text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                        </div>


                                        <div className={''}>
                                            <label className={'block text-black font-bold dark:text-white'}
                                                   htmlFor={'states'}>استان:</label>
                                            <Dropdown
                                                id={'states'}
                                                name={'states'}
                                                value={formik.values.states}
                                                options={statesData?.results}
                                                onChange={(e) =>
                                                    handelStatesForm(e)}
                                                optionLabel="label"
                                                optionValue={'id'}
                                                filter
                                                placeholder="استان"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm !rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "/>
                                        </div>

                                        <div className={''}>
                                            <label className={'block text-black font-bold dark:text-white'}
                                                   htmlFor={'city'}>شهر:</label>
                                            <Dropdown
                                                id={'city'}
                                                name={'city'}
                                                value={formik.values.city}
                                                options={cities}
                                                onChange={(e) =>
                                                    handelCitiesForm(e)}
                                                optionLabel="title"
                                                optionValue={'id'}
                                                filter
                                                placeholder="لطفا یک استان انتخاب کنید"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm !rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "/>
                                        </div>


                                    </div>
                                    <button className={'btn btn--primary'} type={'submit'}>جستجو</button>
                                </form>
                            </div>
                        ) : ""
                    }

                </div>


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table
                        className="w-full text-sm text-right text-gray-500 dark:text-gray-400  [&>tbody>*:nth-child(odd)]:dark:bg-gray-800 [&>tbody>*:nth-child(odd)]:bg-gray-100 ">
                        <thead
                            className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                نام
                            </th>
                            <th scope="col" className="px-6 py-3">
                                شماره ی مویایل
                            </th>
                            <th scope="col" className="px-6 py-3">
                                جایگاه
                            </th>
                            <th scope="col" className="px-6 py-3">
                                تاریخ ورود
                            </th>
                            <th scope="col" className="px-6 py-3">
                                وضعیت
                            </th>
                            <th scope="col" className="px-6 py-3">
                                عملیات
                            </th>
                        </tr>
                        </thead>
                        <tbody className={''}>

                        {
                            isLoading ? <Spinner/> :
                                <ListUsersTable users={users} handelStatusUser={handelStatusUser}
                                                handelChecked={handelChecked || false}/>
                        }

                        </tbody>
                    </table>
                </div>

            </div>

            <div className="py-4  dark:!text-white mt-3">

                {data?.total_pages > 1 &&
                    <PaginationComponents handelPaginationUsers={(e, value) =>
                        handelPaginationUsers(e, value)}
                                          totalPages={data?.total_pages}
                                          page={pages || searchParams?.get('page')}
                    />
                }
            </div>
        </div>
    </>
}