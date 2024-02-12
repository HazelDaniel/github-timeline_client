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

// CLEANUP (INVALIDATION ON REFRESH)
export const cleanUp = () => {
  localStorage.removeItem("glt_repoListState");
  localStorage.removeItem("glt_pageHash");
  localStorage.removeItem("glt_listHash");
  localStorage.removeItem("glt_lastRepoLinkClickPos");
};
