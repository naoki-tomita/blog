import { h, Component } from "hyperapp";
import { State, Actions } from "../App";

export const Restricted: Component<
  {},
  State,
  Actions
> = (_, children) => ({ user }) => <span>{user && children}</span>;
