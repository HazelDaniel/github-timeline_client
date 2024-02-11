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
  getInitialRepoListState,
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
    getInitialRepoListState()
  );

  const client = useApolloClient();
  const cache = client.cache;
  const allKeys = cache.extract();

  const { loading, error, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: {
      username: userData.username,
      first: REPO_LIST_PAGINATE_SIZE,
      key: listState.currentPageIndex,
    },
    skip: listState.pageInfo,
    onCompleted: (data) => {
      //this should run only once. fix it
      if (listState.pageInfo) return;
      const pageHash = JSON.parse(localStorage.getItem("glt_pageHash"));
      const listHash = JSON.parse(localStorage.getItem("glt_listHash"));
      pageHash[listState.currentPageIndex] =
        data.user.repositories.pageInfo.endCursor;
      listHash[listState.currentPageIndex] = data;
      localStorage.setItem("glt_pageHash", JSON.stringify(pageHash));
      localStorage.setItem("glt_listHash", JSON.stringify(listHash));
      listStateDispatch(
        __updatePageInfo({ pageInfo: data.user.repositories.pageInfo })
      );
      listStateDispatch(
        __updateLinkData({ repoLinkData: transformRepoList(data) })
      );
    },
  });

  const handleNextPage = useCallback(() => {
    if (!(listState.pageInfo && listState.pageInfo.hasNextPage)) return;
    const nextPageIndex = listState.currentPageIndex + 1;
    const pageHash = JSON.parse(localStorage.getItem("glt_pageHash"));
    const listHash = JSON.parse(localStorage.getItem("glt_listHash"));
    if (pageHash[nextPageIndex]) {
      const newData = listHash[nextPageIndex];
      listStateDispatch(
        __updatePageInfo({
          pageInfo: newData.user.repositories.pageInfo,
        })
      );
      listStateDispatch(__incrementPageIndex());
      listStateDispatch(
        __updateLinkData({ repoLinkData: transformRepoList(newData) })
      );
      return;
    }

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
      .then((res) => {
        const { data: newData } = res;

        const pageHash = JSON.parse(localStorage.getItem("glt_pageHash"));
        const listHash = JSON.parse(localStorage.getItem("glt_listHash"));

        pageHash[listState.currentPageIndex + 1] =
          newData.user.repositories.pageInfo.endCursor;
        listHash[listState.currentPageIndex + 1] = newData;
        localStorage.setItem("glt_pageHash", JSON.stringify(pageHash));
        localStorage.setItem("glt_listHash", JSON.stringify(listHash));

        listStateDispatch(
          __updatePageInfo({
            pageInfo: newData.user.repositories.pageInfo,
          })
        );
        listStateDispatch(__incrementPageIndex());
        listStateDispatch(
          __updateLinkData({ repoLinkData: transformRepoList(newData) })
        );
      })
      .catch((err) => {
        console.error(`failed to fetch next query. reason : ${err.message}`);
      });
  }, [fetchMore, listState.pageInfo, listState.currentPageIndex]);

  const handlePrevPage = useCallback(() => {
    if (!(listState.pageInfo && listState.pageInfo.hasPreviousPage)) return;
    const nextPageIndex = listState.currentPageIndex - 1;
    const pageHash = JSON.parse(localStorage.getItem("glt_pageHash"));
    const listHash = JSON.parse(localStorage.getItem("glt_listHash"));
    if (pageHash[nextPageIndex]) {
      const newData = listHash[nextPageIndex];
      listStateDispatch(
        __updatePageInfo({
          pageInfo: newData.user.repositories.pageInfo,
        })
      );
      listStateDispatch(__decrementPageIndex());
      listStateDispatch(
        __updateLinkData({ repoLinkData: transformRepoList(newData) })
      );
      return;
    }

    fetchMore({
      variables: {
        before: listState.pageInfo.startCursor,
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
      .then((res) => {
        const { data: newData } = res;

        const pageHash = JSON.parse(localStorage.getItem("glt_pageHash"));
        const listHash = JSON.parse(localStorage.getItem("glt_listHash"));
        pageHash[listState.currentPageIndex - 1] =
          newData.user.repositories.pageInfo.endCursor;
        listHash[listState.currentPageIndex - 1] = newData;
        localStorage.setItem("glt_pageHash", JSON.stringify(pageHash));
        localStorage.setItem("glt_listHash", JSON.stringify(listHash));

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
        console.error(`failed to fetch next query. reason : ${err.message}`);
      });
  }, [fetchMore, listState.pageInfo, listState.currentPageIndex]);

  useEffect(() => {
    if (repoList && repoHighlight)
      handleListHover({
        repoList: repoList.current,
        repoHighlight: repoHighlight.current,
      });
  }, [repoList, repoHighlight]);

  useEffect(() => {
    return () => {
      localStorage.setItem("glt_repoListState", JSON.stringify(listState));
    };
  }, [listState]);

  useEffect(() => {
    const pageHash = {};
    const listHash = {};

    if (
      localStorage.getItem("glt_pageHash") &&
      localStorage.getItem("glt_listHash")
    )
      return;
    localStorage.setItem("glt_pageHash", JSON.stringify(pageHash));
    localStorage.setItem("glt_listHash", JSON.stringify(listHash));
  }, []);

  console.log("list rendering");

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
            onClick={() => {
              if (
                (listState.pageInfo && !listState.pageInfo.hasPreviousPage) ||
                loading
              )
                return;
              handlePrevPage();
            }}
            disabled={!listState?.pageInfo?.hasPreviousPage || loading}
            className={loading ? "blurred" : "not-blurred"}
          >
            previous <span>{"\u2190"}</span>
          </button>
        </div>
        <div className="right">
          <button
            onClick={() => {
              if (
                (listState.pageInfo && !listState.pageInfo.hasNextPage) ||
                loading
              ) {
                return;
              }
              handleNextPage();
            }}
            disabled={!listState?.pageInfo?.hasNextPage || loading}
            className={loading ? "blurred" : "not-blurred"}
          >
            <span>{"\u2192"}</span>next
          </button>
        </div>
      </div>
    </>
  );
};
