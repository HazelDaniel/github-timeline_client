import { DEV_ENV } from "../data";
import { COMMITS_STORENAME, DBPersist, TXN_RWRITE } from "./storage";

export class CommitDao {
  async addCommit(commit, repoName) {
    const db = await DBPersist.open();
    const commitStore = db
      .transaction([COMMITS_STORENAME], TXN_RWRITE)
      .objectStore(COMMITS_STORENAME);
    commit.idb_commitTime = new Date(commit.dayCommit).getTime();
    commit.repoName = repoName;
    let commitKey = await commitStore.put(commit);
    return commitStore.get(commitKey);
  }

  async getCommits() {
  }

  async getCommitsInterval() {

  }

  // async
}

export class RepoDao {}
