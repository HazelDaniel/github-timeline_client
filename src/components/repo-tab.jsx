import { useState } from "react";
import { RepoList } from "./repo-list";
import { RepoTabStyled } from "./repo-tab.styles";

export const RepoTab = () => {
  const [closed, toggleClosed] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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

      <RepoList closed={closed} toggleClosed={toggleClosed} />
    </RepoTabStyled>
  );
};
