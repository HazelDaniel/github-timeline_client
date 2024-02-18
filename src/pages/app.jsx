import { RepoBoard } from "../components/repo-board";
import { AppPageStyled } from "./app.styles";

import { userInfo } from "../data";
import { getGitHubUsername } from "../utils/storage";
import { json } from "react-router-dom";
import { RepoTab } from "../components/repo-tab";
import { RepoOwnerAndStat } from "../components/repo-owner-and-stat";
import { RepoBottom } from "../components/repo-bottom";
import { useMemo, useReducer } from "react";
import {
  getInitialRepoBoardState,
  getInitialRepoBottomState,
  getInitialRepoOwnerAndStatState,
  repoBoardReducer,
  repoBottomStateReducer,
  repoOwnerAndStatReducer,
} from "../reducers/repo-data.reducer";
import {
  RepoBoardProvider,
  RepoOwnerAndStatProvider,
  RepoBottomProvider,
} from "../contexts/repo-data.context";
import { getAccessToken, setAccessToken } from "../utils/storage";
import { PROXY_URL } from "../utils/auth";

export const AppPage = () => {
  const [repoBoardState, repoBoardDispatch] = useReducer(
    repoBoardReducer,
    getInitialRepoBoardState()
  );

  const [repoOwnerAndStatState, repoOwnerAndStatDispatch] = useReducer(
    repoOwnerAndStatReducer,
    getInitialRepoOwnerAndStatState()
  );

  const [repoBottomState, repoBottomDispatch] = useReducer(
    repoBottomStateReducer,
    getInitialRepoBottomState()
  );

  const repoBoardValue = useMemo(
    () => ({
      repoBoardState,
      repoBoardDispatch,
    }),
    [repoBoardState]
  );

  const repoOwnerAndStatValue = useMemo(
    () => ({
      repoOwnerAndStatState,
      repoOwnerAndStatDispatch,
    }),
    [repoOwnerAndStatState]
  );

  const repoBottomValue = useMemo(
    () => ({
      repoBottomState,
      repoBottomDispatch,
    }),
    [repoBottomState]
  );

  console.log("app page rendering");

  return (
    <AppPageStyled className="repo-page-body">
      <RepoBoardProvider value={repoBoardValue}>
        <RepoOwnerAndStatProvider value={repoOwnerAndStatValue}>
          <RepoBottomProvider value={repoBottomValue}>
            <RepoTab />

            <section className="repo-section">
              <div className="top">
                <div className="z-bg"></div>

                <RepoBoard />
                <span className="floater">
                  <span></span>
                </span>

                <RepoOwnerAndStat />
              </div>

              <RepoBottom />
            </section>
          </RepoBottomProvider>
        </RepoOwnerAndStatProvider>
      </RepoBoardProvider>
    </AppPageStyled>
  );
};

export const appLoader = async () => {
  const queryString = window.location.search;
  const urlParam = new URLSearchParams(queryString);
  let codeParam = urlParam.get("code");
  let res = {};
  let { token } = getAccessToken();
  userInfo.error = null;
  userInfo.message = "no request was made";
  console.log("loader runnning");
  if (!codeParam && !token) return json(res);
  const { username } = await getGitHubUsername();

  // if (DEV_ENV === "test") {
  //   return json(res);
  // }

  if (!token) {
    let codeRes;
    try {
      codeRes = await fetch(`${PROXY_URL}get_token?code=` + codeParam);
      let data = await codeRes.json();
      if (data.access_token) {
        userInfo.token = data.access_token;
        userInfo.username = username;
        setAccessToken(data.access_token);
        userInfo.message = "user authenticated succesfully";
        return json(userInfo);
      } else {
        userInfo.error = {
          message:
            "something wrong with the connection or credentials expired, please try again!",
        };
        userInfo.message = null;
        return json(userInfo);
      }
    } catch (err) {
      userInfo.message = null;
      console.log("connection issues");
      let error = { message: "error making connection to the server" };
      userInfo.error = error;
      return json(userInfo);
    }
  }
  userInfo.username = username;
  userInfo.token = getAccessToken().token;
  return json(userInfo);
};
