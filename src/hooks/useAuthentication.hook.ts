import { useEffect } from "react";
import { getGameBackendAPI } from "../utils/api/game-backend.api";
import { useApplicationContext } from "../providers/ApplicationProvider";

interface IAuthentication {
  authenticated: boolean;
}

export function useAuthentication(): IAuthentication {
  const { authenticated, setAuthenticated } = useApplicationContext();
  async function auth(): Promise<void> {
    const response = await getGameBackendAPI().get("/auth", {
      withCredentials: true,
    }).then(() => {return true}).catch(() => {return false});
    console.log(response);
    setAuthenticated(response);
  }

  useEffect(() => {
    auth();
    const interval = setInterval(auth, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return { authenticated } as IAuthentication;
}
