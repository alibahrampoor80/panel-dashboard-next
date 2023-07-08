import http from "@/services/httpService";


export function createUser(data) {
    return http.post("/users/create/", data, {
        headers: {
            // "Authorization": "YOUR_API_AUTHORIZATION_KEY_SHOULD_GOES_HERE_IF_HAVE",
            "Content-type": "multipart/form-data",
        },
    }).then(({data}) => data);
}


export function createFastUser(data) {
    return http.post("/users/createQuickly/", data).then(({data}) => data);
}


