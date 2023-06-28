import http from "@/services/httpService";
import axios from "axios";

export function getSkills() {
    return http.get('/settings/skills/').then(({data}) => data)
}
