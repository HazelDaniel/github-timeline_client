import { GraphStyled } from "./graph.styles";
import { GraphCta } from "../components/graph-cta";
import { GraphCtx } from "../context-components/graph.context";

export const Graph = () => {

  return (
    <GraphStyled className="graph-section">
      <div className="graph-section-top">

       <GraphCtx/> 
      <GraphCta/>
       
      </div>

      <div className="graph-section-bottom">
        <div className="gsb-left">
          <div className="graph-contributors-div">
            <p>weekly contributors</p>
            <div className="contributors-list">
              <ul>
                <li>
                  <span></span>
                  <img
                    src="images/dev1.jpg"
                    alt="github profile picture of a software engineer"
                    loading="lazy"
                  />
                  <p>
                    This is the Bio of some random techie, this is another Bio
                    of the same techie. keep going on and on
                  </p>
                </li>
                <li>
                  <span></span>
                  <img
                    src="images/dev1.jpg"
                    alt="github profile picture of a software engineer"
                    loading="lazy"
                  />
                  <p>
                    This is the Bio of some random techie, this is another Bio
                    of the same techie. keep going on and on
                  </p>
                </li>
                <li>
                  <span></span>
                  <img
                    src="images/dev1.jpg"
                    alt="github profile picture of a software engineer"
                    loading="lazy"
                  />
                  <p>
                    This is the Bio of some random techie, this is another Bio
                    of the same techie. keep going on and on
                  </p>
                </li>
                <li>
                  <span></span>
                  <img
                    src="images/dev1.jpg"
                    alt="github profile picture of a software engineer"
                    loading="lazy"
                  />
                  <p>
                    This is the Bio of some random techie, this is another Bio
                    of the same techie. keep going on and on
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

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

      <span className="floater">
        <span></span>
      </span>
    </GraphStyled>
  );
};
