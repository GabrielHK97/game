import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication.hook";
import Navbar from "../../components/navbar/Navbar";
import SplashScreen from "../../assets/splashscreen.jpeg";
import Lobby from "../../components/lobby/Lobby";

function HomePage() {
  const { authenticated } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated === false) {
      navigate("/");
    }
  }, [authenticated]);

  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex min-h-0 w-full flex-1 flex-grow flex-row">
        <div className="flex w-full flex-col">
          <Navbar />
          <div className="flex min-h-0 w-full flex-1 flex-row p-2 gap-2">
            <div className="min-h-0 w-full flex-1">
              <img src={SplashScreen} className="w-full h-full" />
            </div>
              <Lobby className="w-1/5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
