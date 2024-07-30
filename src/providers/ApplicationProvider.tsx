import { createContext, useContext, useState } from "react";
import { Socket } from "socket.io-client";

interface ApplicationContextType {
  authenticated: boolean;
  setAuthenticated: (status: boolean) => void;
  socket: Socket | undefined;
  setSocket: (status: Socket | undefined) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

function ApplicationProvider({ children }: any) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  return (
    <ApplicationContext.Provider value={{ authenticated, setAuthenticated, socket, setSocket }}>
        {children}

    </ApplicationContext.Provider>
  );
}

export function useApplicationContext(): ApplicationContextType {
  const context = useContext(ApplicationContext);
  return context!;
}

export default ApplicationProvider;
