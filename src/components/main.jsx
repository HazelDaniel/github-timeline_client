import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "../main";
import { cleanUp } from "../utils/storage";

export const Main = () => {
  useEffect(() => {
    cleanUp();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
