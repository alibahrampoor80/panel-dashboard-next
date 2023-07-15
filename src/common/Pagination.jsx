import {Pagination} from "@mui/material";

const PaginationComponents = ({handelPaginationUsers, totalPages, page}) => {


    return <>
        <div className=" mx-auto flex justify-center">
            <Pagination dir={'ltr'}
                        size={'medium'}
                // className={'dark:!text-white mx-auto flex justify-center'}

                        variant="text"
                        color="secondary"
                        count={totalPages}
                        page={parseInt(page)}
                        onChange={handelPaginationUsers}
            />
        </div>
    </>

}

export default PaginationComponents