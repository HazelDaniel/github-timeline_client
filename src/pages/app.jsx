import { RepoBoard } from "../components/repo-board";
import { AppPageStyled } from "./app.styles";

import { getGitHubUsername, repoLinkTypeData, userInfo } from "../data";
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
  if (userInfo.username) return json(userInfo);
  const username = await getGitHubUsername();
  userInfo.username = username;
  const res = json(userInfo);
  return res;
};
