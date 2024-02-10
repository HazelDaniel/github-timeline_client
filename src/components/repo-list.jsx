import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { RepoListStyled } from "./repo-list.styles";

import { RepoLink } from "./repo-link";

import { gql, useApolloClient, useQuery } from "@apollo/client";

//DATA
import { REPO_LIST_PAGINATE_SIZE, userInfo } from "../data";
import { transformRepoList } from "../utils/transformers";
import { userContext } from "../contexts/user.context";
import { repoLinkData as repoLinkDataLocal } from "../data";

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
  query GetRepositories(
    $username: String!
    $first: Int!
    $after: String
    $before: String
  ) {
    user(login: $username) {
      repositories(first: $first, after: $after, before: $before) {
        nodes {
          name
          updatedAt
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

export const RepoList = ({ closed, toggleClosed }) => {
  const repoList = useRef(null);
  const repoHighlight = useRef(null);
  let { userState } = useContext(userContext);
  const [pageInfo, setPageInfo] = useState(null);
  const [_, setCurrentPage] = useState(1);
  const [repoLinkData, setRepoLinkData] = useState(repoLinkDataLocal);
  const client = useApolloClient();
  const cache = client.cache;
  const allKeys = cache.extract();

  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: {
      username: userState?.username,
      first: REPO_LIST_PAGINATE_SIZE,
    },
    skip: !userState.username,
    onCompleted: (data) => {
      setPageInfo(data.user.repositories.pageInfo);
      setRepoLinkData(transformRepoList(data));
    },
  });

  const handleNextPage = useCallback(() => {
    if (pageInfo && pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: pageInfo.endCursor,
        },
        fetchPolicy: 'cache-and-network',
      }).then((newData) => {
        setPageInfo(newData.data.user.repositories.pageInfo);
        setCurrentPage((prevPage) => prevPage + 1);
        setRepoLinkData(transformRepoList(newData.data));
      });
    }
  }, [fetchMore, pageInfo]);

  const handlePrevPage = useCallback(() => {
    if (pageInfo && pageInfo.hasPreviousPage) {
      fetchMore({
        variables: {
          before: pageInfo.startCursor,
        },
        fetchPolicy: 'cache-and-network',
      }).then((newData) => {
        setPageInfo(newData.data.user.repositories.pageInfo);
        setCurrentPage((prevPage) => prevPage - 1);
        setRepoLinkData(transformRepoList(newData.data));
      });
    }
  }, [fetchMore, pageInfo]);

  useEffect(() => {
    if (repoList && repoHighlight)
      handleListHover({
        repoList: repoList.current,
        repoHighlight: repoHighlight.current,
      });
  }, [repoList, repoHighlight]);

  console.log("list rendering");
  Object.keys(allKeys).forEach((key) => {
    const data = cache.extract()[key];
    console.log('Cached data for query:', key, data);
  });



  return (
    <>
      <div className="repository-wrapper">
        <RepoListStyled className="repositories" ref={repoList}>
          <div className="repo-highlight" ref={repoHighlight}></div>
          {repoLinkData.map((el, i) => {
            return <RepoLink key={i} position={i} data={el} />;
          })}
        </RepoListStyled>

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
          <button
            onClick={handlePrevPage}
            disabled={!pageInfo || !pageInfo.hasNextPage}
          >
            previous <span>{"\u2190"}</span>
          </button>
        </div>
        <div className="right">
          <button
            onClick={handleNextPage}
            disabled={!pageInfo || !pageInfo.hasNextPage}
          >
            <span>{"\u2192"}</span>next
          </button>
        </div>
      </div>
    </>
  );
};
