import { memo, useCallback, useEffect, useReducer, useRef } from "react";
import { RepoListStyled } from "./repo-list.styles";

import { RepoLink } from "./repo-link";

import { gql, useQuery } from "@apollo/client";

//DATA AND DATA TRANSFORMATION
import { DEV_ENV, REPO_LIST_PAGINATE_SIZE } from "../data";
import { transformRepoList } from "../utils/transformers";

//STATE
import {
  __decrementPageIndex,
  __incrementPageIndex,
  __updateLinkData,
  __updatePageInfo,
  getInitialRepoListState,
  repoListReducer,
} from "../reducers/repo-data.reducer";

//STORAGE
import {
  getRepoListAndPageIndex,
  initRepoListAndPageIndexPersist,
  setRepoListAndPageIndex,
} from "../utils/storage";

const handleListHover = ({ repoHighlight, repoList }) => {
  if (window.innerWidth < 600) {
    repoList.addEventListener("click", (e) => {
      if (!e.target.dataset.pos && !e.target.closest("li")) return;
      repoHighlight.classList.remove("defunct");
      let position = +e.target.dataset.pos;
      repoHighlight.style.top = `${4 * position}rem`;
    });
    return;
  }
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

const GET_FULL_REPOSITORIES = gql`
  query GetFullRepositories(
    $username: String!
    $first: Int!
    $after: String
    $before: String
  ) {
    user(login: $username) {
      repositories(first: $first, after: $after, before: $before) {
        nodes {
          name
          createdAt
          updatedAt
          sshUrl
          url
          description
          languages(first: 5) {
            nodes {
              name
            }
          }
          owner {
            avatarUrl
            ... on User {
              name
              bio
            }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  totalCount
                }
              }
            }
          }
          forks {
            totalCount
          }
          licenseInfo {
            name
          }
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

export const RepoList = ({ closed, toggleClosed, userData }) => {
  const repoList = useRef(null);
  const repoHighlight = useRef(null);

  const [listState, listStateDispatch] = useReducer(
    repoListReducer,
    getInitialRepoListState()
  );

  const { data, loading, error, fetchMore } = useQuery(GET_FULL_REPOSITORIES, {
    context: {
      Headers: {
        Authorization: `Bearer ${userData.token || ""}`,
      },
    },
    variables: {
      username: userData?.username,
      first: REPO_LIST_PAGINATE_SIZE,
      key: listState.currentPageIndex,
    },
    skip: !userData.token || listState.pageInfo || !userData.username || DEV_ENV === "test",
    onCompleted: (data) => {
      // console.log("we got the data");
      //this should run only once. fix it
      if (listState.pageInfo) return;
      const { pageHash, listHash } = getRepoListAndPageIndex();

      pageHash[listState.currentPageIndex] =
        data.user.repositories.pageInfo.endCursor;
      listHash[listState.currentPageIndex] = data;

      setRepoListAndPageIndex({ pageHash, listHash });

      listStateDispatch(
        __updatePageInfo({ pageInfo: data.user.repositories.pageInfo })
      );
      listStateDispatch(
        __updateLinkData({ repoLinkData: transformRepoList(data) })
      );
    },
  });

  // console.log(
  //   " skipped? ",
  //   !userData.token || listState.pageInfo || !userData.username
  // );
  // console.log(
  //   "credentials : =====",
  //   userData.token,
  //   listState.pageInfo,
  //   userData.username
  // );

  const handleNextPage = useCallback(() => {
    if (!(listState.pageInfo && listState.pageInfo.hasNextPage)) return;
    const nextPageIndex = listState.currentPageIndex + 1;
    const { pageHash, listHash } = getRepoListAndPageIndex();

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
    })
      .then((res) => {
        const { data: newData } = res;
        const { pageHash, listHash } = getRepoListAndPageIndex();

        pageHash[listState.currentPageIndex + 1] =
          newData.user.repositories.pageInfo.endCursor;
        listHash[listState.currentPageIndex + 1] = newData;

        setRepoListAndPageIndex({ listHash, pageHash });

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
    const { pageHash, listHash } = getRepoListAndPageIndex();
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
    })
      .then((res) => {
        const { data: newData } = res;
        const { pageHash, listHash } = getRepoListAndPageIndex();

        pageHash[listState.currentPageIndex - 1] =
          newData.user.repositories.pageInfo.endCursor;
        listHash[listState.currentPageIndex - 1] = newData;

        setRepoListAndPageIndex({ pageHash, listHash });

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

  // useEffect(() => {
  //   return () => {
  //     console.log("persisting state", listState);
  //   };
  // }, [listState]);

  useEffect(() => {
    initRepoListAndPageIndexPersist();
  }, []);

  // console.log("list rendering");

  return (
    <>
      <div className="repository-wrapper">
        <RepoListStyled className="repositories" ref={repoList}>
          <div className="repo-highlight" ref={repoHighlight}></div>
          {listState.repoLinkData.map((el, i) => {
            return (
              <RepoLink key={i} position={i} data={el} listState={listState} />
            );
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
//   (prev, next) => {
//     return isEqual(prev, next);
//   }
// );
