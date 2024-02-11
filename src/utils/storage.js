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

export const getRepoListAndPageIndex = () => {
  const pageHash = JSON.parse(localStorage.getItem("glt_pageHash"));
  const listHash = JSON.parse(localStorage.getItem("glt_listHash"));

  return { pageHash, listHash };
};

export const setRepoListAndPageIndex = ({pageHash, listHash}) => {
  localStorage.setItem("glt_pageHash", JSON.stringify(pageHash));
  localStorage.setItem("glt_listHash", JSON.stringify(listHash));
}