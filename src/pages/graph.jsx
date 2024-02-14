import { GraphStyled } from "./graph.styles";
import { GraphCta } from "../components/graph-cta";
import { GraphCtx } from "../context-components/graph.context";
import { GraphBottom } from "../components/graph-bottom";
import { useMemo, useReducer } from "react";
import { getInitialGraphNavState, graphNavReducer } from "../reducers/graph.reducer";
import { GraphNavProvider } from "../contexts/graph.context";

export const Graph = () => {

  const [graphNavState, graphNavDispatch] = useReducer(graphNavReducer, getInitialGraphNavState());

  const graphNavValue = useMemo(()=>(
    {graphNavState, graphNavDispatch}
  ));


  return (
    <GraphStyled className="graph-section">
      <div className="graph-section-top">
        <GraphNavProvider value={graphNavValue}>
          <GraphCtx />
          <GraphCta />
        </GraphNavProvider>
      </div>

      <GraphBottom />

      <span className="floater">
        <span></span>
      </span>
    </GraphStyled>
  );
};
