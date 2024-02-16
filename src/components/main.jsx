import { RouterProvider } from "react-router-dom";
import { router } from "../main";
import { cleanUp, cleanUpAuth } from "../utils/storage";
import { memo, useEffect } from "react";

export const Main = memo(function Main() {
  // console.log("main cleaning up on render");

  useEffect(() => {
    cleanUp();
    // cleanUpAuth();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
});
