import { useEffect } from "react";
import { getGameBackendAPI } from "../utils/api/game-backend.api";
import { useApplicationContext } from "../providers/ApplicationProvider";

interface IAuthentication {
  authenticated: boolean;
}

export function useAuthentication(): IAuthentication {
  const { authenticated, setAuthenticated, setAccount } = useApplicationContext();

  async function authenticateAndGetAccount() {
    await authenticate();
    if (authenticated) {
      const response = await getGameBackendAPI().get("/account", {
        withCredentials: true,
      }).then((res) => {return res}).catch((e) => {return {data: {}}});
      setAccount(response.data.data);
    }
  }

  async function authenticate(): Promise<void> {
    const response = await getGameBackendAPI().get("/auth", {
      withCredentials: true,
    }).then(() => {return true}).catch(() => {return false});
    console.log(response);
    setAuthenticated(response);
  }


  useEffect(() => {
    authenticateAndGetAccount();
    const interval = setInterval(authenticate, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return { authenticated } as IAuthentication;
}
