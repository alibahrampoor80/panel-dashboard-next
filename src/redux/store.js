'use client'
import {createStore, applyMiddleware} from "redux";
import rootReducer from "@/redux/rootReducer";
import {createWrapper} from "next-redux-wrapper";
import thunkMiddleWare from "redux-thunk";

const bindMiddleWare = (middleware) => {
    if (process.env.NODE_ENV !== "production") {
        const {composeWithDevTools} = require("redux-devtools-extension")
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const initStore = () => {
    return createStore(rootReducer, bindMiddleWare([thunkMiddleWare]))
}

export const wrapper = createWrapper(initStore)