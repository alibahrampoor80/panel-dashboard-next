'use client'
import {useFormik} from "formik";
import * as Yup from 'yup'

import Input from "@/common/Input";


import RadioInput from "@/common/radioOption";

import TextareaOption from "@/common/textareaOption";

import DtPicker from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'
import http from "@/services/httpService";
import toast from "react-hot-toast";


import {useSkills} from "@/hooks/useSkills";
import {Button} from "@mui/material";
import {useState} from "react";

import Avatar from "@mui/material/Avatar";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {useStates} from "@/hooks/useStateCity";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList";

const Register = () => {

    const {data: skillsData, error, isLoading: isLoadingSkills} = useSkills()
    const {data: statesData, isLoading: isLoadingStates} = useStates()

    const initialValues = {
        firstname: '',
        lastname: "",
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
        image: "",
        skill: ""
    }

    const onSubmit = async (...values) => {

        const myData = new FormData()
        myData.append('firstname', values.firstname)
        myData.append('lastname', values.lastname)
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

        // console.log(myData)
        // console.log(values)
        try {
            const data = await http.post('/users/create/', myData, {
                headers: {
                    // "Authorization": "YOUR_API_AUTHORIZATION_KEY_SHOULD_GOES_HERE_IF_HAVE",
                    "Content-type": "multipart/form-data",
                },
            })
            const {data: error} = data
            console.log(data)
        } catch (err) {
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

        firstname: Yup.string().required('فیلد نام اجباری میباشد').min(3, 'لطفا بیشتر از 3 کارکتر وارد کنید'),
        lastname: Yup.string().required('فیلد نام خانوادگی اجباری میباشد')
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

        image: Yup.mixed().required('ارسال عکس اجباری میباشد')
            .test(
                "fileSize",
                "File too large",
                value => value && value.size <= FILE_SIZE
            )
            .test(
                "fileFormat",
                "Unsupported Format",
                value => value && SUPPORTED_FORMATS.includes(value.type)
            )
    })

    const formik = useFormik({
        initialValues, onSubmit,
        validationSchema,
        validateOnMount: true,

    })
    console.log(formik.values)
    // console.log(formik.errors)


    const radioOption = [
        {label: "خانم", value: "female",},
        {label: "آقا", value: "male",}
    ]

    const optionsSelect = [
        {value: 'tehran', label: 'تهران'},
        {value: 'kashan', label: 'کاشان'},
        {value: 'isfahan', label: 'اصفهان'}
    ]

    const [image, setImage] = useState();


    const handelDataPicker = (e) => {
        formik.setFieldValue('birth_date', e)
    }
    const handelImageUpload = (e) => {
        formik.setFieldValue("image", e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]));
    }
    const handelGetValueStates = (value) => {

        formik.setFieldValue("states", value)
    }

    const [skills, setSkills] = useState([]);

    const handleChangeSelectBox = (event) => {
        const {
            target: {value},
        } = event;
        setSkills(
            typeof value === 'string' ? value.split(',') : value,
        );
        formik.setFieldValue("skills", skills)
    };


    return <>

        <div className=" rounded-tr-3xl p-4 md:p-6 lg:p-10 overflow-y-auto mt-10 h-screen">

            <form onSubmit={formik.handleSubmit} encType={'enctype="multipart/form-data"'}
                  className="form w-100 space-y-7 h-auto" noValidate="novalidate" id="kt_sign_up_form">
                <div className="flex flex-wrap w-full h-full">


                    <div className="w-[700px] mx-auto">

                        <div className="flex justify-center mb-5">
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
                                formik.errors.image && formik.touched.image &&
                                <div className={'text-red-500'}>{formik.errors.image}</div>
                            }
                        </div>

                        <div className="grid grid-cols-2 row-span-6 space-y-5">
                            <div className="col-span-12 flex  max-sm:flex-wrap">
                                <Input formik={formik} name={'firstname'} label={'نام'}
                                       className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>
                                <Input formik={formik} name={'lastname'} label={'نام خانوادگی'}
                                       className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>
                            </div>
                            <div className="grid grid-cols-1 row-span-12 col-span-12 flex">
                                <Input formik={formik} name={'username'} label={'نام کاربری'} type={'text'}
                                       className={'mx-2'}/>
                            </div>
                            <div className="col-span-12 flex  max-sm:flex-wrap">

                                <Input formik={formik} name={'password'} label={'کلمه ی عبور'}
                                       type={'password'} className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>
                                <Input formik={formik} name={'confirm_password'} label={'تکرار کلمه ی عبور'}
                                       type={'password'} className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>

                            </div>

                            <div className="">
                                <p className={'font-bold dark:text-white'}>جنسیت:</p>
                                <ul className="grid w-full gap-6 md:grid-cols-2">
                                    <RadioInput name={'gender'} formik={formik} radioOption={radioOption}/>
                                </ul>
                            </div>

                        </div>

                        <div className="grid grid-cols-2 row-span-6 space-y-5 ">
                            <div className="col-span-12 flex  max-sm:flex-wrap">
                                <Input formik={formik} name={'mobile_number'} label={'موبایل'}
                                       className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>
                                <Input formik={formik} name={'tel_number'} label={'شماره ثابت'}
                                       className={'w-1/2 mx-2 md:w-full max-sm:w-full'}/>
                            </div>

                            <div className="grid grid-cols-1 row-span-12 col-span-12 ">
                                <Input formik={formik} name={'national_code'} type={'text'}
                                       className={'mx-2'}
                                       label={'کد ملی'}/>
                            </div>
                            <div className="grid grid-cols-1 row-span-12 col-span-12 ">
                                <Input formik={formik} name={'email'} type={'email'}
                                       className={'mx-2'}
                                       label={'ایمیل'}/>
                            </div>

                            <div className="grid grid-cols-12 row-span-12 col-span-12 gap-4">
                                <div className="col-span-6">
                                    {/*<Autocomplete*/}
                                    {/*    value={formik.values.states}*/}
                                    {/*    disablePortal*/}
                                    {/*    id="combo-box-demo"*/}
                                    {/*    options={statesData || []}*/}
                                    {/*    sx={{width: 300}}*/}

                                    {/*    renderInput={(params) =>*/}
                                    {/*        <TextField {...params} label="Movie"/>}*/}
                                    {/*/>*/}
                                </div>
                                <div className="col-span-6">
                                    <label htmlFor="" className={'block text-black font-bold dark:text-white'}>استان</label>
                                    <DropdownList
                                        containerClassName={'inline-flex items-center font-bold justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100  dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'}
                                        defaultValue=""
                                        onChange={handelGetValueStates}
                                        data={statesData?.results?.map(item => item.label)}
                                        key={statesData?.results?.map(item => item.id)}
                                        className={''}
                                    />
                                    {/*{console.log(statesData?.results?.map(item => item))}*/}
                                </div>
                            </div>

                            <div className="grid grid-cols-12 row-span-12 col-span-12 gap-4">
                                <div className="col-span-12">


                                    <FormControl dir={'rtl'}
                                                 className={'w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg'}>
                                        <InputLabel id="demo-multiple-checkbox-label">تخصص</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={skills}
                                            onChange={handleChangeSelectBox}
                                            input={<OutlinedInput label="Tag"/>}
                                            renderValue={(selected) => selected.join(', ')}
                                            // MenuProps={MenuProps}
                                        >
                                            {/*{console.log(statesData)}*/}
                                            {
                                                !isLoadingSkills && skillsData?.results.map((name) => (
                                                    <MenuItem key={name.id} value={name.id}>
                                                        <Checkbox
                                                            checked={skills.indexOf(name.id) > -1}/>
                                                        <ListItemText primary={name.title}/>
                                                    </MenuItem>
                                                ))
                                            }

                                        </Select>
                                    </FormControl>

                                </div>
                            </div>


                            <div className="grid grid-cols-1 row-span-12 col-span-12 ">
                                <TextareaOption formik={formik} name={'address'} label={'آدرس'}/>
                            </div>

                            <div className="grid grid-cols-12 row-span-12 col-span-12 gap-4">
                                {/*<div className="col-span-6">*/}
                                {/*    <SelectOption formik={formik}*/}
                                {/*                  placeholder={'درجه تحصیلی'}*/}
                                {/*                  onChange={value => formik.setFieldValue('level_educational', value.value)}*/}

                                {/*                  value={formik.values.level_educational}*/}
                                {/*                  options={optionsSelect}*/}
                                {/*                  name={'level_educational'}*/}
                                {/*    />*/}
                                {/*</div>*/}
                                {/*<div className="col-span-6">*/}
                                {/*    <SelectOption formik={formik}*/}
                                {/*                  placeholder={'رشته ی تحصیلی '}*/}
                                {/*                  onChange={value => formik.setFieldValue('Field_of_Study', value.value)}*/}
                                {/*                  value={formik.values.Field_of_Study}*/}
                                {/*                  options={optionsSelect}*/}
                                {/*                  name={'Field_of_Study'}*/}
                                {/*    />*/}
                                {/*</div>*/}
                            </div>

                            <div className="grid grid-cols-12 row-span-12 col-span-12 gap-4">
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
                                </div>
                                <div className="col-span-6">
                                    <Input formik={formik} label={'دانشگاه تحصیل'} name={"college"}/>
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

                        </div>

                        <button type={'submit'} disabled={!formik.isValid} className={'btn--primary'}>ارسال</button>
                    </div>


                </div>
            </form>

        </div>

    </>
}
export default Register