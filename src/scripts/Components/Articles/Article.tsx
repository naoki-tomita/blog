import { h, Component } from "hyperapp";
import { Link } from "@hyperapp/router";
import { styled } from "hyper-styled";

import { State, Actions } from "../../App";
import { ArticlesLink } from ".";

interface Attributes {
  id: string;
  title: string;
  body: string;
  timestamp: number;
}

const InlineHead = styled.h1`
  display: inline;
`;

const InlineEdit = styled.div`
  top: -12px;
  display: inline-block;
  position: relative;
  color: #000;
  margin-left: 8px;
  margin-top: 14px;
  width: 28px;
  height: 4px;
  border-radius: 2px;
  border: solid 2px currentColor;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);

  &:before {
    content: "";
    position: absolute;
    left: -24px;
    top: -2px;
    width: 0px;
    height: 0px;
    border-left: solid 10px transparent;
    border-right: solid 10px currentColor;
    border-top: solid 4px transparent;
    border-bottom: solid 4px transparent;
  }
`;

const RightJustified = styled.div`
  text-align: right;
`;

export const ArticleItem: Component<Attributes> = ({
  id,
  timestamp,
  title,
  body,
}) => (
  <div>
    <InlineHead>
      <Link to={`/articles/${id}`}>{title}</Link>
    </InlineHead>
    <Link to={`/articles/${id}/edit`}>
      <InlineEdit />
    </Link>
    <div
      oncreate={(el: Element) => (el.innerHTML = body.replace(/\n/g, "<br>"))}
    />
    <RightJustified>{new Date(timestamp).toDateString()}</RightJustified>
  </div>
);

export const Article: Component<{ id: string }, State, Actions> = ({ id }) => ({
  articles,
}) => (
  <div>
    <ArticlesLink />
    <ArticleItem {...articles.find(a => a.id === id)!} />
  </div>
);
