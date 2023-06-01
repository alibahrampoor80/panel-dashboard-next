'use client'
import {useFormik} from "formik";
import * as Yup from 'yup'
import Link from "next/link";
import http from "@/services/httpService";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import {
    Tabs, TabsHeader, TabsBody, Tab, TabPanel,
} from "@material-tailwind/react";
import RadioOption from "@/common/radioOption";
import Input from "@/common/Input";
import {useState} from "react";
import {UserIcon, UserCircleIcon, EyeIcon} from "@heroicons/react/20/solid";
import RadioInput from "@/common/radioOption";
import {FcManager} from "react-icons/fc";
import {IoIosWoman, IoIosMan} from "react-icons/io";

const Register = () => {

    const initialValues = {
        firstname: '',
        lastname: "",
        fullname: '',
        email: '',
        password: '',
        mobile: '',
        passwordConfirm: '',
        terms: false,
        gender: '',
        national_code: '',
        tel_number: ''

    }
    const onSubmit = async (values) => {
        console.log(values)
        // const data = await http.post('/users/create')
        // console.log(data)
    }

    const validationSchema = Yup.object({
        fullname: Yup.string().required('فیلد را تکمیل کنید')
            .min(6, 'نام کاربری باید بیشتر از 6 کارکتر باشد')
            .matches(/[abcdefghijklmnopqrstuvwxyz]+/, {message: 'لطفا نام کاربری را به درستی وارد کنید'}),
        // email: Yup.string().email('ایمیل را به درستی وارد کنید').required('فیلد ایمیل اجباری میباشد'),
        password: Yup.string().required('رمز اجباری میباشد')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, "کلمه ی عبور باید 8 کارکتر, یک حروف بزرگ, یک حروف کوچک, یک عدد"),
        mobile: Yup.string().required('شماره موبایل اجباری میباشد')
            .matches(/^[0-9]{11}$/, 'شماره مویایل اشتباه میباشد'),

        passwordConfirm: Yup.string().required('تکرار پسورد اجباری میباشد')
            .oneOf([Yup.ref('password'), null], 'تکرار کلمه ی عبور برابری ندارد!'),

        // terms: Yup.boolean().required('قوانین سایت را قبول کنید')
        //     .oneOf([true], 'تایید کردن قوانین سایت اجباری است'),

        firstname: Yup.string().required('فیلد نام اجباری میباشد').min(3, 'لطفا بیشتر از 3 کارکتر وارد کنید'),
        lastname: Yup.string().required('فیلد نام خانوادگی اجباری میباشد')
            .min(5, 'لطفا بیشتر از 5 کارکتر وارد کنید'),
        gender: Yup.string().required('انتخاب جنسیت مهم است'),
        national_code: Yup.string().required('کد ملی اجباری است')
            .matches(/^[0-9]{10}$/, {message: "کد ملی را به درستی وارد کنید"}),
        tel_number: Yup.string().required('شماره ثابت اجباری است').min(7,'باید بیشتر از 7 کارکتر باشد')
            .max(8,'یشتر از 8 کارکتر نمیتواد باشد')

    })
    const formik = useFormik({
        initialValues, onSubmit,
        validationSchema,
        validateOnMount: true
    })

    const radioOption = [
        {label: "زن", value: "1",},
        {label: "مرد", value: "0",}
    ]
    const [activeTab, setActiveTab] = useState("حساب کاربری");


    return <>

        <div
            className="p-4 w-full block">

            <form onSubmit={formik.handleSubmit} className="form w-100 space-y-7 " noValidate="novalidate"
                  id="kt_sign_up_form">
                <div className="flex flex-wrap w-full">

                    <Tabs id={'tabs'} children={''} value={activeTab} className={'w-full'}>
                        <TabsHeader>

                            <Tab onClick={() => setActiveTab('حساب کاربری')} key={'account'} value={'حساب کاربری'}>
                                <button className={`flex mx-auto ${activeTab === 'حساب کاربری' ? "text-red-500" : ""}`}
                                        type={'button'}>
                                    <UserIcon className={'w-6 h-6'}/> حساب کاربری
                                </button>
                            </Tab>
                            <Tab onClick={() => setActiveTab('پروفایل')} key={'profile'} value={'پروفایل'}>
                                <button className={`flex mx-auto ${activeTab === 'پروفایل' ? "text-red-500" : ""}`}
                                        type={'button'}>
                                    <UserCircleIcon className={'w-6 h-6'}/>
                                    پروفایل

                                </button>
                            </Tab>
                            <Tab onClick={() => setActiveTab('نقش')} key={'role'} value={'نقش'}>
                                <button type={'button'}
                                        className={`flex mx-auto ${activeTab === 'نقش' ? "text-red-500" : ""}`}>
                                    <EyeIcon className={'w-6 h-6'}/>
                                    نقش
                                </button>
                            </Tab>
                        </TabsHeader>
                        <TabsBody
                            animate={{
                                initial: {y: 250},
                                mount: {y: 0},
                                unmount: {y: 250},
                            }}>

                            <TabPanel key={'account'} value={'حساب کاربری'}>
                                <div className="grid grid-cols-2 row-span-6 space-y-5">
                                    <div className="col-span-12 flex  max-sm:flex-wrap">
                                        <Input formik={formik} name={'firstname'} label={'نام'}
                                               className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>
                                        <Input formik={formik} name={'lastname'} label={'نام خانوادگی'}
                                               className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>
                                    </div>
                                    <div className="grid grid-cols-1 row-span-12 col-span-12 flex">
                                        <Input formik={formik} name={'fullname'} label={'نام کاربری'} type={'text'}
                                               className={'mx-2'}/>
                                    </div>
                                    <div className="col-span-12 flex  max-sm:flex-wrap">

                                        <Input formik={formik} name={'password'} label={'کلمه ی عبور'}
                                               type={'password'} className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>
                                        <Input formik={formik} name={'passwordConfirm'} label={'تکرار کلمه ی عبور'}
                                               type={'password'} className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>

                                    </div>

                                    <div className="">
                                        <p className={'font-bold'}>جنسیت:</p>
                                        <ul className="grid w-full gap-6 md:grid-cols-2">
                                            <RadioInput name={'gender'} formik={formik} radioOption={radioOption}/>
                                        </ul>
                                    </div>


                                </div>

                            </TabPanel>
                            <TabPanel key={'profile'} value={'پروفایل'}>
                                <div className="grid grid-cols-2 row-span-6 space-y-5">
                                    <div className="col-span-12 flex  max-sm:flex-wrap">
                                        <Input formik={formik} name={'mobile'} label={'موبایل'}
                                               className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>
                                        <Input formik={formik} name={'tel_number'} label={'شماره ثابت'}
                                               className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>
                                    </div>

                                    <div className="grid grid-cols-1 row-span-12 col-span-12 ">
                                        <Input formik={formik} name={'national_code'} type={'text'} className={'mx-2'}
                                               label={'کد ملی'}/>
                                    </div>

                                    <div className="col-span-12 flex  max-sm:flex-wrap">
                                        {/*<Input formik={formik} name={'mobile'} label={'موبایل'}*/}
                                        {/*       className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>*/}
                                        {/*<Input formik={formik} name={'tel_number'} label={'شماره ثابت'}*/}
                                        {/*       className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>*/}
                                    </div>

                                </div>

                            </TabPanel>
                            <TabPanel key={'role'} value={'نقش'}>
                                {'نقش'}
                            </TabPanel>

                        </TabsBody>
                    </Tabs>


                    {/*<div className="terms">*/}
                    {/*    <label htmlFor={'terms'}>*/}
                    {/*        <input className="w-6 h-6 text-primary-900 border-1 rounded-md focus:ring-0"*/}
                    {/*               type="checkbox" value={true} name="terms"*/}
                    {/*               onChange={formik.handleChange}*/}
                    {/*               checked={formik.values.terms}*/}
                    {/*               id={'terms'}*/}
                    {/*        />*/}
                    {/*        <span className="form-check-label fw-bold text-gray-700 fs-6">*/}
                    {/*				<Link href="#"*/}
                    {/*                      className="ms-1 text-red-500"> قوانین </Link>سایت را تایید میکنم</span>*/}
                    {/*    </label>*/}
                    {/*    {formik.errors.terms && formik.touched.terms &&*/}
                    {/*        <div className={'text-red-500'}>{formik.errors.terms}</div>}*/}
                    {/*</div>*/}


                </div>
                <button type={'submit'} disabled={!formik.isValid} className={'btn--primary'}>submit</button>
            </form>

        </div>

    </>
}
export default Register