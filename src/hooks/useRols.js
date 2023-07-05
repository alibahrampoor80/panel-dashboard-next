import {useQuery} from "react-query";

import {getRoles} from "@/services/roleService";

export const useRoles = () => {
    return useQuery({
        queryKey: ['get-Roles'],
        queryFn: getRoles,
        retry: false,
        // refetchOnWindowFocus:true
    })
}