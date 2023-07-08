import {combineReducers} from "redux";
import {createUserFastReducer, createUserReducer} from "@/redux/users/userReducer";


const rootReducer = combineReducers({
    createUsers: createUserReducer,
    createFastUsers: createUserFastReducer
})
export default rootReducer