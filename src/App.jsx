import { Outlet, useLocation } from "react-router-dom";
import { GlobalStyle } from "./styles/functions";
import { CustomMouse } from "./components/custom-mouse";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { FormModal } from "./components/form-modal";

import { getGitHubUsername, userInfo } from "./data";

// REQUESTS
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

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

  useEffect(() => {
    (async () => {
      try {
        const username = await getGitHubUsername();
        userInfo.username = username;
        userStateDispatch(__updateUser(userInfo));
      } catch (err) {
        console.error(err);
        return err;
      }
    })();
  }, []);

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
