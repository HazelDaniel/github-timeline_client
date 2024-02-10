import { createContext } from "react";
import { initialUserState } from "../reducers/user.reducer";

export const userContext = createContext(initialUserState);
export const UserProvider = userContext.Provider;