'use client'
import * as Yup from 'yup'
import {useFormik} from "formik";

const Login = () => {

    const initialValues = {
        fullname: '',
        password: ''
    }
    const onSubmit = (values) => {
        console.log(values)
    }
    const validationSchema = Yup.object({
        fullname: Yup.string().required('فیلد را تکمیل کنید').min(6, 'نام کاربری باید بیشتر از 6 کارکتر باشد'),
        password: Yup.string().required('رمز اجباری میباشد')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "کلمه ی عبور باید 8 کارکتر, یک حروف بزرگ, یک حروف کوچک, یک عدد و یک کاراکتر مورد خاص"
            ),
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true
    })

    return <>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                         alt="logo"/>
                    Flowbite
                </a>
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            ورود به حساب کاربری
                        </h1>

                        <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-2">
                            <div className="relative">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">نام
                                    کاربری</label>
                                <input
                                    {...formik.getFieldProps('fullname')}
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"

                                    type="text"
                                    name="fullname" autoComplete="off"/>
                                {formik.errors.fullname && formik.touched.fullname &&
                                    <div className={'text-red-500 mt-2  '}>{formik.errors.fullname}</div>}
                            </div>

                            <div className="relative">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">رمز</label>
                                <input
                                    {...formik.getFieldProps('passowrd')}
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    type="password"

                                    name="password" autoComplete="off"/>
                                {formik.errors.password && formik.touched.password &&
                                    <div className={'text-red-500 mt-2'}>{formik.errors.password}</div>}
                            </div>


                            <button type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">ورود
                            </button>


                        </form>

                    </div>
                </div>


            </div>
        </section>
    </>
}
export default Login