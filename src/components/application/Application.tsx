import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication.hook";
import { useEffect } from "react";
import { useSocket } from "../../hooks/useSocket.hook";
import { getGameBackendAPI } from "../../utils/api/game-backend.api";
import { useApplicationContext } from "./application.context";

interface DeleteLobbyDto {
  id: string;
  accountId: string;
}

interface LeaveLobbyDto {
  id: string;
  accountId: string;
}

function Application() {
  const { socket, account, setAuthenticated, lobby } = useApplicationContext();
  const { authenticated } = useAuthentication();
  const navigate = useNavigate();

  useSocket();

  useEffect(() => {
    if (authenticated === false) {
      navigate("/");
    }
  }, [authenticated]);

  window.addEventListener("beforeunload", () => {
    if (socket && lobby && account) {
      if (lobby.hostAccountId === account.id) {
        const deleteLobbyDto: DeleteLobbyDto = {
          id: lobby?.id,
          accountId: account.id,
        };
        socket.emit("deleteLobby", deleteLobbyDto);
      } else {
        const leaveLobbyDto: LeaveLobbyDto = {
          id: lobby.id,
          accountId: account.id,
        };
        socket.emit("leaveLobby", leaveLobbyDto);
      }
      socket.disconnect();
    }
    getGameBackendAPI().get("/auth/logout", { withCredentials: true });
    setAuthenticated(false);
  });

  return <></>;
}

export default Application;
