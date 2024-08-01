import UserSVG from "../../assets/svg/user.svg";
import { useApplicationContext } from "../../providers/ApplicationProvider";
import { getGameBackendAPI } from "../../utils/api/game-backend.api";

function Navbar() {
  const { socket, setAuthenticated, account } = useApplicationContext();

  function logout() {
    if (socket) socket.disconnect();
    getGameBackendAPI().get("/auth/logout", { withCredentials: true });
    setAuthenticated(false);
  }

  return (
    <div className="w-full h-12 p-2 flex flex-row justify-center items-center shadow shadow-black gap-2">
      <div>logo</div>
      <div className="flex-grow"></div>
      <div className="h-8 shadow shadow-black p-2 flex flex-row justify-center items-center rounded-lg gap-1">
        <UserSVG className="w-4 h-4 text-white"/>
        <div>{account?.username}</div>
      </div>
      <button className="btn btn-primary btn-sm" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
