import { CommitSignpost } from "../components/commit-signpost";
import { RepoBoard } from "../components/repo-board";
import { AppPageStyled } from "./app.styles";

import { repoBoardData } from "../data";
import { Link } from "react-router-dom";
import { RepoTab } from "../components/repo-tab";
import { StatNav } from "../components/stat-nav";

export const AppPage = () => {
  return (
    <AppPageStyled className="repo-page-body">
      <RepoTab />

      <section className="repo-section">
        <div className="top">
          <div className="z-bg"></div>

          <RepoBoard {...repoBoardData} />

          <div className="repo-author-div">
            <div className="repo-author-image-div">
              <img
                src="images/dev1.jpg"
                alt="the github profile picture of a software engineer"
                loading="lazy"
              />
              <h4>@PaulPeterson</h4>
            </div>
            <div className="repo-author-text-area">
              <p className="repo-author-text">
                I am a student of alx studying Software engineering at ALX. I
                have passion for games, networking and problem solving
              </p>
              <h4 className="repo-author-name">Peterson Paul</h4>
            </div>
          </div>
          <span className="floater">
            <span></span>
          </span>
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
                  <span>10</span> commits
                </p>
              </div>
              <div className="stat">
                <svg>
                  <use xlinkHref="#people"></use>
                </svg>
                <p>
                  <span>10</span> commits
                </p>
              </div>
              <div className="stat">
                <svg id="fork-svg">
                  <use xlinkHref="#fork"></use>
                </svg>
                <p>
                  <span>10</span> commits
                </p>
              </div>
            </div>
          </div>
        </div>

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
                    <p>This is the Bio of some random techie</p>
                  </li>
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
              <p className="license-text">GNU PUBLIC LICENSE</p>
            </div>
          </div>
          <span className="floater">
            <span></span>
          </span>
        </div>
      </section>
    </AppPageStyled>
  );
};
