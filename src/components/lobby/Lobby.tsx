import { LobbyStatesEnum } from "../../utils/enum/lobbyStates.enum";
import LobbyList from "./states/LobbyList";
import LobbyCreate from "./states/LobbyCreate";
import LobbyHost from "./states/LobbyHost";
import LobbyGuest from "./states/LobbyGuest";
import { useApplicationContext } from "../application/application.context";

interface IProps {
  className?: string;
}

function Lobby({ className }: IProps) {
  const {lobbyState} = useApplicationContext();

  return (
    <div
      className={`flex flex-col overflow-y-auto ${className} justify-center items-center gap-2`}
    >
      {lobbyState === LobbyStatesEnum.CREATE && <LobbyCreate />}
      {lobbyState === LobbyStatesEnum.LIST && <LobbyList />}
      {lobbyState === LobbyStatesEnum.HOST && <LobbyHost />}
      {lobbyState === LobbyStatesEnum.GUEST && <LobbyGuest />}
    </div>
  );
}

export default Lobby;
