import { deepEqual, shallowEqual } from "../utils/comparison";

const GraphActionTypes = {
  setGraphType: "SET_GRAPH_TYPE",
  setBarType: "SET_BAR_TYPE",
  setLineType: "SET_LINE_TYPE",
};

export const initialGraphState = {
  graphType: "lines",
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

export const graphTypeReducer = (state = initialGraphState, action) => {
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
