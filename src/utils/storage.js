import { inObjectArray } from "./comparison";

//REPO LINK STORAGE
export const initRepoListAndPageIndexPersist = () => {
  const pageHash = {};
  const listHash = {};

  if (
    localStorage.getItem("gtl_pageHash") &&
    localStorage.getItem("gtl_listHash")
  )
    return;
  localStorage.setItem("gtl_pageHash", JSON.stringify(pageHash));
  localStorage.setItem("gtl_listHash", JSON.stringify(listHash));
};

export const persistRepoListState = (state) => {
  localStorage.setItem("gtl_repoListState", JSON.stringify(state));
};

export const getRepoListState = () => {
  const storedListState = JSON.parse(localStorage.getItem("gtl_repoListState"));

  return { storedListState };
};

export const getRepoListAndPageIndex = () => {
  const pageHash = JSON.parse(localStorage.getItem("gtl_pageHash"));
  const listHash = JSON.parse(localStorage.getItem("gtl_listHash"));

  return { pageHash, listHash };
};

export const setRepoListAndPageIndex = ({ pageHash, listHash }) => {
  localStorage.setItem("gtl_pageHash", JSON.stringify(pageHash));
  localStorage.setItem("gtl_listHash", JSON.stringify(listHash));
};

// REPO BOARD STORAGE
//REPO OWNER AND STAT STORAGE
//REPO BOTTOM STORAGE
export const initRepoLinkPersist = (pos) => {
  if (localStorage.getItem("gtl_lastRepoLinkClickPos")) return;
  localStorage.setItem("gtl_lastRepoLinkClickPos", JSON.stringify(pos));
};

export const getRepoLinkLastPos = () => {
  const lastPos = localStorage.getItem("gtl_lastRepoLinkClickPos");
  if (lastPos) {
    return { lastPos: JSON.parse(lastPos) };
  } else {
    return { lastPos: null };
  }
};

export const setRepoLinkLastPos = ({ lastPos }) => {
  localStorage.setItem("gtl_lastRepoLinkClickPos", JSON.stringify(lastPos));
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

  repoHash = JSON.parse(localStorage.getItem("gtl_graphRepoHash"));
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

  localStorage.setItem("gtl_graphRepoHash", JSON.stringify(repoHash));
};

export const getGraphState = (repoName) => {
  let repoHash = JSON.parse(localStorage.getItem("gtl_graphRepoHash"));
  if (!repoHash) {
    return { storedGraphState: null };
  }
  const storedGraphState = repoHash[repoName];

  return { storedGraphState };
};

export const getLastGraphDateRange = () => {
  const lastDateRange = localStorage.getItem("gtl_lastGraphDateRange");
  let direction = "forward";
  if (lastDateRange) {
    let dates = [...JSON.parse(lastDateRange).split("|")];
    let [dateStart, dateEnd] = dates;
    if (new Date(dateStart).getTime() > new Date(dateEnd).getTime()) {
      direction = "backward";
      // console.log("direction was backward");
    } else {
      // console.log("direction was forward");
    }
    return {
      lastDateRange: [...JSON.parse(lastDateRange).split("|")],
      direction,
    };
  } else {
    return { lastDateRange: null, direction };
  }
};

export const setLastGraphDateRange = (startDateString, endDateString) => {
  localStorage.setItem(
    "gtl_lastGraphDateRange",
    JSON.stringify(startDateString + "|" + endDateString)
  );
};

//AUTH
export const storeGitHubUsername = (username) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem("gtl_username", JSON.stringify(username));
      resolve(username);
    } catch (err) {
      reject(new Error("username could't be stored"));
    }
  });
};

export const getGitHubUsername = () => {
  return new Promise((resolve, reject) => {
    try {
      const username = JSON.parse(localStorage.getItem("gtl_username"));
      resolve ({ username })
    } catch (err) {
      reject(new Error("no username"));
    }
  });
};
export const setRememberCredentials = () => {
  localStorage.setItem("gtl_rememberAuthCred", JSON.stringify(true));
};

export const getRememberCredentials = () => {
  const cred = JSON.parse(localStorage.getitem("gtl_rememberAuthCred"));
  let res = { rememberCredentials: cred };
  return res;
};

export const setAccessToken = (token) => {
  localStorage.setItem("gtl_accessToken", JSON.stringify(token));
};

export const getAccessToken = () => {
  let token = JSON.parse(localStorage.getItem("gtl_accessToken"));
  return { token };
};

// CLEANUP (INVALIDATION ON REFRESH)
export const cleanUp = () => {
  localStorage.removeItem("gtl_repoListState");
  localStorage.removeItem("gtl_pageHash");
  localStorage.removeItem("gtl_listHash");
  localStorage.removeItem("gtl_lastRepoLinkClickPos");
  localStorage.removeItem("gtl_lastGraphDateRange");
  localStorage.removeItem("gtl_graphRepoHash");
};

//LOGOUT LOGIC
export const cleanUpAuth = () => {
  localStorage.removeItem("gtl_username");
  localStorage.removeItem("gtl_accessToken");
  localStorage.removeItem("gtl_rememberAuthCred");
};
