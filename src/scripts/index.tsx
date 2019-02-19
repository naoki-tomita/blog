import { h, app, View } from "hyperapp";
import { state, actions, State, Actions, firebaseApp } from "./App";
import { Auth } from "./Components/Auth";
import { Articles, ArticlesLink } from "./Components/Articles";
import { Editor } from "./Components/Editor";
import { location, Route } from "@hyperapp/router";
import { EditorLink } from "./Components/Editor";
import { Container } from "./Components/Common";
import { wrap, styled } from "hyper-styled";

const WrappedAuth = wrap(Auth)`
  color: blue;
`;
const Menu = styled.div`
  display: flex;
`;
const MenuItem = styled.div`
  border-left: solid 1px #999;
  margin: 8px 0;
  padding: 0 8px;

  &:first-child {
    border-left: none;
    padding-left: 0;
  }
`;

const view: View<State, Actions> = (_, { setTitle, setBody }) => {
  return (
    <Container>
      <Menu>
        <MenuItem>
          <WrappedAuth />
        </MenuItem>
        <MenuItem>
          <EditorLink />
        </MenuItem>
        <MenuItem>
          <ArticlesLink />
        </MenuItem>
      </Menu>
      <Route path="/articles" parent render={() => <Articles />} />
      <Route
        path="/edit"
        render={() => <Editor oncreate={() => (setTitle(""), setBody(""))} />}
      />
    </Container>
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
  .orderBy("timestamp", "desc")
  .onSnapshot(snapshot =>
    main.onUpdateArticles(
      snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    ),
  );
location.subscribe(main.location);
main.location.go("/articles");
