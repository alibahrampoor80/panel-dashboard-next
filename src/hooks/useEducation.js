import {useQuery} from "react-query";

import {getEducationLevel, getReshte} from "@/services/educationService";

export const useEducationLevel = () => {
    return useQuery({
        queryKey: ['get-EducationLevel'],
        queryFn: getEducationLevel,
        retry: false,
        // refetchOnWindowFocus:true
    })
}

export const useReshte = () => {
    return useQuery({
        queryKey: ['get-Reshte'],
        queryFn: getReshte,
        retry: false,
        // refetchOnWindowFocus:true
    })
}