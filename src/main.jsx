import ReactDOM from "react-dom/client";
// import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { AppPage, appLoader } from "./pages/app";
import { Index } from "./pages";
import { Main } from "./components/main";
import { GraphWrapper } from "./components/graph-wrapper";
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
        loader: appLoader,
      },
      {
        path: "graph",
        element: <GraphWrapper />,
      },
      {
        path: "signin",
        element: <Index />,
      },
      {
        path: "signup",
        element: <Index />,
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
  <Main />
  // </React.StrictMode>
);
