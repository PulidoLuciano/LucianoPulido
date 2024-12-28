import { applicationConstants } from "../constants/applicationConstants";
import { LoginData, RegisterData, SessionData } from "../types";

const apiUrl = applicationConstants.VITE_API_BASE_URL;

const login = async (loginData : LoginData) : Promise<SessionData> => {
    const response = await fetch(apiUrl + "/auth/login", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(loginData)
    });
    const data = await response.json();
    if(response.ok){
        return data;
    }else{
        throw new Error(data.error);
    }
}

const logout = async (refreshToken : String) : Promise<void> => {
    const response = await fetch(apiUrl + "/auth/logout", {
        method : "DELETE",
        headers : {
            "Authorization": "Bearer " + refreshToken
        }
    });
    if(!response.ok){
        const data = await response.json();
        throw new Error(data.error);
    }
}

const register = async (registerData : RegisterData) => {
    const response = await fetch(apiUrl + "/auth/register", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(registerData)
    });
    const data = await response.json();
    if(response.ok){
        return data;
    }else{
        throw new Error(data.error);
    }
}

const getNewRefreshToken = async (refreshToken : String) : Promise<SessionData> => {
    const response = await fetch(apiUrl + "/auth/refresh", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization": "Bearer " + refreshToken
        }
    });
    const data = await response.json();
    if(response.ok){
        return data;
    }else{
        throw new Error(data.error);
    }
}

export const authService = { login, logout, register, getNewRefreshToken };