import { applicationConstants } from "../constants/applicationConstants";
import { useAuth } from "../contexts/authContext";

function useFetch(){
    
    const auth = useAuth();

    async function fetcher(route : string, options : RequestInit, retry = false){
        const response = await fetch( applicationConstants.VITE_API_BASE_URL + route , options);
        const data = await response.json();
        if(response.ok){
            return data;
        }else if(response.status === 401){
            if(!retry){
                await auth.getNewRefreshToken();
                fetcher(route, options, true);
            }else{
                throw new Error(data.error);
            }
        }else{
            throw new Error(data.error);
        }
    }

    return { fetcher }
} 

export { useFetch }