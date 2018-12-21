import { h, app, View } from "hyperapp";
import { state, actions, State, Actions, firebaseApp } from "./App";
import { Auth } from "./Components/Auth";
import { Articles, ArticlesLink } from "./Components/Articles";
import { Editor } from "./Components/Editor";
import { location, Route } from "@hyperapp/router";
import { EditorLink } from "./Components/Editor";

const view: View<State, Actions> = () => {
  return (
    <div>
      <Auth />
      <Route
        path="/articles"
        parent
        render={() => (
          <div>
            <EditorLink />
            <Articles />
          </div>
        )}
      />
      <Route
        path="/editor"
        render={() => (
          <div>
            <ArticlesLink />
            <Editor />
          </div>
        )}
      />
    </div>
  );
};

const main = app(state, actions, view, document.body);
const unsubscribe = firebaseApp
  .auth()
  .onAuthStateChanged(
    user => user && (main.onLoginSuccess(user), unsubscribe()),
    error => main.onLoginFailed(error),
  );
firebaseApp
  .firestore()
  .collection("articles")
  .orderBy("timestamp")
  .onSnapshot(snapshot =>
    main.onUpdateArticles(
      snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    ),
  );
location.subscribe(main.location);
main.location.go("/articles");
