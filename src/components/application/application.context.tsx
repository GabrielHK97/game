import { createContext, useContext, useState } from "react";
import { Socket } from "socket.io-client";
import { LobbyStatesEnum } from "../../utils/enum/lobbyStates.enum";

interface IAccountDetailsDto {
  id: string;
  name: string;
  username: string;
  age: string;
  sex: string;
  birthDate: Date;
  email: string;
}

interface ILobbyDto {
  id: string;
  name: string;
  accountIds: string[];
  hostAccountId: string;
  numberOfPlayers: string;
}

interface IApplicationContextType {
  authenticated: boolean;
  setAuthenticated: (status: boolean) => void;
  socket: Socket | undefined;
  setSocket: (status: Socket | undefined) => void;
  account: IAccountDetailsDto | undefined;
  setAccount: (status: IAccountDetailsDto | undefined) => void;
  lobby: ILobbyDto | undefined;
  setLobby: (lobby: ILobbyDto | undefined) => void;
  lobbies: ILobbyDto[];
  setLobbies: (lobbies: ILobbyDto[]) => void;
  lobbyName: string;
  setLobbyName: (name: string) => void;
  lobbyState: LobbyStatesEnum;
  setLobbyState: (state: LobbyStatesEnum) => void;
}

const ApplicationContext = createContext<IApplicationContextType | undefined>(
  undefined
);

function ApplicationProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [account, setAccount] = useState<IAccountDetailsDto | undefined>(
    undefined
  );
  const [lobby, setLobby] = useState<ILobbyDto | undefined>(undefined);
  const [lobbies, setLobbies] = useState<ILobbyDto[]>([]);
  const [lobbyName, setLobbyName] = useState<string>("");
  const [lobbyState, setLobbyState] = useState<LobbyStatesEnum>(
    LobbyStatesEnum.LIST
  );

  return (
    <ApplicationContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        socket,
        setSocket,
        account,
        setAccount,
        lobby,
        setLobby,
        lobbies,
        setLobbies,
        lobbyName,
        setLobbyName,
        lobbyState,
        setLobbyState
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplicationContext(): IApplicationContextType {
  const context = useContext(ApplicationContext);
  return context!;
}

export default ApplicationProvider;
