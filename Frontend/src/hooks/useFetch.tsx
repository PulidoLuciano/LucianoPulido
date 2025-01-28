import { applicationConstants } from "../constants/applicationConstants";
import { useAuth } from "../contexts/authContext";

function useFetch() {
  const auth = useAuth();
  let newToken: Promise<string> | null = null;

  async function fetcher(
    route: string,
    method: RequestInit["method"],
    options: RequestInit | null = null,
    token: string | null = auth.accessToken as string
  ) {
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
