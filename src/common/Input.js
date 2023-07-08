const Input = ({label, name, formik, type = 'text', className = '', errorServer}) => {

    return <>
        <div className={`form-control ${className}`}>
            <label className={'block text-black font-bold dark:text-white'} htmlFor={name}>{label}:</label>
            <input type={type}
                   className={'textField__input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
                   id={name}
                   name={name}
                   {...formik.getFieldProps(name)}
            />

            {
                formik.errors[name] && formik.touched[name] &&
                <div className={'text-red-500'}>{formik.errors[name]}</div>
            }

            {
                errorServer?.[name]?.map((itemError) => (
                    <div className={'text-red-500'} key={itemError}>{itemError}</div>
                ))
            }
        </div>

    </>
}
export default Input