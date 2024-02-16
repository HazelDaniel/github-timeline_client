import { Link, useLocation } from "react-router-dom";
import { RepoBoardStyled } from "./repo-board.styles";
import { useContext, useRef } from "react";
import {
  repoBoardContext,
  repoOwnerAndStatContext,
} from "../contexts/repo-data.context";

const handleLinkCopy = ({ source: { current: element } }) => {
  const text = element.textContent;
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  tempInput.style.display = "none";
  document.body.removeChild(tempInput);
};

export const RepoBoard = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const linkType = params.get("link-type");
  const linkCopyElement = useRef(null);
  const { repoBoardState } = useContext(repoBoardContext);

  // console.log("repo board rendering");

  return (
    <RepoBoardStyled className="repo-board">
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
            <Link
              to="/app?link-type=https"
              className={
                linkType === "https" ||
                (!linkType && repoBoardState.defaultLink === "https")
                  ? "active"
                  : ""
              }
            >
              HTTPS
            </Link>
          </li>
          <li>
            <Link
              to="/app?link-type=ssh"
              className={
                linkType === "ssh" ||
                (!linkType && repoBoardState.defaultLink === "ssh")
                  ? "active"
                  : ""
              }
            >
              SSH
            </Link>
          </li>
        </ul>
        <div className="code-link-div">
          <p ref={linkCopyElement}>
            {linkType === "ssh" ||
            (!linkType && repoBoardState.defaultLink === "ssh")
              ? repoBoardState.SSHLink
              : repoBoardState.HTTPSLink}
            <span
              onClick={() => {
                handleLinkCopy({ source: linkCopyElement });
              }}
            >
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
              <span>{"\u2192"}</span> {repoBoardState.name}
            </h3>
          </li>
          <li>
            <p>Languages</p>
            <h3>
              <span>{"\u2192"}</span>
              {repoBoardState.languages.join(", ") || "----"}
            </h3>
          </li>
        </ul>
      </div>
    </RepoBoardStyled>
  );
};
