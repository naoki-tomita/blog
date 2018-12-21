import { h, Component } from "hyperapp";
import { State, Actions } from "../App";
import { Restricted } from "./Restricted";
import { BlockedInput, BlockedButton } from "./BlockedComponents";

export const Auth: Component<{}, State, Actions> = () => (
  { isShowLogin, user, loginFailedError, email, password },
  { setEmail, setPassword, switchSownLogin, login },
) => {
  return (
    <div>
      {!user && <button onclick={switchSownLogin}>manage</button>}
      <Restricted>
        <div>{user && user.email}</div>
      </Restricted>
      {isShowLogin && !user && (
        <div>
          {loginFailedError && loginFailedError.message}
          <BlockedInput
            type="text"
            onchange={(e: Event) =>
              setEmail((e.target as HTMLInputElement).value)
            }
            value={email}
          />
          <BlockedInput
            type="password"
            onchange={(e: Event) =>
              setPassword((e.target as HTMLInputElement).value)
            }
            value={password}
          />
          <BlockedButton onclick={login}>login</BlockedButton>
        </div>
      )}
    </div>
  );
};
