import http from "@/services/httpService";

// http://172.16.0.221/users/list/?page=2
export function getAlUsers(page = 1) {
    return http.get(`/users/list/?page=${page}`).then(({data}) => data)
}
