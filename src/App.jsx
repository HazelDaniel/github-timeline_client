import { Outlet, useLocation } from "react-router-dom";
import { GlobalStyle } from "./styles/functions";
import { CustomMouse } from "./components/custom-mouse";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { FormModal } from "./components/form-modal";

// REQUESTS
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { persistCache } from "apollo3-cache-persist";
import { useEffect, useMemo, useReducer, useState } from "react";
import {
  __updateUser,
  initialUserState,
  userReducer,
} from "./reducers/user.reducer";
import { UserProvider } from "./contexts/user.context";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = import.meta.env.VITE_GITHUB_API_TOKEN;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});

// async function initializeApollo() {
//   await persistCache({
//     cache,
//     storage: window.localStorage,
//   });
// }

function App() {
  const location = useLocation();
  const [userState, userStateDispatch] = useReducer(
    userReducer,
    initialUserState
  );

  const userValue = useMemo(
    () => ({
      userState,
      userStateDispatch,
    }),
    [userState]
  );

  return (
    <ApolloProvider client={client}>
      <UserProvider value={userValue}>
        <GlobalStyle $page={location.pathname} />
        {location.pathname === "/signup" || location.pathname === "/signin" ? (
          <FormModal />
        ) : null}
        <CustomMouse />
        <Nav />
        <Header />

        <Outlet />
      </UserProvider>

      <Footer />
    </ApolloProvider>
  );
}

export default App;
