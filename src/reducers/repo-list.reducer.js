import { repoLinkData } from "../data";
import { isEqual } from "../utils/comparison";

const repoListActionTypes = {
  updateLinkData: "UPDATE_LINK_DATA",
  updatePageInfo: "UPDATE_PAGE_INFO",
  incrementPageIndex: "INCREMENT_PAGE_INDEX",
  decrementPageIndex: "DECREMENT_PAGE_INDEX",
};

export const initialRepoListState = {
  pageInfo: null,
  currentPageIndex: 1,
  repoLinkData,
};

export const getInitialRepoListState = () => {
  const storedListState = JSON.parse(localStorage.getItem("glt_repoListState"));

  return storedListState ? storedListState : initialRepoListState;
}

export const repoListReducer = (state = getInitialRepoListState(), action) => {
  const newState = { ...state, ...(action.payload && action.payload) };

  switch (action.type) {
    case repoListActionTypes.incrementPageIndex:
      return { ...state, currentPageIndex: state.currentPageIndex + 1 };
    case repoListActionTypes.decrementPageIndex:
      return { ...state, currentPageIndex: state.currentPageIndex - 1 };
    default:
      if (isEqual(state, newState)) {
        console.log("same state");
        return state;
      }
      return { ...newState };
  }
};

export const __updateLinkData = (linkData) => {
  return {
    type: repoListActionTypes.updateLinkData,
    payload: linkData,
  };
};

export const __updatePageInfo = (pageInfo) => {
  return {
    type: repoListActionTypes.updatePageInfo,
    payload: pageInfo,
  };
};

export const __incrementPageIndex = () => {
  return {
    type: repoListActionTypes.incrementPageIndex,
  };
};

export const __decrementPageIndex = () => {
  return {
    type: repoListActionTypes.decrementPageIndex,
  };
};
