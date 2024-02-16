import { memo, useContext } from "react";
import { CommitSignpost } from "./commit-signpost";
import { StatNav } from "./stat-nav";
import { repoBottomContext } from "../contexts/repo-data.context";
import { StatContrib } from "./stat-contrib";
import { getRepoListStateForGraph } from "../utils/storage";

export const RepoBottom = memo(function RepoBottom() {
  const { repoBottomState } = useContext(repoBottomContext);

  const { data: graphInfo } = getRepoListStateForGraph();
  console.log("repo bottom rendering");
  console.log(repoBottomState);
  console.log("graph info is : ", graphInfo);



  return (
    <div className="bottom">
      <div className="stat-nav-div">
        <StatNav />
      </div>
      <div className="stat-section">
        <p className="stat-section-title" id="latest-commit">
          LATEST COMMIT
        </p>

        <CommitSignpost />
      </div>

      <div className="stat-section">
        <p className="stat-section-title middle" id="top-contributors">
          TOP CONTRIBUTORS
        </p>
        <div className="stat-left"></div>
        <div className="stat-separator second">
          <span>
            <span></span>
          </span>
        </div>
        <div className="stat-right">
          <div className="stat-contrib-list">
            <ul>
              {repoBottomState.contributors.map((el, i) => {
                return <StatContrib {...el} key={i} />;
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="stat-section">
        <p className="stat-section-title middle" id="license">
          LICENSE
        </p>
        <div className="stat-left"></div>
        <div className="stat-separator derail third">
          <span>
            <span></span>
          </span>
        </div>
        <div className="stat-right">
          <p className="license-title-text">
            This repository is made accessible under
          </p>
          <p className="license-text">{repoBottomState.license}</p>
        </div>
      </div>

      <span className="floater">
        <span></span>
      </span>
    </div>
  );
});
