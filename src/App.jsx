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
import { memo, useEffect, useMemo, useReducer, useState } from "react";
import {
  __updateUser,
  initialUserState,
  userReducer,
} from "./reducers/user.reducer";
import { UserProvider } from "./contexts/user.context";
import { isEqual } from "./utils/comparison";
import { API_TOKEN, userInfo } from "./data";
import { AlertModal } from "./components/alert-modal";
import {
  alertModalReducer,
  initialModalState,
} from "./reducers/alert-modal.reducer";
import { AlertModalProvider } from "./contexts/alert-modal.context";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = userInfo.token;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});

const App = () => {
  const location = useLocation();
  const [userState, userStateDispatch] = useReducer(
    userReducer,
    initialUserState
  );
  const [alertModalState, alertModalDispatch] = useReducer(
    alertModalReducer,
    initialModalState
  );

  const userValue = useMemo(
    () => ({
      userState,
      userStateDispatch,
    }),
    [userState]
  );

  const modalValue = useMemo(
    () => ({
      alertModalState,
      alertModalDispatch,
    }),
    [alertModalState]
  );

  // console.log("app rendering");

  return (
    <ApolloProvider client={client}>
      <UserProvider value={userValue}>
        <GlobalStyle $page={location.pathname} />
        {location.pathname === "/signup" || location.pathname === "/signin" ? (
          <FormModal />
        ) : null}
        {
          location.pathname === "/app" ? null : <CustomMouse />
        }
        <Header />
        <AlertModalProvider value={modalValue}>
					<Nav />

          <AlertModal />
          <Outlet />
        </AlertModalProvider>
      </UserProvider>

      <Footer />
    </ApolloProvider>
  );
};

export default App;
