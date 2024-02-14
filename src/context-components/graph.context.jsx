import { useMemo, useReducer } from "react";
import { GraphCanvas } from "../components/graph";
import { GraphToggler } from "../components/graph-toggler";
import { GraphTypeProvider } from "../contexts/graph.context";
import { graphTypeReducer, initialGraphTypeState } from "../reducers/graph.reducer";
import { getRepoListStateForGraph } from "../utils/storage";
import { userInfo } from "../data";
import { extractGraphPayload } from "../utils/transformers";
import { formatGraphDateString } from "../utils/conversion";

export const GraphCtx = () => {
  const { data } = getRepoListStateForGraph();
  const userName = userInfo.username;
  const {
    dateRange: [startDateString, endDateString],
  } = extractGraphPayload(userName, data);

  const [graphTypeState, graphTypeDispatch] = useReducer(
    graphTypeReducer,
    initialGraphTypeState
  );

  const graphTypeValue = useMemo(
    () => ({
      graphTypeState,
      graphTypeDispatch,
    }),
    [graphTypeState]
  );

  return (
    <GraphTypeProvider value={graphTypeValue}>
      <div className="graph-type-toggler">
        <GraphToggler />
      </div>
      <div className="graph-area">
        <p className="graph-area-title">
          Weekly Contribution Graph
          <span>
            [{formatGraphDateString(startDateString)} {"\u00A0"} to {"\u00A0"}{" "}
            {formatGraphDateString(endDateString)}]
          </span>
        </p>
        <GraphCanvas />

        <span className="floater">
          <span></span>
        </span>
      </div>
    </GraphTypeProvider>
  );
};
