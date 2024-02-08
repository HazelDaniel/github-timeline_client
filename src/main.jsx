import ReactDOM from "react-dom/client";
// import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import { AppPage } from "./pages/app";
import { Index } from "./pages";
// import F04 from "./components/F04/F04.component";

// ROUTING
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "app",
        element: <AppPage />,
      },
      {
        path: "graph",
        element: <App />,
      },
      {
        index: true,
        element: <Index />,
      },
    ],
  },
  {
    path: "*",
    element: <h2>ERROR: PAGE NOT FOUND</h2>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
