import { inObjectArray } from "./comparison";

//REPO LINK STORAGE
export const initRepoListAndPageIndexPersist = () => {
  const pageHash = {};
  const listHash = {};

  if (
    localStorage.getItem("glt_pageHash") &&
    localStorage.getItem("glt_listHash")
  )
    return;
  localStorage.setItem("glt_pageHash", JSON.stringify(pageHash));
  localStorage.setItem("glt_listHash", JSON.stringify(listHash));
};

export const persistRepoListState = (state) => {
  localStorage.setItem("glt_repoListState", JSON.stringify(state));
};

export const getRepoListState = () => {
  const storedListState = JSON.parse(localStorage.getItem("glt_repoListState"));

  return { storedListState };
};

export const getRepoListAndPageIndex = () => {
  const pageHash = JSON.parse(localStorage.getItem("glt_pageHash"));
  const listHash = JSON.parse(localStorage.getItem("glt_listHash"));

  return { pageHash, listHash };
};

export const setRepoListAndPageIndex = ({ pageHash, listHash }) => {
  localStorage.setItem("glt_pageHash", JSON.stringify(pageHash));
  localStorage.setItem("glt_listHash", JSON.stringify(listHash));
};

// REPO BOARD STORAGE
//REPO OWNER AND STAT STORAGE
//REPO BOTTOM STORAGE
export const initRepoLinkPersist = (pos) => {
  if (localStorage.getItem("glt_lastRepoLinkClickPos")) return;
  localStorage.setItem("glt_lastRepoLinkClickPos", JSON.stringify(pos));
};

export const getRepoLinkLastPos = () => {
  const lastPos = localStorage.getItem("glt_lastRepoLinkClickPos");
  if (lastPos) {
    return { lastPos: JSON.parse(lastPos) };
  } else {
    return { lastPos: null };
  }
};

export const setRepoLinkLastPos = ({ lastPos }) => {
  localStorage.setItem("glt_lastRepoLinkClickPos", JSON.stringify(lastPos));
};

// GRAPH STORAGE
export const getRepoListStateForGraph = () => {
  let { lastPos } = getRepoLinkLastPos();
  let { storedListState } = getRepoListState();
  let res = storedListState?.repoLinkData[lastPos] || null;
  if (res) res = { name: res.name, description: res.description };

  return { data: res };
};

export const setGraphRepoHash = (name, data) => {
  let repoHash;

  repoHash = JSON.parse(localStorage.getItem("glt_graphRepoHash"));
  if (repoHash) {
    if (repoHash[name]) {
      let old = repoHash[name];
      let { commits } = old;
      let newCommits = [...data.commits];
      for (const commit of commits) {
        if (
          !inObjectArray(
            commit,
            data.commits,
            (obj1, obj2) => obj1.oid === obj2.oid
          )
        ) {
          newCommits.push(commit);
        }
      }
      repoHash[name].commits = newCommits;
    }
    repoHash[name] = data;
  }

  localStorage.setItem("glt_graphRepoHash", JSON.stringify(repoHash));
};

export const getGraphState = (repoName) => {
  let repoHash = JSON.parse(localStorage.getItem("glt_graphRepoHash"));
  if (!repoHash) {
    return {storedGraphState: null};
  }
  const storedGraphState = repoHash[repoName];

  return { storedGraphState };
};

export const getLastGraphDateRange = () => {
  const lastDateRange = localStorage.getItem("glt_lastGraphDateRange");
  if (lastDateRange) {
    return { lastDateRange: [...JSON.parse(lastDateRange).split("|")] };
  } else {
    return { lastDateRange: null };
  }
};

export const setLastGraphDateRange = (startDateString, endDateString) => {
  localStorage.setItem(
    "glt_lastGraphDateRange",
    JSON.stringify(startDateString + "|" + endDateString)
  );
};

// CLEANUP (INVALIDATION ON REFRESH)
export const cleanUp = () => {
  localStorage.removeItem("glt_repoListState");
  localStorage.removeItem("glt_pageHash");
  localStorage.removeItem("glt_listHash");
  localStorage.removeItem("glt_lastRepoLinkClickPos");
  localStorage.removeItem("glt_lastGraphDateRange");
  localStorage.removeItem("glt_graphRepoHash");
};
