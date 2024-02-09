import { Link, useNavigate } from "react-router-dom";
import { GraphStyled } from "./graph.styles";
import { GraphCanvas } from "../components/graph";
import { GraphToggler } from "../components/graph-toggler";
import { useMemo, useReducer } from "react";
import { initialGraphState, graphTypeReducer } from "../reducers/graph.reducer";
import { GraphTypeProvider } from "../contexts/graph.context";

export const Graph = () => {
  const navigate = useNavigate();
  const [graphTypeState, graphTypeDispatch] = useReducer(graphTypeReducer, initialGraphState);

  const graphTypeValue = useMemo(()=>({
    graphTypeState, graphTypeDispatch

    }), [graphTypeState]);

  return (
    <GraphStyled className="graph-section">
      <div className="graph-section-top">
        <GraphTypeProvider value={graphTypeValue}>

        <div className="graph-type-toggler">
          <GraphToggler />
        </div>
        <div className="graph-area">
          <p className="graph-area-title">
            Weekly Contribution Graph
            <span>
              [12-09-04 {"\u0020\u0020"} to {"\u0020\u0020"} 03-02-04]
            </span>
          </p>
          <GraphCanvas />

          <span className="floater">
            <span></span>
          </span>
        </div>
        </GraphTypeProvider>

        <div className="graph-cta-div">
          <div className="top">
            <div className="left">
              <button>
                previous week<span>{"\u2190"}</span>
              </button>
            </div>
            <div className="right">
              <button>
                <span>{"\u2192"}</span>next week
              </button>
            </div>
          </div>
          <div className="bottom">
            <div>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1, { replace: true });
                }}
              >
                {" "}
                back to repository{" "}
              </Link>
              <span>
                <svg
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="path-1-inside-1_90_390" fill="white">
                    <path d="M0 0H29V29H0V0Z" />
                  </mask>
                  <path
                    d="M29 0H31V-2H29V0ZM0 2H29V-2H0V2ZM27 0V29H31V0H27Z"
                    fill="#45C3AD"
                    mask="url(#path-1-inside-1_90_390)"
                  />
                  <line
                    y1="-1"
                    x2="19.4454"
                    y2="-1"
                    transform="matrix(-0.685218 0.728338 -0.820553 -0.57157 26.6486 0.674438)"
                    stroke="#45C3AD"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
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
