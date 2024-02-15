import { RepoBoard } from "../components/repo-board";
import { AppPageStyled } from "./app.styles";

import { repoLinkTypeData, userInfo } from "../data";
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
  if (!codeParam && !token) return res;
  const { username } = await getGitHubUsername();

  if (!token) {
    let codeRes = await fetch(
      "http://127.0.0.1:4000/get_token?code=" + codeParam
    );
    let data = await codeRes.json();
    if (data.access_token) {
      userInfo.token = data.access_token;
      userInfo.username = username;
      setAccessToken(data.access_token);
      return json(userInfo);
    } else {
      console.error(
        "something wrong with the connection or credentials expired, please try again!"
      );
      return json(userInfo);
    }
  }
  userInfo.username = username;
  userInfo.token = getAccessToken().token;
  return json(userInfo);
};
