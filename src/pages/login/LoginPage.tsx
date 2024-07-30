import { useNavigate } from "react-router-dom";
import SplashScreen from "../../assets/splashscreen.jpeg";
import { useEffect, useState } from "react";
import { getGameBackendAPI } from "../../utils/api/game-backend.api";
import { useAuthentication } from "../../hooks/useAuthentication.hook";

interface ILoginAccount {
  username: string;
  password: string;
}

function LoginPage() {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const {authenticated} = useAuthentication();

  function canLogin(): boolean {
    return username && password ? true : false;
  }

  function login(): void {
    if (canLogin()) {
      const loginAccount: ILoginAccount = {
        username: username!,
        password: password!,
      };
      getGameBackendAPI()
        .post("/auth/login", loginAccount, {
          withCredentials: true,
        })
        .then(() => {
          navigate("/home");
        })
        .catch((e) => {
          console.log(e);
          if (e.response) {
            setMessage(e.response.data.message);
          } else {
            setMessage(e.message);
          }
        });
    } else {
      setMessage("Login failed!");
    }
  }

  function redirectToCreateAccount(): void {
    navigate("/createAccount");
  }

  useEffect(() => {
    if (authenticated === true) {
      navigate("/home");
    }
  }, [authenticated]);

  return (
    <div className="flex flex-row justify-center items-center w-screen h-screen">
      <div className="w-1/5 flex flex-col justify-center items-center h-full p-2">
        <div className="flex flex-col justify-center items-center gap-2 flex-grow">
          <input
            type="text"
            className="input input-sm bg-neutral w-full text-base-100"
            placeholder="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            className="input input-sm bg-neutral w-full text-base-100"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="btn btn-sm btn-primary w-36" onClick={login}>
            Login
          </button>
          {message && <div className="text-sm text-error">{message}</div>}
        </div>
        <button
          className="btn btn-sm btn-primary w-36"
          onClick={redirectToCreateAccount}
        >
          Create an account
        </button>
      </div>
      <div className="w-4/5 h-full">
        <img src={SplashScreen} className="w-full h-full" />
      </div>
    </div>
  );
}

export default LoginPage;
