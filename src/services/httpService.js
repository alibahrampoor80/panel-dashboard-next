'use client'
import axios from "axios";

const app = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // withCredentials: true
})

// const token = localStorage.getItem('token')|| ""
// if (token) {
//     app.defaults.headers.common['authorization'] = 'Bearer ' + token
// }

const http = {
    get: app.get,
    post: app.post,
    patch: app.patch,
    put: app.put,
    delete: app.delete,
}
export default http