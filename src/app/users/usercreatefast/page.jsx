'use client'

import {useFormik} from "formik";
import * as Yup from "yup";
import Input from "@/common/Input";
import {ChevronLeftIcon, HomeIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import DropdownList from "react-widgets/DropdownList";


import {useRoles} from "@/hooks/useRols";
import {useMutation} from "react-query";
import {createFastUser} from "@/services/createUsers";
import {useState} from "react";
import {ThreeDots} from "react-loader-spinner";
import toast from "react-hot-toast";
import Head from "next/head";




export default function Page() {
    const [errorField, setErrorField] = useState({})
    const {data: dataRoles, isLoading: isLoadingRoles} = useRoles()

    const {data, isLoading, error, mutateAsync} = useMutation({mutationFn: createFastUser})

    // console.log(data, isLoading, error)

    // const selector = useSelector()
    // const dispatch = useDispatch()

    const initialValues = {
        first_name: '',
        last_name: "",
        username: '',
        national_code: '',
        password: '',
        confirm_password: '',
        role: [],
        mobile_number: '',
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('فیلد را تکمیل کنید')
            .min(6, 'نام کاربری باید بیشتر از 6 کارکتر باشد')
            .matches(/[abcdefghijklmnopqrstuvwxyz]+/, {message: 'لطفا نام کاربری را به درستی وارد کنید'}),
        first_name: Yup.string().required('فیلد نام اجباری میباشد')
            .min(3, 'لطفا بیشتر از 3 کارکتر وارد کنید'),
        last_name: Yup.string().required('فیلد نام خانوادگی اجباری میباشد')
            .min(5, 'لطفا بیشتر از 5 کارکتر وارد کنید'),
        national_code: Yup.string().required('کد ملی اجباری است')
            .matches(/^[0-9]{10}$/, {message: "کد ملی را به درستی وارد کنید"}),
        mobile_number: Yup.string().required('شماره موبایل اجباری میباشد')
            .matches(/^[0-9]{11}$/, 'شماره مویایل اشتباه میباشد'),

        confirm_password: Yup.string().required('تکرار پسورد اجباری میباشد')
            .oneOf([Yup.ref('password'), null], 'تکرار کلمه ی عبور برابری ندارد!'),
        password: Yup.string().required('رمز اجباری میباشد')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, "کلمه ی عبور باید 8 کارکتر, یک حروف بزرگ, یک حروف کوچک, یک عدد"),
        role: Yup.array().required('وارد کردن نقش کاربر اجباری است.')
    })

    const onSubmit = async (values) => {
        // /users/createQuickly/
        try {
            const data = await mutateAsync(values)
            console.log(data)
            toast.success('ثبت کاربر با موفقیت انجام شد!')
        } catch (err) {
            const {response} = err
            const {data} = response

            setErrorField({
                ...errorField,
                username: data?.username,
                mobile_number: data?.mobile_number,
                national_code: data?.national_code,
                role: data?.role
            })
            toast.error('ارسال داده ها با خطا مواجه شد!')
        }

    }

    // console.log(errorField)
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    })

    const handelGetValueRoles = (value) => {
        formik.setFieldValue('role', [value.id])
    }


    return <>


        <div className=" rounded-tr-3xl p-4 md:p-6 lg:p-10 overflow-y-auto mt-10 h-screen">
            <Head>
                <title>sdsdfldsf</title>
            </Head>
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
                            ایجاد کاربر سریع
                        </Link>
                    </li>
                </ul>
            </div>


            <h1 className={'text-3xl'}>افزودن سریع کاربر</h1>
            <form onSubmit={formik.handleSubmit} encType={'enctype="multipart/form-data"'}
                  className="form w-100 space-y-7 h-auto" noValidate="novalidate" id="kt_sign_up_form">
                <div className="flex flex-wrap w-full h-full">
                    <div className="w-[700px] mx-auto">

                        <div className="w-full mx-auto md:grid md:grid-cols-4 md:space-y-3">
                            <div className="md:col-span-4 md:flex md:gap-x-6 ">
                                <div className="md:w-full md:flex md:flex-col">
                                    <Input formik={formik} name={'username'} label={'نام کاربری'} className={'w-full'}
                                           errorServer={errorField}/>

                                </div>
                                <div className="md:w-full md:flex md:flex-col">
                                    <Input formik={formik} name={'national_code'}
                                           label={'کد ملی'}
                                           className={'w-full'}
                                           type={'text'} errorField={errorField}/>

                                </div>
                            </div>

                            <div className="md:col-span-4 md:flex md:gap-x-6 ">
                                <Input formik={formik}
                                       name={'first_name'} label={'نام'}
                                       className={'w-full'}/>

                                <Input formik={formik} name={'last_name'}
                                       label={'نام خانوادگی'}
                                       className={'w-full'}
                                       type={'text'}/>
                            </div>
                            <div className="md:col-span-4 md:flex md:gap-x-6 ">

                                <Input formik={formik}
                                       name={'password'}
                                       label={'کلمه ی عبور'}
                                       className={'w-full'}
                                       type={'password'} errorServer={errorField}/>

                                <Input formik={formik}
                                       name={'confirm_password'}
                                       label={'تکرار کلمه ی عبور'}
                                       className={'w-full'}
                                       type={'password'} errorServer={errorField}/>

                            </div>
                            <div className="md:col-span-4 md:grid md:grid-cols-4 md:gap-x-6 ">
                                <div className="col-span-2">
                                    <Input formik={formik} name={'mobile_number'}
                                           label={'تلفن همراه'}
                                           className={'w-full'}
                                           type={'text'} errorServer={errorField}/>

                                </div>
                                <div className="col-span-2">
                                    <label htmlFor=""
                                           className={'block text-black font-bold dark:text-white'}>نقش کاربر</label>
                                    <DropdownList busy busySpinner={
                                        <span className="fas fa-sync fa-spin"/>
                                    }
                                                  containerClassName={'inline-flex items-center font-bold justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 !rounded-xl hover:text-gray-600 hover:bg-gray-100  dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white '}
                                                  dataKey="id"
                                                  textField="name"
                                                  defaultValue={'انتخاب کنید'}
                                                  onChange={handelGetValueRoles}

                                                  data={dataRoles?.results}
                                    />
                                    {
                                        errorField?.role?.map((itemError) => (
                                            <div className={'text-red-500'} key={itemError}>{itemError}</div>
                                        ))
                                    }


                                </div>
                            </div>
                            <div className="md:col-span-4 mx-auto   ">
                                {isLoading ? (
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

                                    ) :
                                    <button className={'btn btn--primary  rounded-xl disabled:bg-primary-400'}
                                            type={'submit'}
                                            disabled={!formik.isValid}>

                                        ارسال اطلاعات
                                    </button>}

                            </div>
                        </div>


                    </div>


                </div>
            </form>
        </div>

    </>
}
