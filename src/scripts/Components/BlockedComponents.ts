import { styled } from "hyper-styled";

export const BlockedInput = styled.input<{ oncreate?: () => void }>`
  display: block;
`;

export const BlockedButton = styled.button`
  display: block;
`;

export const BlockedTextArea = styled.textarea`
  display: block;
`;
