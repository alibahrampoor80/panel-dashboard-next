import http from "@/services/httpService";


export function getStates() {
    return http.get('/settings/states/').then(({data}) => data)
}

// export function getStatesSlug(id) {
//     return http.get(`/settings/states/${id}`).then(({data}) => data)
// }

export function getStatesSlugCities(id) {
    return http.get(`/settings/states/${id}/cities`).then(({data}) => data)
}
