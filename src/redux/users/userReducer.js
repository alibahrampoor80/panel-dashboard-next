import {CREATE_USER_FAILURE, CREATE_USER_REQUEST, CREATE_USER_SUCCESS} from "@/redux/userTypes";


export const createUserReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_USER_REQUEST:
            return {loading: true}
        case CREATE_USER_SUCCESS:
            return {loading: false, user: action.payload}
        case CREATE_USER_FAILURE:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}