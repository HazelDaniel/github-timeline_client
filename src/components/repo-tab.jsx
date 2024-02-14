import { useState } from "react";
import { RepoTabStyled } from "./repo-tab.styles";
import { RepoListWrapper } from "./repo-list-wrapper";

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

      <RepoListWrapper closed={closed} toggleClosed={toggleClosed} />
    </RepoTabStyled>
  );
};
