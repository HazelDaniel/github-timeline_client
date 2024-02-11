import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "../main";

export const Main = () => {
  useEffect(() => {
    console.log("clearing state");
    localStorage.removeItem("glt_repoListState");
    localStorage.removeItem("glt_pageHash");
    localStorage.removeItem("glt_listHash");
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
