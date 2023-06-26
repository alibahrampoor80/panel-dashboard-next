'use client'
import {useFormik} from "formik";
import * as Yup from 'yup'

import {
    Tabs, TabsHeader, TabsBody, Tab, TabPanel,
} from "@material-tailwind/react";

import Input from "@/common/Input";
import {useState} from "react";
import {UserIcon, UserCircleIcon, EyeIcon} from "@heroicons/react/20/solid";
import RadioInput from "@/common/radioOption";

import SelectOption from "@/common/selectOption";
import TextareaOption from "@/common/textareaOption";

import DtPicker, {convertToFa} from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'

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
        tel_number: '',
        province: "",
        city: "",
        address: "",
        level_educational: "",
        Field_of_Study: "",
        date_brith_day: "",
        university: "",
        expertise: ""
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
        tel_number: Yup.string().required('شماره ثابت اجباری است').min(7, 'باید بیشتر از 7 کارکتر باشد')
            .max(8, 'یشتر از 8 کارکتر نمیتواد باشد5'),
        province: Yup.string().required('انتخاب استان اجباری میباشد'),
        city: Yup.string().required('انتخاب شهر اجباری میباشد'),
        address: Yup.string().required('لطفا یک آدرس وارد کنید'),
        level_educational: Yup.string().required('انتخاب مقطع تحصیلی اجباری میباشد'),
        university: Yup.string().required('انتخاب دانشگاه اجباری میباشد'),
        expertise: Yup.string().required('انتخاب تخصص اجباری میباشد')
    })

    const formik = useFormik({
        initialValues, onSubmit,
        validationSchema,
        validateOnMount: true,

    })

    const radioOption = [
        {label: "زن", value: "1",},
        {label: "مرد", value: "0",}
    ]

    const optionsSelect = [
        {value: 'tehran', label: 'تهران'},
        {value: 'kashan', label: 'کاشان'},
        {value: 'isfahan', label: 'اصفهان'}
    ]

    const [activeTab, setActiveTab] = useState("حساب کاربری");

    const [date, setDate] = useState(null)


    return <>

        <div className="bg-gray-100/60 rounded-tr-3xl p-4 md:p-6 lg:p-10 overflow-y-auto mt-10 h-screen">

            <form onSubmit={formik.handleSubmit} className="form w-100 space-y-7 h-auto" noValidate="novalidate"
                  id="kt_sign_up_form">
                <div className="flex flex-wrap w-full h-full">

                    <Tabs id={'tabs'} value={activeTab} className={'w-full h-full'}>
                        <TabsHeader>

                            <Tab onClick={() => setActiveTab('حساب کاربری')} key={'account'} value={'حساب کاربری'}>
                                <button
                                    className={`flex mx-auto relative z-20 ${activeTab === 'حساب کاربری' ? "text-red-500" : ""}`}
                                    type={'button'}>
                                    <UserIcon className={'w-6 h-6'}/> حساب کاربری
                                </button>
                            </Tab>
                            <Tab onClick={() => setActiveTab('پروفایل')} key={'profile'} value={'پروفایل'}>
                                <button
                                    className={`flex mx-auto relative z-20 ${activeTab === 'پروفایل' ? "text-red-500" : ""}`}
                                    type={'button'}>
                                    <UserCircleIcon className={'w-6 h-6'}/>
                                    پروفایل

                                </button>
                            </Tab>
                            <Tab onClick={() => setActiveTab('نقش')} key={'role'} value={'نقش'}>
                                <button type={'button'}
                                        className={`flex mx-auto relative z-20 ${activeTab === 'نقش' ? "text-red-500" : ""}`}>
                                    <EyeIcon className={'w-6 h-6'}/>
                                    نقش
                                </button>
                            </Tab>
                        </TabsHeader>
                        <div className="w-[700px] mx-auto">
                            <TabsBody animate={{
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
                                    <div className="grid grid-cols-2 row-span-6 space-y-5 ">
                                        <div className="col-span-12 flex  max-sm:flex-wrap">
                                            <Input formik={formik} name={'mobile'} label={'موبایل'}
                                                   className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>
                                            <Input formik={formik} name={'tel_number'} label={'شماره ثابت'}
                                                   className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>
                                        </div>

                                        <div className="grid grid-cols-1 row-span-12 col-span-12 ">
                                            <Input formik={formik} name={'national_code'} type={'text'}
                                                   className={'mx-2'}
                                                   label={'کد ملی'}/>
                                        </div>

                                        <div className="grid grid-cols-12 row-span-12 col-span-12 gap-4">
                                            <div className="col-span-6">
                                                <SelectOption formik={formik}
                                                              placeholder={'استان'}
                                                              onChange={value => formik.setFieldValue('province', value.value)}
                                                              value={formik.values.province}
                                                              options={optionsSelect}
                                                              name={'province'}
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <SelectOption formik={formik}
                                                              placeholder={'شهر'}
                                                              onChange={value => formik.setFieldValue('city', value.value)}
                                                              value={formik.values.city}
                                                              options={optionsSelect}
                                                              name={'city'}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 row-span-12 col-span-12 ">
                                            <TextareaOption formik={formik} name={'address'} label={'آدرس'}/>
                                        </div>

                                        <div className="grid grid-cols-12 row-span-12 col-span-12 gap-4">
                                            <div className="col-span-6">
                                                <SelectOption formik={formik}
                                                              placeholder={'درجه تحصیلی'}
                                                              onChange={value => formik.setFieldValue('level_educational', value.value)}

                                                              value={formik.values.level_educational}
                                                              options={optionsSelect}
                                                              name={'level_educational'}
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <SelectOption formik={formik}
                                                              placeholder={'رشته ی تحصیلی '}
                                                              onChange={value => formik.setFieldValue('Field_of_Study', value.value)}
                                                              value={formik.values.Field_of_Study}
                                                              options={optionsSelect}
                                                              name={'Field_of_Study'}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-12 row-span-12 col-span-12 gap-4">
                                            <div className="col-span-6">
                                                <label htmlFor="brithDay">تاریخ تولد</label>
                                                <DtPicker
                                                    id={'brithDay'}
                                                    onChange={value => formik.setFieldValue('date_brith_day', convertToFa(value))}
                                                    inputClass={'textField__input !h-[49px]'}
                                                    placeholder={"تاریخ تولد"}
                                                    fromLabel={"تاریخ تولد"}
                                                    toLabel={"تاریخ تولد"}
                                                    local={'fa'}
                                                    type='single'
                                                    // withTime
                                                    showWeekend
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <Input formik={formik} label={'دانشگاه تحصیل'} name={"university"}/>

                                            </div>
                                        </div>

                                        <div className="grid grid-cols-12 row-span-12 col-span-12 gap-4">
                                            <div className="col-span-12">
                                                {/*<SelectOption formik={formik} name={'expertise'}*/}
                                                {/*              options={optionsSelect}*/}
                                                {/*              onChange={value => formik.setFieldValue('expertise', value.value)}*/}
                                                {/*              placeholder={'تخصص'}*/}
                                                {/*              value={formik.values.expertise}*/}
                                                {/*              isMultiple={true}*/}
                                                {/*/>*/}


                                            </div>

                                        </div>

                                        <div className="col-span-12 flex max-sm:flex-wrap">
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
                        </div>
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


                <button type={'submit'} disabled={!formik.isValid} className={'btn--primary'}>submit</button>
                </div>
            </form>

        </div>

    </>
}
export default Register