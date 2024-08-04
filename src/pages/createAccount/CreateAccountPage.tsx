import { useState } from "react";
import SplashScreen from "../../assets/splashscreen.jpeg";
import { Sex, SexEnum } from "../../utils/enum/sex.enum";
import { getGameBackendAPI } from "../../utils/api/game-backend.api";

interface ICreateAccount {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  sex: SexEnum;
  birthDate: Date;
}

function CreateAccountPage() {
  const [name, setName] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>(
    undefined
  );
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [sex, setSex] = useState<SexEnum | undefined>(undefined);
  const [birthDate, setBirthDate] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [accountCreated, setAccountCreated] = useState<boolean>(false);

  function canCreateAccount(): boolean {
    return name && username && password && confirmPassword && sex && birthDate
      ? true
      : false;
  }

  function createAccount(): void {
    if (canCreateAccount()) {
      const createAccount: ICreateAccount = {
        name: name!,
        username: username!,
        email: email!,
        password: password!,
        confirmPassword: confirmPassword!,
        sex: sex!,
        birthDate: new Date(birthDate!),
      };
      getGameBackendAPI()
        .post("/account/create", createAccount, {
          withCredentials: true,
        })
        .then(() => {
          setAccountCreated(true);
        })
        .catch((e) => {
          setMessage(e.message);
        });
    } else {
      setMessage("Some field is empty");
    }
  }

  return (
    <div className="w-screen h-screen">
      <img src={SplashScreen} className="w-full h-full" />
      {accountCreated ? (
        <div
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
          }}
          className="bg-base-100 rounded-lg gap-2 p-5 flex flex-col justify-center items-center"
        >
          <div className="text-lg">Account created!</div>
          <a href="/" className="text-sm">
            Return to Login
          </a>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
          }}
          className="bg-base-100 rounded-lg gap-2 p-5 flex flex-col justify-center items-center"
        >
          <div className="text-lg">Create account</div>
          <input
            type="text"
            className="input input-sm bg-neutral w-56 text-base-100"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="username"
            className="input input-sm bg-neutral w-56 text-base-100"
            placeholder="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="text"
            className="input input-sm bg-neutral w-56 text-base-100"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="input input-sm bg-neutral w-56 text-base-100"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="password"
            className="input input-sm bg-neutral w-56  text-base-100"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <div className="gap-2 flex flex-row justify-center items-center w-56">
            <div className="text-sm flex-grow">Sex:</div>
            <select
              className="select select-sm bg-neutral w-36  text-base-100"
              value={sex}
              onChange={(e) => {
                setSex(e.target.value as SexEnum);
              }}
            >
              <option disabled hidden selected></option>
              {Sex.map((sex) => {
                return <option value={sex}>{sex}</option>;
              })}
            </select>
          </div>
          <div className="gap-2 flex flex-row justify-center items-center w-56">
            <div className="text-sm flex-grow">Birth date:</div>
            <input
              type="date"
              className="input input-sm bg-neutral w-36  text-base-100"
              placeholder="birthdate"
              value={birthDate}
              onChange={(e) => {
                setBirthDate(e.target.value);
              }}
            />
          </div>
          <button
            className="btn btn-sm btn-primary w-36"
            onClick={createAccount}
          >
            Create
          </button>
          {message && <div className="text-sm text-error">{message}</div>}
          <a href="/" className="text-sm">
            Return to Login
          </a>
        </div>
      )}
    </div>
  );
}

export default CreateAccountPage;
