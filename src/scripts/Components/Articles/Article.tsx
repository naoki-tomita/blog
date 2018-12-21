import { h, Component } from "hyperapp";
import { Link } from "@hyperapp/router";
import { State, Actions } from "../../App";
import { ArticlesLink } from ".";

interface Attributes {
  id: string;
  title: string;
  body: string;
  timestamp: number;
}

export const ArticleItem: Component<Attributes> = ({
  id,
  timestamp,
  title,
  body,
}) => (
  <div>
    <h1>
      <Link to={`/articles/${id}`}>{title}</Link>
    </h1>
    <div>{body.replace(/\n/g, "<br>")}</div>
    <div>{new Date(timestamp).toDateString()}</div>
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
