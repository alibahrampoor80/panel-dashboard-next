import {useQuery} from "react-query";
import {getSkills} from "@/services/skillsService";

export const useSkills = () => {
    return useQuery({
        queryKey: ['get-skills'],
        queryFn: getSkills,
        retry: false,
        // refetchOnWindowFocus:true
    })
}