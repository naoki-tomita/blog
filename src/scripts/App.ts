import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
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
  id: string | null;
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
  id: null,
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
  setEditId: ActionType<State, Actions>;
  send: ActionType<State, Actions>;
  createArticle: ActionType<State, Actions>;
  updateArticle: ActionType<State, Actions>;
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
  setEditId: (id: string | null) => ({ articles }) => {
    const { title, body } = articles.find(a => a.id === id)!;
    return { id, title, body };
  },
  send: () => ({ id }, { createArticle, updateArticle }) => (
    id
      ? createArticle()
      : updateArticle(),
    { title: "", body: "" }
  ),
  createArticle: () => ({ title, body }) => (firebaseApp
    .firestore()
    .collection("articles")
    .add({ title, body, timestamp: Date.now() })),
  updateArticle: () => ({ title, body, articles, id }) => (firebaseApp
    .firestore()
    .doc(`articles/${id}`)
    .set({
      title,
      body,
      timestamp: articles.find(a => a.id === id)!.timestamp,
    })),
  location: location.actions,
};
