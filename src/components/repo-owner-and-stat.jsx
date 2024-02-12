import { useContext } from "react";
import { Link } from "react-router-dom";
import { repoOwnerAndStatContext } from "../contexts/repo-data.context";
import { userInfo } from "../data";

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
          <div>
            <a href="#"> view on github </a>
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
          <div>
            <Link to="/graph"> view commit graph </Link>
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
