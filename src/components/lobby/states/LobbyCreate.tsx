import { useApplicationContext } from "../../application/application.context";
import { LobbyStatesEnum } from "../../../utils/enum/lobbyStates.enum";
import { useEffect, useState } from "react";
import { getGameBackendAPI } from "../../../utils/api/game-backend.api";

interface CreateLobbyDto {
    name: string;
    hostAccountId: string;
  }

function LobbyCreate() {
  const { socket, account } = useApplicationContext();
  const {lobbyName, setLobbyName, setLobby, setLobbyState} = useApplicationContext();

  async function createLobby(): Promise<void> {
    if (account && socket) {
      const createLobbyDto: CreateLobbyDto = {
        name: lobbyName,
        hostAccountId: account.id,
      };
      const response = await getGameBackendAPI().post('/lobby/create', createLobbyDto, {withCredentials: true});
      if (response) {
        setLobby(response.data.data);
        socket.emit('getLobbies');
        setLobbyState(LobbyStatesEnum.HOST);
      }
    }
  }
  
  function cancelLobby(): void {
    setLobbyState(LobbyStatesEnum.LIST);
  }

  return (
    <>
      <input
        className="input input-sm bg-neutral text-base-100 w-full"
        type="text"
        placeholder="lobby name"
        value={lobbyName}
        onChange={(e) => {
          setLobbyName(e.target.value);
        }}
      />
      <button
        className="btn btn-sm btn-primary w-full"
        onClick={createLobby}
        disabled={lobbyName ? false : true}
      >
        Create
      </button>
      <button
        className="btn btn-sm btn-error w-full"
        onClick={cancelLobby}
      >
        Cancel
      </button>
    </>
  );
}

export default LobbyCreate;
