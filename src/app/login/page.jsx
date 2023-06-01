'use client'
import * as Yup from 'yup'
import {useFormik} from "formik";
import Link from "next/link";

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
        validateOnMount:true
    })

    return <>
        <div id="kt_body" className="bg-body">
            <div className="d-flex flex-column flex-root">

                <div
                    className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
                    style={{backgroundImage: 'url(assets/media/illustrations/sketchy-1/14.png'}}>

                    <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">

                        <a href="../../demo1/dist/index.html" className="mb-12">
                            <img alt="Logo" src="/media/logos/logo-1.svg" className="h-40px"/>
                        </a>

                        <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">

                            <form onSubmit={formik.handleSubmit} className="form w-100" noValidate="novalidate"
                                  id="kt_sign_in_form">

                                <div className="text-center mb-10">

                                    <h1 className="text-dark mb-3">ورود به پنل</h1>

                                    <div className="text-gray-400 fw-bold fs-4">حساب ندارید؟
                                        <Link href="/register"
                                           className="link-primary fw-bolder">حساب جدید بسازید</Link></div>

                                </div>


                                <div className="fv-row mb-10">

                                    <label className="form-label fs-6 fw-bolder text-dark">نام کاربری</label>

                                    <input
                                        {...formik.getFieldProps('fullname')}
                                        className="form-control form-control-lg form-control-solid" type="text"
                                        name="fullname" autoComplete="off"/>
                                    {formik.errors.fullname && formik.touched.fullname &&
                                        <div className={'text-red-500'}>{formik.errors.fullname}</div>}
                                </div>

                                <div className="fv-row mb-10">

                                    <div className="d-flex flex-stack mb-2">

                                        <label className="form-label fw-bolder text-dark fs-6 mb-0">رمز</label>


                                    </div>

                                    <input
                                        {...formik.getFieldProps('passowrd')}
                                        className="form-control form-control-lg form-control-solid" type="password"
                                        name="password" autoComplete="off"/>
                                    {formik.errors.password && formik.touched.password &&
                                        <div className={'text-red-500'}>{formik.errors.password}</div>}
                                </div>

                                <div className="text-center">

                                    <button type={"submit"} id="kt_sign_in_submit"
                                            className="btn btn-lg btn-primary w-100 mb-5" disabled={!formik.isValid}>
                                        <span className="indicator-label">ورود</span>

                                    </button>

                                </div>

                            </form>

                        </div>
                    </div>


                    <div className="d-flex flex-center flex-column-auto p-10">

                        <div className="d-flex align-items-center fw-bold fs-6">
                            <a href="https://keenthemes.com" className="text-muted text-hover-primary px-2">About</a>
                            <a href="mailto:support@keenthemes.com"
                               className="text-muted text-hover-primary px-2">Contact</a>
                            <a href="https://1.envato.market/EA4JP" className="text-muted text-hover-primary px-2">Contact
                                Us</a>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </>
}
export default Login