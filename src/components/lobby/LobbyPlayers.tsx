import { useEffect, useState } from "react";
import { useApplicationContext } from "../application/application.context";
import { getGameBackendAPI } from "../../utils/api/game-backend.api";

interface AccountDetailsDto {
  id: string;
  name: string;
  username: string;
  age: string;
  sex: string;
  birthDate: Date;
  email: string;
}

function LobbyPlayers() {
  const { lobby } = useApplicationContext();
  const [accounts, setAccounts] = useState<AccountDetailsDto[] | undefined>(
    undefined
  );

  async function getAccount(accountId: string): Promise<AccountDetailsDto> {
    const response = await getGameBackendAPI().get(`/account/${accountId}`, {
      withCredentials: true,
    });
    return response.data.data;
  }

  async function getAccounts(accountIds: string[]) {
    setAccounts(
      await Promise.all(accountIds.map((accountId) => getAccount(accountId)))
    );
  }

  useEffect(() => {
    if (lobby) {
      getAccounts(lobby.accountIds);
    }
  }, [lobby]);

  return (
    <div className="w-full gap-2 flex flex-col">
      {accounts &&
        accounts.map((account) => {
          return (
            <div className="w-full border border-primary rounded-lg p-2 flex flex-row">
              <div className="flex-grow">{account.username}</div>
              <div>{lobby?.hostAccountId === account.id ? 'Host' : 'Guest'}</div>
            </div>
          );
        })}
    </div>
  );
}

export default LobbyPlayers;
