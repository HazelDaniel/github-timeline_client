import { userInfo } from "../data";
import { isEqual, shallowEqual } from "../utils/comparison";
import { getRepoListStateForGraph } from "../utils/storage";
import { extractGraphPayload } from "../utils/transformers";

const GraphActionTypes = {
  setGraphType: "SET_GRAPH_TYPE",
  setBarType: "SET_BAR_TYPE",
  setLineType: "SET_LINE_TYPE",
  setDateInterval: "SET_DATE_INTERVAL",
};

export const initialGraphTypeState = {
  graphType: "lines",
};

export const getInitialGraphNavState = () => {
  const { data } = getRepoListStateForGraph();
  const userName = userInfo.username;
  const payLoad = extractGraphPayload(userName, data);

  const res = { range: payLoad.dateRange, direction: payLoad.direction };
  return res;
};

const changedGraphType = (state) => {
  switch (state.graphType) {
    case "lines":
      return {
        graphType: "bars",
      };
    case "bars":
      return {
        graphType: "lines",
      };
  }
};

const changeGraphType = (state) => {
  return {
    ...state,
    ...changedGraphType(state),
  };
};

const setBarType = (state) => {
  return {
    ...state,
    graphType: "bars",
  };
};

const setLineType = (state) => {
  return {
    ...state,
    graphType: "lines",
  };
};

export const graphTypeReducer = (state = initialGraphTypeState, action) => {
  switch (action.type) {
    case GraphActionTypes.setGraphType:
      return changeGraphType(state);
    case GraphActionTypes.setBarType:
      if (!shallowEqual(state, setBarType(state))) return setBarType(state);
      else return state;
    case GraphActionTypes.setLineType:
      if (!shallowEqual(state, setLineType(state))) {
        return setLineType(state);
      } else return state;
    default:
      return state;
  }
};

export const graphNavReducer = (state = getInitialGraphNavState(), action) => {
  const newState = { ...state, ...(action.payload && action.payload) };

  if (isEqual(state, newState)) {
    // console.log("same state");
    return state;
  }
  return newState;
};

export const __changeGraphType = () => {
  return {
    type: GraphActionTypes.setGraphType,
  };
};

export const __setBarType = () => {
  return {
    type: GraphActionTypes.setBarType,
  };
};

export const __setLineType = () => {
  return {
    type: GraphActionTypes.setLineType,
  };
};

export const __setDateInterval = (dateInterval) => {
  return {
    type: GraphActionTypes.setDateInterval,
    payload: dateInterval,
  };
};
