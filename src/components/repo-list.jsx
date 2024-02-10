import { useContext, useEffect, useRef } from "react";
import { RepoListStyled } from "./repo-list.styles";

import { RepoLink } from "./repo-link";

import { gql, useQuery } from "@apollo/client";

//DATA
import { REPO_LIST_PAGINATE_SIZE } from "../data";
import { transformRepoList } from "../utils/transformers";
import { userContext } from "../contexts/user.context";

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

const GET_REPOSITORIES = gql`
  query GetRepositories($username: String!, $first: Int!) {
    user(login: $username) {
      repositories(first: $first) {
        nodes {
          name
          updatedAt
        }
      }
    }
  }
`;

export const RepoList = () => {
  const repoList = useRef(null);
  const repoHighlight = useRef(null);
  const { userState } = useContext(userContext);
  let repoLinkData = null;
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables: {
      username: userState?.username?.username,
      first: REPO_LIST_PAGINATE_SIZE,
    },
    skip: !userState.username,
  });

  console.log("and the user is ", userState.username);

  useEffect(() => {
    if (repoList && repoHighlight)
      handleListHover({
        repoList: repoList.current,
        repoHighlight: repoHighlight.current,
      });
  }, [repoList, repoHighlight]);

  if (data) {
    repoLinkData = transformRepoList(data);
  }

  return (
    <RepoListStyled className="repositories" ref={repoList}>
      <div className="repo-highlight" ref={repoHighlight}></div>
      {repoLinkData
        ? repoLinkData.map((el, i) => {
            return <RepoLink key={i} position={i} data={el} />;
          })
        : null}
    </RepoListStyled>
  );
};
