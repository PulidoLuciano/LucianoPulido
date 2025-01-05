import { applicationConstants } from "../constants/applicationConstants";
import { useAuth } from "../contexts/authContext";

function useFetch(){
    
    const auth = useAuth();

    async function fetcher(route : string, method : RequestInit["method"], options : RequestInit | null = null , retry = false){
        const response = await fetch( applicationConstants.VITE_API_BASE_URL + route , {
            ...options,
            method: method,
            headers: {
                ...options?.headers,
                "Content-Type": "application/json",
                "Authorization": (auth.accessToken) ? `Bearer ${auth.accessToken}` : ""
            },
        });
        const data = await response.json();
        if(response.ok){
            return data;
        }else if(response.status === 401){
            if(!retry){
                await auth.getNewRefreshToken();
                fetcher(route, method, options, true);
            }else{
                window.history.pushState({}, "", "/login");
            const navigationEvent = new Event("pushstate");
            window.dispatchEvent(navigationEvent);
            }
        }else{
            throw new Error(data.error);
        }
    }

    return { fetcher }
} 

export { useFetch }