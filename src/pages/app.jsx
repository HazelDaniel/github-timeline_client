import { AppPageStyled } from "./app.styles";

export const AppPage = () => {
  return (
    <AppPageStyled className="repo-page-body">
      <aside className="repositories-tab closed">
        <p className="repositories-tab-title">
          REPOSITORIES
          <span>
            <svg>
              <use xlinkHref="#repository"></use>
            </svg>
          </span>
        </p>
        <div className="repository-wrapper">
          <ul className="repositories">
            <div className="repo-highlight"></div>
            <li data-pos="0">
              <span className="repo-line"></span>
              <p className="repo-name">UNIQUE REPO</p>
              <span className="repo-time">10:00 am</span>
              <span className="repo-side-caret"></span>
            </li>
            <li data-pos="1">
              <span className="repo-line"></span>
              <p className="repo-name">UNIQUE REPO</p>
              <span className="repo-time">10:00 am</span>
              <span className="repo-side-caret"></span>
            </li>
            <li data-pos="2">
              <span className="repo-line"></span>
              <p className="repo-name">UNIQUE REPO</p>
              <span className="repo-time">10:00 am</span>
              <span className="repo-side-caret"></span>
            </li>
            <li data-pos="3">
              <span className="repo-line"></span>
              <p className="repo-name">UNIQUE REPO</p>
              <span className="repo-time">10:00 am</span>
              <span className="repo-side-caret"></span>
            </li>
            <li data-pos="4">
              <span className="repo-line"></span>
              <p className="repo-name">UNIQUE REPO</p>
              <span className="repo-time">10:00 am</span>
              <span className="repo-side-caret"></span>
            </li>
          </ul>
          <div className="repo-toggler">
            <span>
              <span>&rightarrow;</span>
            </span>
          </div>
        </div>

        <div className="repo-nav-cta">
          <div className="left">
            <button>
              previous <span>&leftarrow;</span>
            </button>
          </div>
          <div className="right">
            <button>
              <span>&rightarrow;</span>next
            </button>
          </div>
        </div>
      </aside>
      <section className="repo-section">
        <div className="top">
          <div className="z-bg"></div>

          <div className="repo-board">
            <div className="code-link-board">
              <img
                src="icons/dashed-rainbow.svg"
                alt="a dashed rectangle with varying background colors"
                loading="lazy"
              />
              <span>
                <svg>
                  <use xlinkHref="#code"></use>
                </svg>
              </span>
              <ul>
                <li>
                  <a href="#" className="active">
                    HTTPS
                  </a>
                </li>
                <li>
                  <a href="#">SSH</a>
                </li>
              </ul>
              <div className="code-link-div">
                <p>
                  git@github.com/UserName/RepoName.git
                  <span>
                    <svg>
                      <use xlinkHref="#copy"></use>
                    </svg>
                  </span>
                </p>
                <h3>Use Git or checkout with SVN using the web URL.</h3>
              </div>
            </div>
            <div className="code-info-board">
              <ul>
                <li>
                  <p>NAME</p>
                  <h3>
                    <span>&rightarrow;</span> Unique Repo
                  </h3>
                </li>
                <li>
                  <p>Languages</p>
                  <h3>
                    <span>&rightarrow;</span>Python, Javascript, C
                  </h3>
                </li>
              </ul>
            </div>
          </div>
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
                <a href="#"> view commit graph </a>
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
            <ul className="stat-nav">
              <li style={{ "--pos": 3 }}>
                latest Commit <span></span>
              </li>
              <li style={{ "--pos": 2 }}>
                latest Commit <span></span>
              </li>
              <li style={{ "--pos": 1 }}>
                latest Commit <span></span>
              </li>
              <li style={{ "--pos": 0 }}>
                latest Commit <span></span>
              </li>
            </ul>
          </div>
          <div className="stat-section">
            <p className="stat-section-title">LATEST COMMIT</p>
            <div className="stat-left">
              <ul>
                <li>
                  <button>created at</button>
                </li>
                <li>
                  <button>updated at</button>
                </li>
              </ul>
            </div>
            <div className="stat-separator first">
              <span>
                <span></span>
              </span>
            </div>
            <div className="stat-right">
              <div className="stat-popup">
                <div className="left">
                  <p>01</p>
                </div>
                <div className="right">
                  <p>thur</p>
                  <h2>october 2024</h2>
                  <h4>10:00</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-section">
            <p className="stat-section-title middle">TOP CONTRIBUTORS</p>
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
            <p className="stat-section-title middle">LICENSE</p>
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
