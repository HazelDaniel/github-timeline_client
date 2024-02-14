import { repoGraphDataCommits } from "../data";
import { isEqual } from "../utils/comparison";

import { getGraphState, persistGraphState } from "../utils/storage";

const graphDataActionTypes = {
  updateGraphData: "UPDATE_GRAPH_DATA",
};

export const initialGraphDataState = {
  commits: repoGraphDataCommits,
};

export const getInitialGraphDataState = () => {
  const {storedGraphState} = getGraphState();

  return storedGraphState ? storedGraphState : initialGraphDataState;
};

export const graphDataReducer = (state = getInitialGraphDataState(), action) => {
  let newState = { ...state, ...(action.payload && action.payload) };

    if (isEqual(state, newState)) {
      console.log("same state");
      return state;
    }
    persistGraphState(newState);
    return newState;
};

export const __updateGraphData = (graphData) => {
  return {
    type: graphDataActionTypes.updateGraphData,
    payload: graphData,
  };
};
