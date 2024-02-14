import { RouterProvider } from "react-router-dom";
import { router } from "../main";
import { cleanUp } from "../utils/storage";
import { memo } from "react";

export const Main = memo(function Main() {
  console.log("main cleaning up on render");
  cleanUp();

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
});
