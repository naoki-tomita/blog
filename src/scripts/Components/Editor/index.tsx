import { h, Component } from "hyperapp";
import { Link } from "@hyperapp/router";

import { State, Actions } from "../../App";
import { Restricted } from "../Restricted";
import {
  BlockedInput,
  BlockedTextArea,
  BlockedButton,
} from "../BlockedComponents";
import { wrap } from "hyper-styled";

const TitleInput = wrap(BlockedInput)`
  outline: 0;
  font-size: 20px;
  width: 100%;
  border-radius: 5px;
  margin: 0 0 15px 0;
`;

const BodyInput = wrap(BlockedTextArea)`
  outline: 0;
  font-size: 20px;
  width: 100%;
  height: 400px;
  border-radius: 5px;
  margin: 0 0 15px 0;
  resize: vertical;
`;

const SendButton = wrap(BlockedButton)`
  outline: 0;
  font-size: 20px;
  width: 100%;
  border-radius: 5px;

  &:disabled {
    background-color: gray;
  }
`;

export const Editor: Component<{ oncreate?: () => void }, State, Actions> = ({
  oncreate,
}) => ({ title, body }, { setTitle, setBody, send }) => {
  return (
    <Restricted>
      <TitleInput
        oncreate={oncreate}
        type="text"
        placeholder="Title"
        value={title}
        oninput={(e: Event) => setTitle((e.target as HTMLInputElement).value)}
      />
      <BodyInput
        value={body}
        placeholder="Body"
        oninput={(e: Event) => setBody((e.target as HTMLTextAreaElement).value)}
      />
      <SendButton onclick={send} disabled={!title || !body}>
        send
      </SendButton>
    </Restricted>
  );
};

export const EditorLink: Component<{}, State, Actions> = () => (
  <Restricted>
    <div>
      <Link to="/edit">create</Link>
    </div>
  </Restricted>
);
