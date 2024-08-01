import { useEffect, useState } from "react";
import { useApplicationContext } from "../../providers/ApplicationProvider";
import { getGameBackendAPI } from "../../utils/api/game-backend.api";

interface ILobby {
  id: string;
  name: string;
  accountIds: string[];
  hostAccountId: string;
  numberOfPlayers: string;
}

interface TableColumns {
  name: string;
  key?: string;
  width?: string;
}

const columns: TableColumns[] = [
  { name: "Name", key: "name", width: "w-48" },
  { name: "Players", key: "numberOfPlayers", width: "w-12" },
];

enum LobbyStates {
  CREATING = "creating",
  HOST = "host",
  GUEST = "guest",
  LIST = "list",
}

interface CreateLobbyDto {
  name: string;
  hostAccountId: string;
}

interface JoinLobbyDto {
  id: string;
  accountId: string;
}

interface IProps {
  className?: string;
}

function Lobby({ className }: IProps) {
  const { socket, account } = useApplicationContext();
  const [lobbies, setLobbies] = useState<ILobby[]>([]);
  const [lobby, setLobby] = useState<ILobby>();
  const [lobbyState, setLobbyState] = useState<LobbyStates>(LobbyStates.LIST);
  const [lobbyName, setLobbyName] = useState<string>("");

  function precreateLobby() {
    setLobbyName("");
    setLobbyState(LobbyStates.CREATING);
  }

  function createLobby() {
    if (account) {
      const createLobbyDto: CreateLobbyDto = {
        name: lobbyName,
        hostAccountId: account.id,
      };
      if (socket) socket.emit("createLobby", createLobbyDto);
    }
  }

  function joinLobby(id: string) {
    if (account) {
      const joinLobbyDto: JoinLobbyDto = { id, accountId: account.id };
      if (socket) socket.emit("joinLobby", joinLobbyDto);
    }
  }

  function leaveLobby() {
    //if (socket) socket.emit("deleteLobby", { name: lobbyName });
    setLobbyState(LobbyStates.LIST);
  }

  useEffect(() => {
    if (socket && account) {
      socket.emit("getLobbies");
      socket.on("lobbies", (res) => {
        setLobbies(res);
      });
      socket.on("lobbyCreated", (res: ILobby) => {
        if (res.hostAccountId === account.id) {
          setLobby(res);
          setLobbyState(LobbyStates.HOST);
        } else {
        }
      });
      socket.on("accountJoined", (res) => {
        if (res.accountIds.includes(account.id) && res.hostAccountId !== account.id) {
          setLobby(res);
          setLobbyState(LobbyStates.GUEST);
        }
      });
    }
  }, [socket, account]);

  return (
    <div
      className={`flex flex-col overflow-y-auto ${className} justify-center items-center gap-2`}
    >
      {lobbyState === LobbyStates.CREATING && (
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
        </>
      )}
      {lobbyState === LobbyStates.LIST && (
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
                {lobbies.map((lobby: ILobby) => {
                  return (
                    <tr>
                      {columns.map((column) => {
                        return (
                          <td className="text-center p-2">
                            {column.key && <>{(lobby as any)[column.key]}</>}
                          </td>
                        );
                      })}
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => joinLobby(lobby.id)}
                          disabled={lobby.numberOfPlayers === '2/2'}
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
      )}
      {lobbyState === LobbyStates.HOST && (
        <>
          <button
            className="btn btn-sm btn-primary w-full"
            onClick={leaveLobby}
          >
            Leave
          </button>
        </>
      )}
      {lobbyState === LobbyStates.GUEST && (
        <>
          <button
            className="btn btn-sm btn-primary w-full"
            onClick={leaveLobby}
          >
            Leave
          </button>
        </>
      )}
    </div>
  );
}

export default Lobby;
