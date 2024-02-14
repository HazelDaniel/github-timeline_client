import { createContext } from "react";
import { getInitialGraphDataState } from "../reducers/graph-data.reducer";

//CONTEXTS
export const graphDataContext = createContext(getInitialGraphDataState());

// CONTEXT PROVIDERS
export const GraphDataProvider = graphDataContext.Provider;

