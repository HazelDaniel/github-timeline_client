import { DBinfo, DEV_ENV } from "../data";
import { inObjectArray } from "./comparison";
import { deleteDB, openDB } from "idb";

export const TXN_READ = "readonly";
export const TXN_RWRITE = "readwrite";
export let DB_NAME = "gtl_PERSIST";
export const GLOBAL_DB_NAME = "gtl_PERSIST_GLOBAL";
export const COMMITS_STORENAME = "commits";
export const USERS_STORENAME = "users";
export const REPO_STORENAME = "repositories";
const DB_VERSION = 1;

export const getLastDBVersion = () => {
  return JSON.parse(localStorage.getItem("gtl_LAST_GLOBAL_DB_VERSION")) || 1;
};

export class DBPersist {
  static open() {
    return openDB(DB_NAME, DB_VERSION, {
      blocked() {
        if (DEV_ENV === "test")
          alert(
            "unable to proceed indexedDB operation, please close all other tabs accessing this site"
          );
        DBinfo.blocked = true;
      },
      upgrade(db) {
        const commitsStore = db.createObjectStore(COMMITS_STORENAME, {
          keyPath: "oid",
        });
        const repositoriesStore = db.createObjectStore(REPO_STORENAME, {
          keyPath: "name",
        });
        commitsStore.createIndex("cmp_idx_repo_time", [
          "idb_repoName",
          "idb_commitTime",
        ]);
        commitsStore.transaction.oncomplete = () => {
          if (DEV_ENV === "test") {
            console.log("commits store successfully created for user");
          }
        };
        repositoriesStore.transaction.oncomplete = () => {
          if (DEV_ENV === "test") {
            console.log("repositories store successfully created for user");
          }
        };
      },
    });
  }

  static delete() {
    return deleteDB(DB_NAME, {
      blocked() {
        if (DEV_ENV === "test")
          alert(
            "unable to modify database [DELETE], please close all other tabs accessing this site"
          );
      },
    });
  }
}
export class DBPersistGlobal {
  static open() {
    return openDB(GLOBAL_DB_NAME, getLastDBVersion(), {
      blocked() {
        if (DEV_ENV === "test")
          alert(
            "unable to proceed indexedDB operation, please close all other tabs accessing this site"
          );
        DBinfo.blocked = true;
      },
      upgrade(db) {
        const usersStore = db.createObjectStore(USERS_STORENAME, {
          keyPath: "username",
        });
        usersStore.transaction.oncomplete = () => {
          if (DEV_ENV === "test") {
            console.log("users store successfully created");
          }
        };
      },
    });
  }

  static delete() {
    return deleteDB(GLOBAL_DB_NAME, {
      blocked() {
        if (DEV_ENV === "test")
          alert(
            "unable to modify database [DELETE], please close all other tabs accessing this site"
          );
      },
    });
  }
}
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
  let repoHash = JSON.parse(localStorage.getItem("gtl_graphRepoHash")) || {};
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

  localStorage.setItem("gtl_graphRepoHash", JSON.stringify(repoHash));
};

export const getGraphState = (repoName) => {
  let repoHash = JSON.parse(localStorage.getItem("gtl_graphRepoHash"));
  if (!repoHash) {
    return { storedGraphState: null };
  }
  if (DEV_ENV === "test") {
    console.log("repo hash was ", repoHash);
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
      resolve({ username });
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

//PREFERENCES
export const getSeenWarningOn = (page) => {
  let seenWarning = JSON.parse(
    localStorage.getItem(`gtl_seenWarningOn${page}`)
  );
  return { seenWarning };
};

export const setSeenWarningOn = (page, times) => {
  localStorage.setItem(`gtl_seenWarningOn${page}`, JSON.stringify(times));
};

export const unsetSeenWarningOn = (page) => {
  localStorage.removeItem(`gtl_seenWarningOn${page}`);
};

// TRIGGERS FOR REVALIDATION
export const getLastContribCount = (username) => {
  const lastContribHash = JSON.parse(
    localStorage.getItem("gtl_lastContribHash")
  );
  let lastContribCount = 0;
  if (!lastContribHash) {
    return {lastContribCount};
  }
  return lastContribHash[username] ? {lastContribCount: lastContribHash[username]} : {lastContribCount};
};

export const setLastContribCount = (username, count) => {
  const lastContribHash = JSON.parse(
    localStorage.getItem("gtl_lastContribHash")
  ) || {};

  lastContribHash[username] = count;
  localStorage.setItem("gtl_lastContribHash", lastContribHash);
}

// CLEANUP (INVALIDATION ON REFRESH)
export const cleanUp = () => {
  localStorage.removeItem("gtl_repoListState");
  localStorage.removeItem("gtl_pageHash");
  localStorage.removeItem("gtl_listHash");
  localStorage.removeItem("gtl_lastRepoLinkClickPos");
  localStorage.removeItem("gtl_lastGraphDateRange");
  localStorage.removeItem("gtl_graphRepoHash");
  localStorage.removeItem("gtl_lastContribHash");
};

//LOGOUT LOGIC
export const cleanUpAuth = () => {
  localStorage.removeItem("gtl_username");
  localStorage.removeItem("gtl_accessToken");
  localStorage.removeItem("gtl_rememberAuthCred");
};
