import http from "@/services/httpService";

export function getRoles() {
    return http.get('/settings/groups/').then(({data}) => data)
}