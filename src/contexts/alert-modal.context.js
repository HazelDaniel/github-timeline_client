import { createContext } from "react";
import { initialModalState } from "../reducers/alert-modal.reducer";

export const alertModalContext = createContext(initialModalState);
export const AlertModalProvider = alertModalContext.Provider;
