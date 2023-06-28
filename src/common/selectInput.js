const SelectInput = ({selectOption, name, formik}) => {

    return <>
        <div className={'form-control'}>
            <select
                {...formik.getFieldProps(name)} name={name}>
                {
                    selectOption.map(item => (
                        <option key={item.id} value={item.id}>{item.title}</option>
                    ))
                }
            </select>
            {
                formik.errors[name] && formik.touched[name] && <div className={'error'}>{formik.errors[name]}</div>
            }
        </div>
    </>
}
export default SelectInput