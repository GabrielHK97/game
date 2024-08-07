import { io } from "socket.io-client";
import { useEffect } from "react";
import { getGameBackendAPI } from "../utils/api/game-backend.api";
import { useApplicationContext } from "../components/application/application.context";

export function useSocket(): void {
  const { authenticated, setAuthenticated, socket, setSocket } =
    useApplicationContext();

  useEffect(() => {
    if (authenticated) {
      setSocket(
        io(process.env.REACT_APP_GAME_BACKEND_API_URL!, {
          withCredentials: true,
        })
      );
      console.log('socket on');
    }
  }, [authenticated]);

  useEffect(() => {
    if (socket) {
      socket.on("disconnect", () => {
        getGameBackendAPI().get("/auth/logout", { withCredentials: true });
        setAuthenticated(false);
      });
    }
  }, [socket]);
}
