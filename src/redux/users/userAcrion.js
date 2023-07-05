import {CREATE_USER_FAILURE, CREATE_USER_REQUEST, CREATE_USER_SUCCESS} from "@/redux/userTypes";

export const createUserRequest = () => {
    return {
        type: CREATE_USER_REQUEST
    }
}
export const createUserSuccess = (users) => {
    return {
        type: CREATE_USER_SUCCESS,
        payload: users
    }
}
export const createUserFailure = (error) => {
    return {
        type: CREATE_USER_FAILURE,
        payload: error
    }
}