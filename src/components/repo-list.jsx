import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
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
import { alertModalContext } from "../contexts/alert-modal.context";
import {
  __setModalText,
  __setModalType,
  __showAlertModal,
} from "../reducers/alert-modal.reducer";

const handleListHover = ({ repoHighlight, repoList }) => {
  if (window.innerWidth < 600) {
    repoList.addEventListener("click", (e) => {
      let pos = e.target.closest("li")?.dataset.pos;
      let height;
      try {
        height = getComputedStyle(e.target.closest("li")).height;
      } catch (err) {
        return;
      }
      height = Number.parseInt(height);
      if (!pos) return;
      repoHighlight.classList.remove("defunct");
      let position = +pos;
      repoHighlight.style.top = `${height * position}px`;
    });
    return;
  }
  repoList.addEventListener("mouseover", (e) => {
    let pos = e.target.closest("li")?.dataset.pos;
    if (!pos) return;
    repoHighlight.classList.remove("defunct");
    let height;
    try {
      height = getComputedStyle(e.target.closest("li")).height;
    } catch (err) {
      return;
    }
    height = Number.parseInt(height);
    let position = +pos;
    let res = height * position;
    if (Number.isNaN(res)) return;
    repoHighlight.style.top = `${height * position}px`;
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
      repositories(
        first: $first
        after: $after
        before: $before
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
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

export const RepoList = memo(function RepoList({
  closed,
  toggleClosed,
  userData,
}) {
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
    skip: !userData.token || listState.pageInfo || !userData.username,
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

  const { alertModalDispatch } = useContext(alertModalContext);

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

  useEffect(() => {
    if (error) {
      alertModalDispatch(__setModalType(2));
      alertModalDispatch(__setModalText(error.message));
      alertModalDispatch(__showAlertModal());
    }
  }, [error]);

  useEffect(() => {
    initRepoListAndPageIndexPersist();
  }, []);

  useEffect(() => {
    if (userData.error) {
      alertModalDispatch(__setModalType(2));
      alertModalDispatch(__setModalText(userData.error.message));
      alertModalDispatch(__showAlertModal());
    } else if (userData.message) {
      alertModalDispatch(__setModalType(0));
      alertModalDispatch(__setModalText(userData.message));
      alertModalDispatch(__showAlertModal());
    } else if (userData.warning) {
      alertModalDispatch(__setModalType(1));
      alertModalDispatch(__setModalText(userData.warning.message));
      alertModalDispatch(__showAlertModal());
    }
  }, [userData]);

  // console.log("list rendering");
  // console.log(userData);

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
});
//   (prev, next) => {
//     return isEqual(prev, next);
//   }
// );
