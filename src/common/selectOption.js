import Select from "react-tailwindcss-select";
import React from "react";


const SelectOption = ({onChange, options, value, placeholder, formik, name, isMultiple = false}) => {

    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : "";
    };
    const isMultipleVal = isMultiple ? true : false

    return <>
        <label htmlFor={name}>{placeholder}</label>
        <Select
            id={name}

            isMultiple={isMultipleVal}
            placeholder={placeholder}
            primaryColor={'indigo'}
            isSearchable={true}
            value={defaultValue(options, value)}
            onChange={value => {
                onChange(value)
            }} options={options}/>

        {formik.errors[name] && formik.touched[name] &&
            <div className={'text-red-500'}>{formik.errors[name]}</div>}
    </>
}
export default SelectOption