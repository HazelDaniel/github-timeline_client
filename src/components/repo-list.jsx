import { useEffect, useRef } from "react";
import { RepoListStyled } from "./repo-list.styles";

import { repoLinkData } from "../data";
import { RepoLink } from "./repo-link";

const handleListHover = ({ repoHighlight, repoList }) => {
  repoList.addEventListener("mouseover", (e) => {
    if (!e.target.dataset.pos) return;
    repoHighlight.classList.remove("defunct");
    let position = +e.target.dataset.pos;
    repoHighlight.style.top = `${4 * position}rem`;
  });

  repoList.addEventListener("mouseleave", () => {
    repoHighlight.classList.add("defunct");
  });
};

export const RepoList = () => {
  const repoList = useRef(null);
  const repoHighlight = useRef(null);

  useEffect(() => {
    if (repoList && repoHighlight)
      handleListHover({
        repoList: repoList.current,
        repoHighlight: repoHighlight.current,
      });
  }, [repoList, repoHighlight]);

  return (
    <RepoListStyled className="repositories" ref={repoList}>
      <div className="repo-highlight" ref={repoHighlight}></div>
      {repoLinkData.map((el, i) => {
        return <RepoLink key={i} position={i} data={el} />;
      })}
    </RepoListStyled>
  );
};
