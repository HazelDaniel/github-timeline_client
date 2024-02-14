import { useContext, useEffect } from "react";
import { AppNavButton } from "./app-nav-button";
import { graphNavContext } from "../contexts/graph.context";
import {
  generateGitDateRangeNext,
  generateGitDateRangePrev,
} from "../utils/generators";
import {
  getRepoListStateForGraph,
  setLastGraphDateRange,
} from "../utils/storage";
import { __setDateInterval } from "../reducers/graph.reducer";
import { userInfo } from "../data";
import { extractGraphPayload } from "../utils/transformers";

export const GraphCta = () => {
  const { graphNavState, graphNavDispatch } = useContext(graphNavContext);
  const LowerBoundDate = new Date();
  const today = new Date();
  LowerBoundDate.setFullYear(LowerBoundDate.getFullYear() - 1);
  const { data } = getRepoListStateForGraph();
  const userName = userInfo.username;
  const payLoad = extractGraphPayload(userName, data);

  const dateSequencePrev = generateGitDateRangePrev(
    graphNavState[0],
    LowerBoundDate.toISOString()
  );

  const dateSequenceNext = generateGitDateRangeNext(
    graphNavState[1],
    today.toISOString()
  );

  // console.log(graphNavState);

  return (
    <div className="graph-cta-div">
      <div className="top">
        <div className="left">
          <button
            disabled={!payLoad.repoName}
            onClick={() => {
              let { done, value } = dateSequencePrev.next();
              if (done || !value) {
                // console.log(done, value);
                return;
              }
              const { startDateString, endDateString } = value;
              setLastGraphDateRange(startDateString, endDateString);
              // console.log("<---", startDateString, "    ", endDateString);
              graphNavDispatch(
                __setDateInterval([startDateString, endDateString])
              );
            }}
          >
            previous week<span>{"\u2190"}</span>
          </button>
        </div>
        <div className="right">
          <button
            disabled={!payLoad.repoName}
            onClick={() => {
              let { done, value } = dateSequenceNext.next();
              if (done || !value) {
                // console.log(done, value);
                return;
              }
              const { startDateString, endDateString } = value;
              setLastGraphDateRange(startDateString, endDateString);
              // console.log("--->", startDateString, "    ", endDateString);
              graphNavDispatch(
                __setDateInterval([startDateString, endDateString])
              );
            }}
          >
            <span>{"\u2192"}</span>next week
          </button>
        </div>
      </div>
      <div className="bottom">
        <div>
          <AppNavButton to={-1} data={{}} text={"back to repository"} />
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
  );
};
