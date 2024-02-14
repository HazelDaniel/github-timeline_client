import { useMemo, useReducer } from "react";
import {
  getLastGraphDateRange,
  getRepoListStateForGraph,
} from "../utils/storage";
import { userInfo } from "../data";
import { Graph } from "../pages/graph";
import { getInitialGraphDataState, graphDataReducer } from "../reducers/graph-data.reducer";
import { GraphDataProvider } from "../contexts/graph-data.context";
import { extractGraphPayload } from "../utils/transformers";


export const GraphWrapper = () => {
  const [graphDataState, graphDataDispatch] = useReducer(graphDataReducer, getInitialGraphDataState());


  const graphDataValue = useMemo(
    () => ({ graphDataState, graphDataDispatch }),
    [graphDataState]
  );

  const { data } = getRepoListStateForGraph();
  const userName = userInfo.username;
  const payLoad = extractGraphPayload(userName, data); // WE'LL BE MAKING REQUEST WITH THIS PAYLOAD SHORTLY

  return (
    <GraphDataProvider value={graphDataValue}>
      <Graph />
    </GraphDataProvider>
  );
};
