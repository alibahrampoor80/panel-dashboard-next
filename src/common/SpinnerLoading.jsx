'use client'
import {ThreeDots} from "react-loader-spinner";

export default function SpinnerLoading() {

    return <>

            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#4a6dff"
                ariaLabel="three-dots-loading"
                visible={true}
                wrapperClass={'flex justify-center'}
            />

    </>
}