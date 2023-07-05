import http from "@/services/httpService";


export function getReshte() {
    return http.get('/settings/Reshteh/').then(({data}) => data)
}

export function getEducationLevel() {
    return http.get('/settings/EducationLevel/').then(({data}) => data)
}
