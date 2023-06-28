import {useQuery} from "react-query";
import {getStates} from "@/services/stateCityService";

export const useStates = () => {
    return useQuery({
        queryKey: ['get-States'],
        queryFn: getStates,
        retry: false,
        // refetchOnWindowFocus:true
    })
}