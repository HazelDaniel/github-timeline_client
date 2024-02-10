import { useMemo, useReducer } from "react";
import { GraphCanvas } from "../components/graph";
import { GraphToggler } from "../components/graph-toggler";
import { GraphTypeProvider } from "../contexts/graph.context";
import { graphTypeReducer, initialGraphState } from "../reducers/graph.reducer";

export const GraphCtx = () => {
  const [graphTypeState, graphTypeDispatch] = useReducer(
    graphTypeReducer,
    initialGraphState
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
            [12-09-04 {"\u00A0"} to {"\u00A0"} 03-02-04]
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
