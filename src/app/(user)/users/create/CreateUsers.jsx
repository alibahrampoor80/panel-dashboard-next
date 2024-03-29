'use client'
import {useFormik} from "formik";
import * as Yup from 'yup'

import Input from "@/common/Input";
import RadioInput from "@/common/radioOption";
import TextareaOption from "@/common/textareaOption";

import DtPicker from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'

import toast from "react-hot-toast";


import {useSkills} from "@/hooks/useSkills";
import {Button} from "@mui/material";
import {useEffect, useState} from "react";

import Avatar from "@mui/material/Avatar";

import {useStates} from "@/hooks/useStateCity";

import DropdownList from "react-widgets/DropdownList";
import Multiselect from "react-widgets/Multiselect";
import {getStatesSlugCities} from "@/services/stateCityService";
import {useEducationLevel, useReshte} from "@/hooks/useEducation";

import {useRoles} from "@/hooks/useRols";
import Link from "next/link";
import {ChevronLeftIcon, HomeIcon} from "@heroicons/react/24/outline";
import {useMutation} from "react-query";
import {createUser} from "@/services/createUsers";
import {ThreeDots} from "react-loader-spinner";
import BreadCrumbComponents from "@/components/BreadCrumb";

export default function CreateUsers() {
    const [image, setImage] = useState(null);
    // const [getIdStates, SetGetIdStates] = useState(1)
    const [cities, setCities] = useState([])
    const [states, setStates] = useState([])
    const [errorField, setErrorField] = useState({})


    const {data: skillsData, error, isLoading: isLoadingSkills} = useSkills()
    const {data: statesData, isLoading: isLoadingStates} = useStates()
    const {data: EducationLevelData, isLoading: isLoadingEducationLevel} = useEducationLevel()
    const {data: dataReshte, isLoading: isLoadingReshte} = useReshte()
    const {data: dataRoles, isLoading: isLoadingRoles} = useRoles()

    const {
        data: dataCreateUser, isLoading: isLoadingCreateUser,
        error: errorCreateUser, mutateAsync
    } =
        useMutation({mutationFn: createUser})


    const initialValues = {
        first_name: '',
        last_name: "",
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        mobile_number: '',
        gender: '',
        national_code: '',
        tel_number: '',
        states: "",
        city: "",
        address: "",
        birth_date: "",
        college: "",
        picture: "",
        skill: "",
        education_level: "",
        major: "",
        role: ""
    }


    const onSubmit = async (values) => {

        const myData = new FormData()
        myData.append('first_name', values.first_name)
        myData.append('last_name', values.last_name)
        myData.append('username', values.username)
        myData.append('email', values.email)
        myData.append('password', values.password)
        myData.append('confirm_password', values.confirm_password)
        myData.append('mobile_number', values.mobile_number)
        myData.append('gender', values.gender)
        myData.append('national_code', values.national_code)
        myData.append('tel_number', values.tel_number)
        myData.append('states', values.states)
        myData.append('city', values.city)
        myData.append('address', values.address)
        myData.append('college', values.college)
        myData.append('birth_date', values.birth_date)
        myData.append('role', values.role)
        myData.append('picture', values.picture)
        myData.append('skill', values.skill)
        myData.append('education_level', values.education_level)
        myData.append('major', values.major)
        try {
            setErrorField(null)
            const data = await mutateAsync(myData)

            console.log(data)
            toast.success('کاربر جدید ایجاد شد')
        } catch (err) {
            const {response} = err
            const {data} = response
            setErrorField({
                ...errorField,
                username: data?.username,
                mobile_number: data?.mobile_number,
                national_code: data?.national_code,
                confirm_password: data?.confirm_password,
                password: data?.password,
                birth_date: data?.birth_date,
                skill: data?.skill,
                role: data?.role
            })

            toast.error('ارسال داده ها با خطا مواجه شد!')
            console.log(err)
        }

    }

    const FILE_SIZE = 160 * 1024;
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png"
    ];

    const validationSchema = Yup.object({
        username: Yup.string().required('فیلد را تکمیل کنید')
            .min(6, 'نام کاربری باید بیشتر از 6 کارکتر باشد')
            .matches(/[abcdefghijklmnopqrstuvwxyz]+/, {message: 'لطفا نام کاربری را به درستی وارد کنید'}),
        email: Yup.string().email('ایمیل را به درستی وارد کنید').required('فیلد ایمیل اجباری میباشد'),
        password: Yup.string().required('رمز اجباری میباشد')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, "کلمه ی عبور باید 8 کارکتر, یک حروف بزرگ, یک حروف کوچک, یک عدد"),
        mobile_number: Yup.string().required('شماره موبایل اجباری میباشد')
            .matches(/^[0-9]{11}$/, 'شماره مویایل اشتباه میباشد'),

        confirm_password: Yup.string().required('تکرار پسورد اجباری میباشد')
            .oneOf([Yup.ref('password'), null], 'تکرار کلمه ی عبور برابری ندارد!'),

        first_name: Yup.string().required('فیلد نام اجباری میباشد').min(3, 'لطفا بیشتر از 3 کارکتر وارد کنید'),
        last_name: Yup.string().required('فیلد نام خانوادگی اجباری میباشد')
            .min(5, 'لطفا بیشتر از 5 کارکتر وارد کنید'),
        gender: Yup.string().required('انتخاب جنسیت مهم است'),
        national_code: Yup.string().required('کد ملی اجباری است')
            .matches(/^[0-9]{10}$/, {message: "کد ملی را به درستی وارد کنید"}),
        tel_number: Yup.string().required('شماره ثابت اجباری است+پیش شماره استان وارد شود')
            .min(7, 'باید بیشتر از 7 کارکتر باشد')
            .max(12, 'بیشتر از 12 کارکتر نمیتواد باشد'),
        states: Yup.string().required('انتخاب استان اجباری میباشد'),
        city: Yup.string().required('انتخاب شهر اجباری میباشد'),
        address: Yup.string().required('لطفا یک آدرس وارد کنید'),
        // level_educational: Yup.string().required('انتخاب مقطع تحصیلی اجباری میباشد'),
        college: Yup.string().required('انتخاب دانشگاه اجباری میباشد'),

        picture: Yup.mixed().required('ارسال عکس اجباری میباشد')
            .test(
                "فقط عکس مجاز است",
                "فقط عکس مجاز است",
                value => value && SUPPORTED_FORMATS.includes(value.type)
            )
            .test(
                "fileSize",
                "فایل ارسالی باید کمتر از 1 مگابایت باشد ",
                value => value && value.size <= FILE_SIZE
            ),
        skill: Yup.array()
            .min(1, 'انتخاب مهارت اجباری میباشد')
            .required('انتخاب مهارت اجباری میباشد'),
        role: Yup.string()
            .min(1, 'انتخاب نقش اجباری میباشد')
            .required('انتخاب نقش اجباری میباشد'),
        major: Yup.string().required('انتخاب رشته تحصیلی اجباری میباشد'),
        education_level: Yup.string().required("انتخاب درجه تحصیلی اجباری میباشد"),
        birth_date: Yup.string().required('انتخاب سال تولد اجباری میباشد')
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,

    })
    console.log(formik.values)


    const radioOption = [
        {label: "خانم", value: "خانم",},
        {label: "آقا", value: "آقا",}
    ]


    const handelDataPicker = (e) => {
        const date_brith = `${e?.year}/${e?.month}/${e?.day}`
        formik.setFieldValue('birth_date', date_brith)
    }
    const handelImageUpload = (e) => {

        if (e.target.files.length !== 0) {
            formik.setFieldValue("picture", e?.target?.files[0])
            setImage(URL?.createObjectURL(e?.target?.files[0]));
        }
    }


    const handelGetValueStates = async (value) => {
        const statesId = value.id
        // SetGetIdStates(statesId)
        const resCities = await getStatesSlugCities(statesId)
        setCities(resCities.results ? resCities.results : [])
        // console.log(cities)
        formik.setFieldValue("states", statesId)
    }

    const handelGetValueCities = (value) => {
        // console.log(value)
        formik.setFieldValue('city', value.id)
    }

    const handelSkillsForm = (value) => {
        const result = value.map(item => item.id)
        formik.setFieldValue('skill', result)
    }

    const handelGetValueEducationLevel = (value) => {
        formik.setFieldValue('education_level', value.id)
    }
    const handelGetValueReshte = (value) => {
        formik.setFieldValue('major', value.id)
    }
    const handelGetValueRoles = (value) => {

        formik.setFieldValue('role', value.id)
    }

    useEffect(() => {
        setStates(statesData)
    }, [statesData, cities])




    // console.log(formik.values)
    return <>
        <div className=" rounded-tr-3xl p-4 md:p-6 lg:p-10 overflow-y-auto mt-10 h-screen">
            <BreadCrumbComponents/>

            <h1 className={'text-3xl'}>افزودن کاربر</h1>
            <form onSubmit={formik.handleSubmit} encType={'enctype="multipart/form-data"'}
                  className="form w-100 space-y-7 h-auto" noValidate="novalidate" id="kt_sign_up_form">
                <div className="flex flex-wrap w-full h-full">


                    <div className="w-[700px] mx-auto">

                        <div className="flex flex-col items-center  justify-center mb-5">
                            {/*file upload*/}
                            <Button component="label">
                                {/*|| '/img/default.png'*/}
                                <Avatar src={image} sx={{width: 150, height: 150}}/>
                                <input type="file"
                                       name={'image'}
                                       onChange={handelImageUpload}
                                       hidden
                                       multiple={false}
                                       accept="image/*"
                                />
                            </Button>
                            {
                                formik.errors.picture &&
                                <div className={'text-red-500'}>{formik.errors.picture}</div>
                            }
                        </div>

                        <div className="grid grid-cols-2 row-span-6 space-y-5">
                            <div className="col-span-12 flex  max-sm:flex-wrap">
                                <Input formik={formik} name={'first_name'} label={'نام'}
                                       className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>
                                <Input formik={formik} name={'last_name'} label={'نام خانوادگی'}
                                       className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>
                            </div>
                            <div className="grid grid-cols-1 row-span-12 col-span-12 flex">
                                <Input formik={formik} name={'username'} label={'نام کاربری'} type={'text'}
                                       className={'mx-2'} errorServer={errorField}/>
                            </div>
                            <div className="col-span-12 flex  max-sm:flex-wrap">

                                <Input formik={formik} name={'password'} label={'کلمه ی عبور'}
                                       type={'password'} className={'w-1/2 mx-2 md:w-full max-sm:w-full'}
                                       errorServer={errorField}/>
                                <Input formik={formik} name={'confirm_password'} label={'تکرار کلمه ی عبور'}
                                       type={'password'} className={'w-1/2 mx-2 md:w-full max-sm:w-full'}
                                       errorServer={errorField}/>

                            </div>

                            <div className="mx-2">
                                <p className={'font-bold dark:text-white'}>جنسیت:</p>
                                <ul className="grid w-full gap-6 md:grid-cols-2">
                                    <RadioInput name={'gender'} formik={formik} radioOption={radioOption}/>
                                </ul>
                            </div>

                        </div>

                        <div className="grid grid-cols-2 row-span-6 space-y-5 ">
                            <div className="col-span-12 flex  max-sm:flex-wrap ">

                                <Input formik={formik} name={'mobile_number'} label={'موبایل'}
                                       className={'w-1/2 mx-2 md:w-full max-sm:w-full'}
                                       errorServer={errorField}/>


                                <Input formik={formik} name={'tel_number'} label={'شماره ثابت'}
                                       className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>
                            </div>


                            <div className="grid grid-cols-1 row-span-12 col-span-12 ">
                                <Input formik={formik} name={'national_code'} type={'text'}
                                       className={'mx-2'}
                                       label={'کد ملی'} errorServer={errorField}/>
                            </div>
                            <div className="grid grid-cols-1 row-span-12 col-span-12 ">
                                <Input formik={formik} name={'email'} type={'email'}
                                       className={'mx-2'}
                                       label={'ایمیل'}
                                    // errorServer={errorField}
                                />
                            </div>

                            <div className="grid grid-cols-12 row-span-12 col-span-12 gap-4">
                                <div className="col-span-6 mx-2">
                                    <label htmlFor=""
                                           className={'block text-black font-bold dark:text-white'}>استان</label>
                                    <DropdownList busy busySpinner={
                                        <span className="fas fa-sync fa-spin"/>
                                    }
                                                  containerClassName={'inline-flex items-center font-bold justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100  dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'}
                                                  dataKey="id"
                                                  textField="label"
                                                  defaultValue={'انتخاب کنید'}
                                                  onChange={handelGetValueStates}
                                                  data={states?.results}
                                    />
                                    {
                                        formik.errors.states &&
                                        <div className={'text-red-500'}>{formik.errors.states}</div>
                                    }
                                    {/*{console.log(statesData?.results)}*/}

                                </div>
                                <div className="col-span-6 mx-2">
                                    <label htmlFor=""
                                           className={'block text-black font-bold dark:text-white'}>شهر</label>
                                    <DropdownList busy busySpinner={
                                        <span className="fas fa-sync fa-spin"/>
                                    }
                                                  containerClassName={'inline-flex items-center font-bold justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100  dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'}
                                                  dataKey="id"
                                                  textField="title"
                                                  onChange={handelGetValueCities}
                                                  data={cities || []}

                                    />
                                    {
                                        formik.errors.city &&
                                        <div className={'text-red-500'}>{formik.errors.city}</div>
                                    }
                                </div>
                            </div>

                            <div className="grid grid-cols-12 row-span-12 col-span-12 gap-4">
                                <div className="col-span-6 mx-2">
                                    <label htmlFor=""
                                           className={'block text-black font-bold dark:text-white'}>درجه ی
                                        تحصیلی</label>
                                    <DropdownList busy busySpinner={
                                        <span className="fas fa-sync fa-spin"/>
                                    }
                                                  containerClassName={'inline-flex items-center font-bold justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100  dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'}
                                                  dataKey="id"
                                                  textField="title"
                                                  defaultValue={'انتخاب کنید'}
                                                  onChange={handelGetValueEducationLevel}
                                                  data={EducationLevelData?.results}
                                    />
                                    {
                                        formik.errors.education_level &&
                                        <div className={'text-red-500'}>{formik.errors.education_level}</div>
                                    }
                                </div>

                                <div className="col-span-6 mx-2">
                                    <label htmlFor=""
                                           className={'block text-black font-bold dark:text-white'}>رشته تحصیلی</label>
                                    <DropdownList busy busySpinner={
                                        <span className="fas fa-sync fa-spin"/>
                                    }
                                                  containerClassName={'inline-flex items-center font-bold justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100  dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'}
                                                  dataKey="id"
                                                  textField="title"
                                                  defaultValue={'انتخاب کنید'}
                                                  onChange={handelGetValueReshte}
                                                  data={dataReshte?.results}
                                    />
                                    {
                                        formik.errors.major &&
                                        <div className={'text-red-500'}>{formik.errors.major}</div>
                                    }
                                </div>
                            </div>
                            {/*{console.log(dataReshte)}*/}

                            <div className="grid grid-cols-12 row-span-12 col-span-12 gap-4">
                                <div className="col-span-12 mx-2">

                                    <label htmlFor=""
                                           className={'block text-black font-bold dark:text-white'}>تخصص</label>
                                    <Multiselect busy busySpinner={
                                        <span className="fas fa-sync fa-spin"/>
                                    }
                                                 containerClassName={'inline-flex items-center font-bold justify-between w-full text-black bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-black dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-black hover:text-black hover:bg-gray-100  dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-black'}
                                                 dataKey="id"
                                                 textField="title"

                                                 data={skillsData?.results}
                                                 onChange={event => handelSkillsForm(event)}
                                    />
                                    {
                                        formik.errors.skill &&
                                        <div className={'text-red-500'}>{formik.errors.skill}</div>
                                    }

                                    {
                                        errorField?.skill?.map((itemError) => (
                                            <div className={'text-red-500'} key={itemError}>{itemError}</div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="grid grid-cols-12 row-span-12 col-span-12 gap-4">
                                <div className="col-span-12 mx-2">
                                    <label htmlFor=""
                                           className={'block text-black font-bold dark:text-white'}>نقش کاربر</label>
                                    <DropdownList busy busySpinner={
                                        <span className="fas fa-sync fa-spin"/>
                                    }
                                                  containerClassName={'inline-flex items-center font-bold justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100  dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white '}
                                                  dataKey="id"
                                                  textField="name"
                                                  defaultValue={'انتخاب کنید'}
                                                  onChange={handelGetValueRoles}
                                                  data={dataRoles?.results}
                                    />
                                    {
                                        formik.errors.role &&
                                        <div className={'text-red-500'}>{formik.errors.role}</div>
                                    }
                                    {
                                        errorField?.role?.map((itemError) => (
                                            <div className={'text-red-500'} key={itemError}>{itemError}</div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="grid grid-cols-1 row-span-12 col-span-12 mx-2">
                                <TextareaOption formik={formik} name={'address'} label={'آدرس'}/>
                            </div>


                            <div className="grid grid-cols-12 row-span-12 col-span-12 gap-4 mx-2">
                                <div className="col-span-6">
                                    <label htmlFor="brithDay">تاریخ تولد</label>
                                    <DtPicker
                                        id={'brithDay'}
                                        onChange={value => handelDataPicker(value)}
                                        inputClass={'textField__input !h-[49px]'}
                                        placeholder={"تاریخ تولد"}
                                        fromLabel={"تاریخ تولد"}
                                        toLabel={"تاریخ تولد"}
                                        local={'fa'}
                                        type='single'
                                        // withTime
                                        showWeekend
                                    />
                                    {
                                        errorField?.birth_date?.map((itemError) => (
                                            <div className={'text-red-500'} key={itemError}>{itemError}</div>
                                        ))
                                    }
                                </div>
                                <div className="col-span-6">
                                    <Input formik={formik} label={'دانشگاه تحصیل'} name={"college"}/>
                                </div>
                            </div>

                        </div>
                        {isLoadingCreateUser ? (
                            <div className={'mx-auto flex justify-center'}>
                                <ThreeDots
                                    height="80"
                                    width="80"
                                    radius="9"
                                    color="#4a6dff"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                />
                            </div>
                        ) : <button type={'submit'} disabled={!formik.isValid}
                                    className={'btn--primary mt-3 w-full rounded-xl disabled:bg-primary-400'}>ارسال
                        </button>
                        }


                    </div>

                </div>
            </form>

        </div>
    </>
}
