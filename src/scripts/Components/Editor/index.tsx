import { h, Component } from "hyperapp";
import { Link } from "@hyperapp/router";

import { State, Actions } from "../../App";
import { Restricted } from "../Restricted";
import {
  BlockedInput,
  BlockedTextArea,
  BlockedButton,
} from "../BlockedComponents";

export const Editor: Component<{}, State, Actions> = () => (
  { title, body },
  { setTitle, setBody, send },
) => {
  return (
    <Restricted>
      <BlockedInput
        type="text"
        value={title}
        onchange={e => setTitle((e.target as HTMLInputElement).value)}
      />
      <BlockedTextArea
        value={body}
        onchange={(e: Event) =>
          setBody((e.target as HTMLTextAreaElement).value)
        }
      />
      <BlockedButton onclick={send}>send</BlockedButton>
    </Restricted>
  );
};

export const EditorLink: Component = () => (
  <Restricted>
    <Link to="/editor">contribute</Link>
  </Restricted>
);
