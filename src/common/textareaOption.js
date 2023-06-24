const TextareaOption = ({label, name, formik, type = 'text', className = ''}) => {

    return <>
        <div className={`form-control ${className} w-full`}>
            <label className={'block text-black font-bold'} htmlFor={name}>{label}</label>
            <textarea className={'textField__input w-full block'}
                      {...formik.getFieldProps(name)}
                      id={name}
                      name={name}
            />
        </div>
        {
            formik.errors[name] && formik.touched[name] && <div className={'text-red-500'}>{formik.errors[name]}</div>
        }
    </>
}
export default TextareaOption