import Select from "react-tailwindcss-select";
import React from "react";


const SelectOption = ({onChange, options, value, placeholder, formik, name, isMultiple = false}) => {

    const defaultValue = (options, value) => {
        return options ? options.find(option => option.title === value) : "";
    };
    const isMultipleVal = isMultiple ? true : false

    return <>
        <label htmlFor={name} className={'block text-black font-bold dark:text-white'}>{placeholder}</label>
        <Select
            id={name}
            isMultiple={isMultipleVal}
            classNames={{
                menuButton: ({isDisabled}) => (
                    `flex text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                        isDisabled
                            ? "bg-gray-200"
                            : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }`
                ),
                menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                listItem: ({isSelected}) => (
                    `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                        isSelected
                            ? `text-white bg-blue-500`
                            : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                    }`
                )
            }}
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