import {
  repoLinkTypeData as repoLinkValueData,
  repoNameAndLanguageData,
  repoOwnerSectionData,
  repoStatData,
  repoBottomData,
  repoLinkData,
} from "../data";
import { isEqual } from "../utils/comparison";
import {
  getRepoLinkLastPos,
  getRepoListState,
  persistRepoListState,
} from "../utils/storage";

const repoListActionTypes = {
  updateLinkData: "UPDATE_LINK_DATA",
  updatePageInfo: "UPDATE_PAGE_INFO",
  incrementPageIndex: "INCREMENT_PAGE_INDEX",
  decrementPageIndex: "DECREMENT_PAGE_INDEX",
};

const repoBoardActionTypes = {
  updateRepoBoardData: "UPDATE_REPO_BOARD_DATA",
};

const repoOwnerAndStatActionTypes = {
  updateOwnerAndStatData: "UPDATE_OWNER_AND_STAT_DATA",
};

const repoBottomActionTypes = {
  updateRepoBottomData: "UPDATE_REPO_BOTTOM_DATA",
};

export const initialRepoListState = {
  pageInfo: null,
  currentPageIndex: 1,
  repoLinkData,
};

export const initialRepoBoardState = {
  ...repoLinkValueData,
  ...repoNameAndLanguageData,
};

export const initialRepoOwnerAndStatState = {
  ...repoOwnerSectionData,
  ...repoStatData,
};

export const initialRepoBottomState = {
  ...repoBottomData,
};

export const getInitialRepoListState = () => {
  const { storedListState } = getRepoListState();

  return storedListState ? storedListState : initialRepoListState;
};

export const getInitialRepoBoardState = () => {
  const { storedListState } = getRepoListState();
  const { lastPos } = getRepoLinkLastPos();

  return Number.isFinite(lastPos) && storedListState
    ? {
        ...storedListState.repoLinkData[lastPos],
        defaultLink: initialRepoBoardState.defaultLink,
      }
    : initialRepoBoardState;
};

export const getInitialRepoOwnerAndStatState = () => {
  const { storedListState } = getRepoListState();
  const { lastPos } = getRepoLinkLastPos();

  // console.log(" stored list state is :  ", storedListState);
  // console.log(" last position is ", lastPos);

  if (Number.isFinite(lastPos) && storedListState) {
    return storedListState.repoLinkData[lastPos];
  } else {
    return initialRepoOwnerAndStatState;
  }
};

export const getInitialRepoBottomState = () => {
  const { storedListState } = getRepoListState();
  const { lastPos } = getRepoLinkLastPos();

  return Number.isFinite(lastPos) &&
    storedListState &&
    storedListState.repoLinkData &&
    storedListState.repoLinkData[lastPos]
    ? storedListState.repoLinkData[lastPos]
    : initialRepoBottomState;
};

export const repoListReducer = (state = getInitialRepoListState(), action) => {
  let newState = { ...state, ...(action.payload && action.payload) };
  // console.log("new state is, ", newState);

  switch (action.type) {
    case repoListActionTypes.incrementPageIndex:
      newState = { ...state, currentPageIndex: state.currentPageIndex + 1 };
      persistRepoListState(newState);
      return newState;
    case repoListActionTypes.decrementPageIndex:
      newState = { ...state, currentPageIndex: state.currentPageIndex - 1 };
      persistRepoListState(newState);
      return newState;
    default:
      if (isEqual(state, newState)) {
        // console.log("same state");
        return state;
      }
      // console.log("updating state");
      persistRepoListState(newState);
      return { ...newState };
  }
};

export const repoBoardReducer = (
  state = getInitialRepoBoardState(),
  action
) => {
  const newState = { ...state, ...(action.payload && action.payload) };

  if (isEqual(state, newState)) {
    // console.log("same state");
    return state;
  }
  return { ...newState };
};

export const repoOwnerAndStatReducer = (
  state = getInitialRepoOwnerAndStatState(),
  action
) => {
  const newState = { ...state, ...(action.payload && action.payload) };

  if (isEqual(state, newState)) {
    // console.log("same state");
    return state;
  }
  return { ...newState };
};

export const repoBottomStateReducer = (
  state = getInitialRepoBottomState(),
  action
) => {
  const newState = { ...state, ...(action.payload && action.payload) };

  if (isEqual(state, newState)) {
    // console.log("same state");
    return state;
  }
  return { ...newState };
};

// START: REPO LIST ACTION CREATORS
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
// END: REPO LIST ACTION CREATORS

// START: REPO BOARD ACTION CREATORS
export const __updateRepoBoardData = (boardData) => {
  return {
    type: repoBoardActionTypes.updateRepoBoardData,
    payload: boardData,
  };
};
// END: REPO BOARD ACTION CREATORS

// START: OWNER AND STAT ACTION CREATORS
export const __updateRepoOwnerAndStatData = (ownerAndStatData) => {
  return {
    type: repoOwnerAndStatActionTypes.updateOwnerAndStatData,
    payload: ownerAndStatData,
  };
};
// END: OWNER AND STAT ACTION CREATORS

// START: REPO BOTTOM ACTION CREATORS
export const __updateRepoBottomData = (bottomData) => {
  return {
    type: repoBottomActionTypes.updateRepoBottomData,
    payload: bottomData,
  };
};
// END: REPO BOTTOM ACTION CREATORS
