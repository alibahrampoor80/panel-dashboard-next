const Input = ({label, name, formik, type = 'text', className = ''}) => {

    return <>
        <div className={`form-control ${className}`}>
            <label className={'block text-black font-bold'} htmlFor={name}>{label}:</label>
            <input type={type}
                   className={'textField__input'}
                   id={name}
                   name={name}
                   {...formik.getFieldProps(name)}
            />

            {
                formik.errors[name] && formik.touched[name] && <div className={'text-red-500'}>{formik.errors[name]}</div>
            }

        </div>

    </>
}
export default Input