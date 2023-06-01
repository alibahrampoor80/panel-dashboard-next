import React from "react";
import {IoIosMan, IoIosWoman} from "react-icons/io";


const RadioInput = ({label, name, formik, radioOption}) => {

    return <>
        {
            radioOption.map((item) => (
                <React.Fragment key={item.value}>
                    <li>
                        <input {...formik.getFieldProps('gender')} type="radio"
                               id={item.value}
                               value={item.value}
                               onChange={formik.handleChange}
                               checked={formik.values.gender == item.value}
                               name={name}
                               className="hidden peer"/>
                        <label htmlFor={item.value}
                               className="inline-flex items-center font-bold justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="block">
                                <div className="w-full text-lg font-semibold">{item.label}</div>

                            </div>
                            {
                                item.label === 'زن' ? <IoIosWoman className={'w-8 h-8'}/> :
                                    <IoIosMan className={'w-8 h-8'}/>
                            }
                        </label>

                    </li>
                </React.Fragment>
            ))
        }
        {formik.errors[name] && formik.touched[name] &&
            <div className={'text-red-500'}>{formik.errors[name]}</div>}
    </>
}
export default RadioInput