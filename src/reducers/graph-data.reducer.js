import { repoGraphDataCommits, userInfo } from "../data";
import { isEqual } from "../utils/comparison";

import {
  getGraphState,
  getRepoListStateForGraph,
  setGraphRepoHash,
} from "../utils/storage";
import { extractGraphPayload } from "../utils/transformers";

const graphDataActionTypes = {
  updateGraphData: "UPDATE_GRAPH_DATA",
};

export const initialGraphDataState = {
  commits: repoGraphDataCommits,
  name: "no repo name",
  description: "the repo description",
  done: true,
};

export const getInitialGraphDataState = () => {
  return initialGraphDataState;
};

export const graphDataReducer = (
  state = getInitialGraphDataState(),
  action
) => {
  let newState = { ...state, ...(action.payload && action.payload) };

  if (isEqual(state, newState)) {
    // console.log("same state");
    return state;
  }
  // setGraphRepoHash(newState.name, newState);
  // console.log("updated state : ", state, " to : ", newState);
  return newState;
};

export const __updateGraphData = (graphData) => {
  return {
    type: graphDataActionTypes.updateGraphData,
    payload: graphData,
  };
};
