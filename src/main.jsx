import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { appLoader } from "./pages/app";
import { Index } from "./pages";
import { Main } from "./components/main";

// ROUTING
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "app",
        loader: appLoader,
        lazy() {
          return (async () => {
            let { AppPage } = await import("./pages/app");
            return { Component: AppPage };
          })();
        },
      },
      {
        path: "graph",
        lazy() {
          return (async () => {
            let { GraphWrapper } = await import("./components/graph-wrapper");
            return { Component: GraphWrapper };
          })();
        },
      },
      {
        path: "signin",
        lazy() {
          return (async () => {
            let { Index } = await import("./pages/index");
            return { Component: Index };
          })()
        },
      },
      {
        path: "signup",
        lazy() {
          return (async () => {
            let { Index } = await import("./pages/index");
            return { Component: Index };
          })();
        },
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
