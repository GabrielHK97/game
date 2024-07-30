import { io, Socket } from "socket.io-client";
import { useEffect } from "react";
import { getGameBackendAPI } from "../utils/api/game-backend.api";
import { useApplicationContext } from "../providers/ApplicationProvider";

interface ISocket {
    socket: Socket;
  }
  
  export function useSocket(): ISocket {
    const {authenticated, setAuthenticated, socket, setSocket} = useApplicationContext();

    useEffect(() => {
        if (authenticated) {
          setSocket(
            io(process.env.REACT_APP_GAME_BACKEND_API_URL!, {
              withCredentials: true,
            })
          );
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

    return { socket } as ISocket;
  }