import { applicationConstants } from "../constants/applicationConstants";
import { useAuth } from "../contexts/authContext";

function useFetch(){
    
    const auth = useAuth();

    async function fetcher(route : string, options : RequestInit){
        const response = await fetch( applicationConstants.VITE_API_BASE_URL + route , options);
        const data = await response.json();
        if(response.ok){
            return data;
        }else if(response.status === 401){
            await auth.getNewRefreshToken();
            fetcher(route, options);
        }else{
            throw new Error(data.error);
        }
    }

    return { fetcher }
} 

export { useFetch }