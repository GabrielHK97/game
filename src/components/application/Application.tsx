import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication.hook";
import { useEffect } from "react";
import { useSocket } from "../../hooks/useSocket.hook";
import { useApplicationContext } from "../../providers/ApplicationProvider";
import { getGameBackendAPI } from "../../utils/api/game-backend.api";

function Application() {
  const { socket, setAuthenticated } = useApplicationContext();
  const { authenticated } = useAuthentication();
  const navigate = useNavigate();

  useSocket();

  useEffect(() => {
    if (authenticated === false) {
      navigate("/");
    }
  }, [authenticated]);

  return <div></div>;
}

export default Application;
