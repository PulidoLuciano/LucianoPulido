import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CompleteUser, LoginData, RegisterData, SessionData, User } from "../types";
import { authService } from "../services/authService";

const authContext = createContext<{user : User | null, accessToken : String | null, refreshToken : String | null, login : (loginData : LoginData) => Promise<void>, logout : () => void, register : (registerData : RegisterData) => Promise<void>, getNewRefreshToken : () => void, changeUserData : (userData : CompleteUser) => void}>({user : null, accessToken : null, refreshToken : null, login : async () => {}, logout : () => {}, register : async () => {}, getNewRefreshToken : async () => {}, changeUserData : async () => {}});

export const AuthContext = ({children} : {children : ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<String | null>(null);
    const [refreshToken, setRefreshToken] = useState<String | null>(null);

    useEffect(()=>{
        async function verifySession(){
            const savedRefreshToken = localStorage.getItem("refresh");
            if(!savedRefreshToken){
                setAccessToken(null);
                setRefreshToken(null);
                setUser(null);
                return;
            }
            const payload = jwtDecode(savedRefreshToken);
            if(payload.exp){
                if(payload.exp * 1000 < new Date().getTime()){
                    setAccessToken(null);
                    setRefreshToken(null);
                    setUser(null);
                    return;
                }else{
                    const session = await authService.getNewRefreshToken(savedRefreshToken);
                    setRefreshToken(session.refreshToken);
                    setAccessToken(session.accessToken);
                    setUser({username : session.username, isAdmin : session.isAdmin});
                    localStorage.setItem("refresh", session.refreshToken);
                }
            }else{
                setAccessToken(null);
                setRefreshToken(null);
                setUser(null);
                return;
            }
        }

        verifySession();

    },[])
    
    async function login(loginData : LoginData){
        const sessionData : SessionData = await authService.login(loginData);
        if(sessionData){
            setUser({username : sessionData.username, isAdmin : sessionData.isAdmin});
            setAccessToken(sessionData.accessToken);
            setRefreshToken(sessionData.refreshToken);
            if(loginData.keepLoggedIn){
                localStorage.setItem("refresh", sessionData.refreshToken);
            }else{
                sessionStorage.setItem("refresh", sessionData.refreshToken);
            }
        } 
    }

    async function logout(){
        try {
            if(refreshToken){
                await authService.logout(refreshToken);
                setUser(null);
                setAccessToken(null);
                setRefreshToken(null);
                localStorage.removeItem("refresh");
                sessionStorage.removeItem("refresh");
            }
        } catch (error) {
            throw error;
        }
    }

    async function register(registerData : RegisterData){
        try{
            await authService.register(registerData);
        }catch(error){
            throw error;
        }
    }

    async function getNewRefreshToken(){
        const localRefresh = localStorage.getItem("refresh");
        const sessionRefresh = sessionStorage.getItem("refresh");
        if(!refreshToken || (!localRefresh && !sessionRefresh)) return;
        try{
            localStorage.removeItem("refresh");
            sessionStorage.removeItem("refresh");
            const session : SessionData = await authService.getNewRefreshToken(refreshToken);
            if(session){
                setAccessToken(session.accessToken);
                setRefreshToken(session.refreshToken);
                if(localRefresh)
                    localStorage.setItem("refresh", session.refreshToken);
                else
                    sessionStorage.setItem("refresh", session.refreshToken);
            }else{
                throw new Error("Session is empty");
            }
        }catch(error){
            setAccessToken(null);
            setRefreshToken(null);
            setUser(null);
            localStorage.removeItem("refresh");
            sessionStorage.removeItem("refresh");
            window.history.pushState({}, "", "/login");
            const navigationEvent = new Event("pushstate");
            window.dispatchEvent(navigationEvent);
        }
    }

    async function changeUserData(userData : CompleteUser){
        if(!refreshToken) return;
        try {
            const response = await authService.changeUserData(userData, refreshToken);
            setUser({username : response.username, isAdmin : response.isAdmin});
        } catch (error) {
            throw error;
        }
    }

  return (
    <authContext.Provider value={{user, accessToken, refreshToken, login, logout, register, getNewRefreshToken, changeUserData}}>
        {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
    const context = useContext(authContext);
    if (context === undefined) {
      throw new Error('useAuth must be used inside an AuthContext');
    }
    return context;
  };