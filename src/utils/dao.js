import { DEV_ENV } from "../data";
import { inObjectArray } from "./comparison";
import {
  COMMITS_STORENAME,
  DBPersist,
  DBPersistGlobal,
  REPO_STORENAME,
  TXN_READ,
  TXN_RWRITE,
  USERS_STORENAME,
} from "./storage";

export class CommitDao {
  constructor() {
    if (!CommitDao.instance) {
      CommitDao.instance = this;
    }
    return CommitDao.instance;
  }

  sameCommitTime(commit1, commit2) {
    return commit1.idx_commitTime === commit2.idx_commitTime;
  }

  async addCommit(commit, repoName) {
    const db = await DBPersist.open();
    const commitStore = db
      .transaction([COMMITS_STORENAME], TXN_RWRITE)
      .objectStore(COMMITS_STORENAME);
    commit.idb_commitTime = new Date(commit.dayCommit).getTime();
    commit.idb_repoName = repoName;
    let commitKey = await commitStore.put(commit);
    return commitStore.get(commitKey);
  }

  async getRepoCommits(repoName) {
    const db = await DBPersist.open();
    const commitStore = db
      .transaction([COMMITS_STORENAME], TXN_READ)
      .objectStore(COMMITS_STORENAME);
    const commitRange = IDBKeyRange.bound(
      new Date(0).getTime(),
      new Date().getTime(),
      false,
      false
    );
    let repoTimeCursor = await commitStore
      .index("cmp_idx_repo_time")
      .openCursor([repoName, commitRange]);
    let resArray = [];
    let currentCommit;
    while (repoTimeCursor) {
      currentCommit = repoTimeCursor.value;
      if (!inObjectArray(currentCommit, resArray, this.sameCommitTime)) {
        resArray.push(currentCommit);
      }
      repoTimeCursor = repoTimeCursor.continue();
    }

    return resArray;
  }

  async getRepoCommitsInterval(startString, endString, repoName) {
    const db = await DBPersist.open();
    const startTime = new Date(startString).getTime();
    const endTime = new Date(endString).getTime();
    const commitStore = db
      .transaction([COMMITS_STORENAME], TXN_READ)
      .objectStore(COMMITS_STORENAME);
    const commitRange = IDBKeyRange.bound(startTime, endTime, false, false);
    let repoTimeCursor = await commitStore
      .index("cmp_idx_repo_time")
      .openCursor([repoName, commitRange]);
    let intervalArray = [];
    let currentCommit;
    while (repoTimeCursor) {
      currentCommit = repoTimeCursor.value;
      if (!inObjectArray(currentCommit, intervalArray, this.sameCommitTime)) {
        intervalArray.push(currentCommit);
      }
      repoTimeCursor = repoTimeCursor.continue();
    }

    return intervalArray;
  }
}

export class RepoDao {
  constructor() {
    if (!RepoDao.instance) {
      RepoDao.instance = this;
    }
    return RepoDao.instance;
  }

  async addRepo(repo) {
    const db = await DBPersist.open();
    const repoStore = db
      .transaction([REPO_STORENAME], TXN_RWRITE)
      .objectStore(REPO_STORENAME);
    let repoKey = await repoStore.put(repo);
    return repoStore.get(repoKey);
  }

  async reposInStore(repoList = []) {
    const nameList = repoList.map((repo) => repo.name);
    const db = await DBPersist.open();
    const repoStore = db
    .transaction([REPO_STORENAME], TXN_READ)
    .objectStore(REPO_STORENAME);
    const namesReq = nameList.map((name) => repoStore.get(name));
    try {
      await Promise.all(namesReq);
      return true;
    } catch (err) {
      return false;
    }
  }

  async getRepo(repoName) {
    const db = await DBPersist.open();
    const repoStore = db
      .transaction([REPO_STORENAME], TXN_READ)
      .objectStore(REPO_STORENAME);
    return repoStore.get(repoName);
  }
}

export class UserDao {
  constructor() {
    if (!UserDao.instance) {
      UserDao.instance = this;
    }
    return UserDao.instance;
  }

  async addUser(user) {
    const db = await DBPersistGlobal.open();
    const usersStore = db
      .transaction([USERS_STORENAME], TXN_RWRITE)
      .objectStore(USERS_STORENAME);
    let repoKey = await usersStore.put(user);
    return usersStore.get(repoKey);
  }

  async getUser(username) {
    const db = await DBPersistGlobal.open();
    const usersStore = db
      .transaction([USERS_STORENAME], TXN_READ)
      .objectStore(USERS_STORENAME);
    return usersStore.get(username);
  }

  async deleteUser(username) {
    const db = await DBPersistGlobal.open();
    const usersStore = db
      .transaction([USERS_STORENAME], TXN_RWRITE)
      .objectStore(USERS_STORENAME);
    return usersStore.delete(username);
  }
}
