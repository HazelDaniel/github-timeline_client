import { useContext } from "react";
import { repoOwnerAndStatContext } from "../contexts/repo-data.context";
import { userInfo } from "../data";
import { AppNavButton } from "./app-nav-button";

export const RepoOwnerAndStat = () => {
  const { repoOwnerAndStatState } = useContext(repoOwnerAndStatContext);

  return (
    <>
      <div className="repo-author-div">
        <div className="repo-author-image-div">
          <img
            src={`${repoOwnerAndStatState.ownerAvatarUrl}`}
            alt="the github profile picture of a software engineer"
            loading="lazy"
          />
          <h4>{`@${userInfo.username}` || "no username provided"}</h4>
        </div>
        <div className="repo-author-text-area">
          <p className="repo-author-text">{repoOwnerAndStatState.ownerBio}</p>
          <h4 className="repo-author-name">
            {repoOwnerAndStatState.ownerName}
          </h4>
        </div>
      </div>

      <div className="repo-icon-stat-div">
        <div className="stat-cta-div">
          <AppNavButton to={"/"} data={{type: "dynamic"}} text={"view on github"} />

          <AppNavButton
            to={"/graph"}
            data={{ animal: "elephant" }}
            text={"view commit graph"}
          />
        </div>
        <div className="stat-div">
          <div className="stat">
            <svg>
              <use xlinkHref="#commit"></use>
            </svg>
            <p>
              <span>{repoOwnerAndStatState.commits}</span> commits
            </p>
          </div>
          <div className="stat">
            <svg>
              <use xlinkHref="#people"></use>
            </svg>
            <p>
              <span>{repoOwnerAndStatState.contributorCount}</span> contributors
            </p>
          </div>
          <div className="stat">
            <svg id="fork-svg">
              <use xlinkHref="#fork"></use>
            </svg>
            <p>
              <span>{repoOwnerAndStatState.forks}</span> forks
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
