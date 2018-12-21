import { initializeApp } from "firebase";
import { ActionType } from "hyperapp";
import { Article } from "./Components/Articles";
import { LocationState, LocationActions, location } from "@hyperapp/router";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAdB1WLhd8uL5OJP-CA2t3cuzwIGgJIWY0",
  authDomain: "blog-1fbe5.firebaseapp.com",
  databaseURL: "https://blog-1fbe5.firebaseio.com",
  projectId: "blog-1fbe5",
  storageBucket: "",
  messagingSenderId: "618409773773",
});
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export interface State {
  user: firebase.User | null;
  email: string;
  password: string;
  loginFailedError: firebase.auth.Error | null;
  isShowLogin: boolean;
  articles: Article[];
  title: string;
  body: string;
  isShowEditor: boolean;
  location: LocationState;
}

export const state: State = {
  user: null,
  email: "",
  password: "",
  loginFailedError: null,
  articles: [],
  isShowLogin: false,
  title: "",
  body: "",
  isShowEditor: true,
  location: location.state,
};

export interface Actions {
  login: ActionType<State, Actions>;
  onLoginSuccess: ActionType<State, Actions>;
  onLoginFailed: ActionType<State, Actions>;
  setEmail: ActionType<State, Actions>;
  setPassword: ActionType<State, Actions>;
  onUpdateArticles: ActionType<State, Actions>;
  switchSownLogin: ActionType<State, Actions>;
  setTitle: ActionType<State, Actions>;
  setBody: ActionType<State, Actions>;
  send: ActionType<State, Actions>;
  location: LocationActions;
}

export const actions: Actions = {
  login: () => async ({ email, password }, { onLoginFailed }) => {
    try {
      await firebaseApp.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      onLoginFailed(error);
    }
  },
  onLoginSuccess: (user: firebase.User) => ({ user, loginFailedError: null }),
  onLoginFailed: (loginFailedError: firebase.auth.Error) => ({
    loginFailedError,
  }),
  setEmail: (email: string) => ({ email }),
  setPassword: (password: string) => ({ password }),
  onUpdateArticles: (articles: Article[]) => ({ articles }),
  switchSownLogin: () => ({ isShowLogin, user }) => ({
    isShowLogin: !isShowLogin && !user,
  }),
  setTitle: (title: string) => ({ title }),
  setBody: (body: string) => ({ body }),
  send: () => ({ title, body }) => (
    firebaseApp
      .firestore()
      .collection("articles")
      .add({ title, body, timestamp: Date.now() }),
    { title: "", body: "" }
  ),
  location: location.actions,
};
