import { memo, useContext } from "react";
import { GraphContrib } from "./graph-contrib";
import { graphNavContext } from "../contexts/graph.context";
import { extractContribInInterval } from "../utils/transformers";
import { graphDataContext } from "../contexts/graph-data.context";

export const GraphBottom = memo(function GraphBottom() {
  const { graphDataState } = useContext(graphDataContext);
  const { graphNavState } = useContext(graphNavContext);
  console.log(graphNavState);

  const weeklyContribCommits = extractContribInInterval(
    graphDataState.commits,
    ...graphNavState.range
  );

  return (
    <div className="graph-section-bottom">
      <GraphContrib commits={weeklyContribCommits} />

      <div className="stat-separator first">
        <span>
          <span></span>
        </span>
      </div>

      <div className="gsb-right">
        <div className="repo-description-div">
          <p>DESCRIPTION</p>
          <div className="repo-description">
            {graphDataState.description || "no description available"}
          </div>
        </div>
      </div>
    </div>
  );
});
