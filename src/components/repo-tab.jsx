import { useState } from "react";
import { RepoList } from "./repo-list";
import { RepoTabStyled } from "./repo-tab.styles";

export const RepoTab = () => {
  const [closed, toggleClosed] = useState(true);

  return (
    <RepoTabStyled className={`repositories-tab${closed ? " closed" : ""}`}>
      <p className="repositories-tab-title">
        REPOSITORIES
        <span>
          <svg>
            <use xlinkHref="#repository"></use>
          </svg>
        </span>
      </p>
      <div className="repository-wrapper">
        <RepoList />

        <div
          className="repo-toggler"
          onClick={() => {
            if (closed) toggleClosed(false);
            else toggleClosed(true);
          }}
        >
          <span>
            <span>{"\u2192"}</span>
          </span>
        </div>
      </div>

      <div className="repo-nav-cta">
        <div className="left">
          <button>
            previous <span>{"\u2190"}</span>
          </button>
        </div>
        <div className="right">
          <button>
            <span>{"\u2192"}</span>next
          </button>
        </div>
      </div>
    </RepoTabStyled>
  );
};
