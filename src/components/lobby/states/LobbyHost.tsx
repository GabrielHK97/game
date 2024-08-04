import { useEffect } from "react";
import { LobbyStatesEnum } from "../../../utils/enum/lobbyStates.enum";
import { useApplicationContext } from "../../application/application.context";
import LobbyPlayers from "../LobbyPlayers";

interface IDeleteLobbyDto {
  id: string;
  accountId: string;
}

function LobbyHost() {
  const { socket, account, lobby, setLobby, setLobbyState } =
    useApplicationContext();

  async function deleteLobby(): Promise<void> {
    console.log('deleteLobby');
    if (lobby && socket && account) {
      console.log('inside if');
      const deleteLobbyDto: IDeleteLobbyDto = {
        id: lobby?.id,
        accountId: account.id,
      };
      socket.emit("deleteLobby", deleteLobbyDto);
    }
  }

  useEffect(() => {
    if (socket && lobby) {
      socket.on(`deletedLobby:${lobby.id}`, () => {
        socket.off(`deletedLobby:${lobby.id}`);
        setLobby(undefined);
        setLobbyState(LobbyStatesEnum.LIST);
      });
      socket.on(`leftLobby:${lobby.id}`, (l) => {
        socket.off(`leftLobby:${lobby.id}`);
        setLobby(l);
      });
      socket.on(`joinedLobby:${lobby.id}`, (l) => {
        socket.off(`joinedLobby:${lobby.id}`);
        setLobby(l);
      })
    }
  }, [lobby]);

  return (
    <>
    <div>Host</div>
      <LobbyPlayers />
      <button className="btn btn-sm btn-primary w-full" onClick={deleteLobby}>
        Leave
      </button>
    </>
  );
}

export default LobbyHost;
