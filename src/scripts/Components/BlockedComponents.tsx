import { h, Component } from "hyperapp";

export const BlockedInput: Component<{
  value?: string;
  type?: string;
  onchange?: (e: Event) => void;
  style?: any;
}> = attributes => (
  <div>
    <input {...attributes} />
  </div>
);

export const BlockedTextArea: Component<{
  value?: string;
  onchange?: (e: Event) => void;
}> = ({ value, onchange }) => (
  <div>
    <textarea onchange={onchange}>{value}</textarea>
  </div>
);

export const BlockedButton: Component<{
  onclick?: () => void;
}> = ({ onclick }, children) => (
  <div>
    <button onclick={onclick}>{children}</button>
  </div>
);
