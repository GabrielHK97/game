import { LobbyStatesEnum } from "../../../utils/enum/lobbyStates.enum";
import { useApplicationContext } from "../../application/application.context";
import { useEffect } from "react";
import LobbyPlayers from "../LobbyPlayers";

interface ILeaveLobbyDto {
  id: string;
  accountId: string;
}

function LobbyGuest() {
  const { lobby, setLobby, setLobbyState } = useApplicationContext();
  const { socket, account } = useApplicationContext();

  async function leaveLobby(): Promise<void> {
    if (lobby && socket && account) {
      const leaveLobbyDto: ILeaveLobbyDto = {
        id: lobby.id,
        accountId: account.id,
      };
      socket.emit("leaveLobby", leaveLobbyDto);
    }
  }

  useEffect(() => {
    if (lobby && socket) {
      socket.on(`deletedLobby:${lobby.id}`, () => {
        socket.off(`deletedLobby:${lobby.id}`);
        setLobby(undefined);
        setLobbyState(LobbyStatesEnum.LIST);
      });

      socket.on(`leftLobby:${lobby.id}`, () => {
        socket.off(`leftLobby:${lobby.id}`);
        setLobby(undefined);
        setLobbyState(LobbyStatesEnum.LIST);
      });
    }
  }, [lobby]);

  return (
    <>
    <div>Guest</div>
      <LobbyPlayers />
      <button className="btn btn-sm btn-primary w-full" onClick={leaveLobby}>
        Leave
      </button>
    </>
  );
}

export default LobbyGuest;
