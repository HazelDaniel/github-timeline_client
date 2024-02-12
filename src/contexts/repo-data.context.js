import { createContext } from "react";
import {
  getInitialRepoBoardState,
  getInitialRepoOwnerAndStatState,
  getInitialRepoBottomState,
} from "../reducers/repo-data.reducer";

//CONTEXTS
export const repoBoardContext = createContext(getInitialRepoBoardState());
export const repoOwnerAndStatContext = createContext(
  getInitialRepoOwnerAndStatState()
);
export const repoBottomContext = createContext(getInitialRepoBottomState());

// CONTEXT PROVIDERS
export const RepoBoardProvider = repoBoardContext.Provider;
export const RepoOwnerAndStatProvider = repoOwnerAndStatContext.Provider;
export const RepoBottomProvider = repoBottomContext.Provider;
