import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication.hook";
import { useEffect } from "react";
import { useSocket } from "../../hooks/useSocket.hook";

function Application() {
  const { authenticated } = useAuthentication();
  const navigate = useNavigate();

  useSocket();

  useEffect(() => {
    console.log(authenticated);
    // if (authenticated === false) {
    //   navigate("/");
    // }
  }, [authenticated]);

  return <></>;
}

export default Application;
