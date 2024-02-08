import { useEffect, useRef } from "react";
import { RepoListStyled } from "./repo-list.styles";

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
    </RepoListStyled>
  );
};
