import { useCallback, useEffect, useReducer, useRef } from "react";
import { RepoListStyled } from "./repo-list.styles";

import { RepoLink } from "./repo-link";

import { gql, useApolloClient, useQuery } from "@apollo/client";

//DATA
import { REPO_LIST_PAGINATE_SIZE } from "../data";
import { transformRepoList } from "../utils/transformers";
import { useLoaderData } from "react-router-dom";
import {
  __decrementPageIndex,
  __incrementPageIndex,
  __updateLinkData,
  __updatePageInfo,
  initialRepoListState,
  repoListReducer,
} from "../reducers/repo-list.reducer";

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

  const userData = useLoaderData();

  const [listState, listStateDispatch] = useReducer(
    repoListReducer,
    initialRepoListState
  );

  const client = useApolloClient();
  const cache = client.cache;
  const allKeys = cache.extract();

  const { loading, error, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: {
      username: userData?.username,
      first: REPO_LIST_PAGINATE_SIZE,
    },
    skip: !userData.username,
    onCompleted: (data) => {
      console.log("done fetching data");
      listStateDispatch(
        __updatePageInfo({ pageInfo: data.user.repositories.pageInfo })
      );
      listStateDispatch(
        __updateLinkData({ repoLinkData: transformRepoList(data) })
      );
    },
  });

  const handleNextPage = useCallback(() => {
    if (listState.pageInfo && listState.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: listState.pageInfo.endCursor,
        },
        fetchPolicy: "cache-and-network",
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const {
            repositories: { nodes, pageInfo: newPageInfo },
          } = fetchMoreResult.user;
          return {
            user: {
              ...prev.user,
              repositories: {
                ...prev.user.repositories,
                nodes: [...prev.user.repositories.nodes, ...nodes],
                pageInfo: newPageInfo,
              },
            },
          };
        },
      })
        .then((newData) => {
          listStateDispatch(
            __updatePageInfo({
              pageInfo: newData.data.user.repositories.pageInfo,
            })
          );
          listStateDispatch(__incrementPageIndex());
          listStateDispatch(
            __updateLinkData({ repoLinkData: transformRepoList(newData.data) })
          );
        })
        .catch((err) => {
          console.error(`failed to fetch next query. reason : ${err.message}`);
        });
    }
  }, [fetchMore, listState.pageInfo]);

  const handlePrevPage = useCallback(() => {
    if (listState.pageInfo && listState.pageInfo.hasPreviousPage) {
      fetchMore({
        variables: {
          before: pageInfo.startCursor,
        },
        fetchPolicy: "cache-and-network",
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const {
            repositories: { nodes, pageInfo: newPageInfo },
          } = fetchMoreResult.user;
          return {
            user: {
              ...prev.user,
              repositories: {
                ...prev.user.repositories,
                nodes: [...nodes, ...prev.user.repositories.nodes],
                pageInfo: newPageInfo,
              },
            },
          };
        },
      })
        .then((newData) => {
          listStateDispatch(
            __updatePageInfo({
              pageInfo: newData.data.user.repositories.pageInfo,
            })
          );
          listStateDispatch(__decrementPageIndex());
          listStateDispatch(
            __updateLinkData({ repoLinkData: transformRepoList(newData.data) })
          );
        })
        .catch((err) => {
          console.error(
            `failed to fetch previous query. reason : ${err.message}`
          );
        });
    }
  }, [fetchMore, listState.pageInfo]);

  useEffect(() => {
    if (repoList && repoHighlight)
      handleListHover({
        repoList: repoList.current,
        repoHighlight: repoHighlight.current,
      });
  }, [repoList, repoHighlight]);

  console.log("list rendering");
  console.log("current page index ", listState.currentPageIndex);
  Object.keys(allKeys).forEach((key) => {
    let data = cache.extract()[key];
    let keyUser = `user({"login":"${userData.username}"})`;
    let keyRepo = `repositories({"first":${REPO_LIST_PAGINATE_SIZE}})`;
    data = data[keyUser][keyRepo];
    data = data.nodes;
    console.log(data);
  });

  if (loading) console.log("loading ...");
  else console.log("not loading");
  console.log("====liststate===");
  console.log(listState);
  console.log("====liststate===");

  return (
    <>
      <div className="repository-wrapper">
        <RepoListStyled className="repositories" ref={repoList}>
          <div className="repo-highlight" ref={repoHighlight}></div>
          {listState.repoLinkData.map((el, i) => {
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
            disabled={
              !listState.pageInfo || !listState.pageInfo.hasNextPage || loading
            }
            className={loading ? "blurred" : "not-blurred"}
          >
            previous <span>{"\u2190"}</span>
          </button>
        </div>
        <div className="right">
          <button
            onClick={handleNextPage}
            disabled={
              !listState.pageInfo || !listState.pageInfo.hasNextPage || loading
            }
            className={loading ? "blurred" : "not-blurred"}
          >
            <span>{"\u2192"}</span>next
          </button>
        </div>
      </div>
    </>
  );
};
