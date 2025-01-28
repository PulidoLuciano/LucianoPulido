import { useEffect } from "react";
import { applicationConstants } from "../constants/applicationConstants";
import { useAuth } from "../contexts/authContext";

function useFetch(onlyAdmin : boolean = false) {
  const auth = useAuth();
  let newToken: Promise<string> | null = null;

  useEffect(() => {
    function backLogin(){
      if(onlyAdmin && !auth.user?.isAdmin){
        window.history.pushState({}, "", "/login");
        const navigationEvent = new Event("pushstate");
        window.dispatchEvent(navigationEvent);
      }
    }

    backLogin();
  }, [])

  async function fetcher(
    route: string,
    method: RequestInit["method"],
    options: RequestInit | null = null,
    token: string | null = auth.accessToken as string
  ) {
    if(onlyAdmin && !auth.user?.isAdmin) return;
    if(newToken) token = await newToken;
    const response = await fetch(
      applicationConstants.VITE_API_BASE_URL + route,
      {
        ...options,
        method: method,
        headers: {
          ...options?.headers,
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    } else if (response.status === 401) {
      try {
        if (!newToken)
          newToken = new Promise<string>(async (resolve, reject) => {
            try {
              resolve(await auth.getNewRefreshToken());
            } catch (error) {
              window.history.pushState({}, "", "/login");
              const navigationEvent = new Event("pushstate");
              window.dispatchEvent(navigationEvent);
              reject(new Error("Error while getting new token"));
            }
          });
        return await fetcher(route, method, options);
      } catch (error) {}
    } else {
      throw new Error(data.error);
    }
  }

  return { fetcher };
}

export { useFetch };
