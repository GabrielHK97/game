import { useEffect } from "react";
import { useApplicationContext } from "../../application/application.context";
import { getGameBackendAPI } from "../../../utils/api/game-backend.api";
import { LobbyStatesEnum } from "../../../utils/enum/lobbyStates.enum";

interface ITableColumns {
  name: string;
  key?: string;
  width?: string;
}

const columns: ITableColumns[] = [
  { name: "Name", key: "name", width: "w-48" },
  { name: "Players", key: "numberOfPlayers", width: "w-12" },
];

interface IJoinLobbyDto {
  id: string;
  accountId: string;
}

function LobbyList() {
  const {
    socket,
    account,
    lobby,
    lobbies,
    setLobby,
    setLobbies,
    setLobbyName,
    setLobbyState,
  } = useApplicationContext();

  function precreateLobby() {
    setLobbyName("");
    setLobbyState(LobbyStatesEnum.CREATE);
  }

  async function joinLobby(id: string): Promise<void> {
    if (account && socket) {
      const joinLobbyDto: IJoinLobbyDto = { id, accountId: account.id };
      const response = await getGameBackendAPI().post('/lobby/join', joinLobbyDto, {withCredentials: true});
      if (response) {
        setLobby(response.data.data);
        socket.emit('joinLobby', joinLobbyDto);
        setLobbyState(LobbyStatesEnum.GUEST);
      }
    }
  }

  useEffect(() => {
    if (socket) {
      socket.emit("getLobbies");
      socket.on("gotLobbies", (res) => {
        setLobbies(res);
      });
    }
  }, [socket]);
  return (
    <>
      <div className="text-xl">Lobbies</div>
      <div className="min-h-0 w-full flex-1 overflow-y-auto">
        <table className="w-full table table-pin-rows">
          <thead>
            <tr>
              {columns.map((column) => {
                return (
                  <th
                    className={`bg-primary p-2 text-neutral text-center ${column.width}`}
                  >
                    {column.name}
                  </th>
                );
              })}
              <th className="bg-primary p-2 text-neutral w-12 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {lobbies.map((lobby: any) => {
              return (
                <tr>
                  {columns.map((column) => {
                    return (
                      <td className="text-center p-2">
                        {column.key && <>{lobby[column.key]}</>}
                      </td>
                    );
                  })}
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => joinLobby(lobby.id)}
                      disabled={lobby.numberOfPlayers === "2/2"}
                    >
                      Join
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        className="btn btn-sm btn-primary w-full"
        onClick={precreateLobby}
      >
        Create
      </button>
    </>
  );
}

export default LobbyList;
