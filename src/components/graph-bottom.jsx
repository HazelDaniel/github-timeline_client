import { memo } from "react";
import { GraphContrib } from "./graph-contrib";

export const GraphBottom = memo(function GraphBottom()  {
  return (
      <div className="graph-section-bottom">
        <GraphContrib/>


        <div className="stat-separator first">
          <span>
            <span></span>
          </span>
        </div>

        <div className="gsb-right">
          <div className="repo-description-div">
            <p>DESCRIPTION</p>
            <div className="repo-description">
              This repository is a test repository that i set up to make sure
              that i can push my code to github
            </div>
          </div>
        </div>
      </div>
  );
});