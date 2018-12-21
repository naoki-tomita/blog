import { h, Component } from "hyperapp";
import { State, Actions } from "../../App";
import { ArticleItem, Article as SingleArticle } from "./Article";
import { Link, Route } from "@hyperapp/router";

export interface Article {
  id: string;
  title: string;
  body: string;
  timestamp: number;
}

export const Articles: Component<{}, State, Actions> = () => ({ articles }) => {
  return (
    <div>
      <Route
        path="/articles"
        render={() => (
          <div>
            {articles.map(article => (
              <ArticleItem {...article} />
            ))}
          </div>
        )}
      />
      <Route<{ id: string }>
        path={`/articles/:id`}
        render={({ match }) => <SingleArticle id={match.params.id} />}
      />
    </div>
  );
};

export const ArticlesLink: Component = () => (
  <Link to="/articles">articles</Link>
);
