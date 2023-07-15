import {useQuery} from "react-query";
import {getAlUsers} from "@/services/getAlUsers";


export const useAllUsers = () => {
    return useQuery({
        queryKey: ['get-All-Users'],
        queryFn: getAlUsers,
        retry: false,
        // refetchOnWindowFocus:true
    })
}