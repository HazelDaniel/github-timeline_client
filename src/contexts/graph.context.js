import { createContext } from "react";
import { getInitialGraphNavState, initialGraphTypeState } from "../reducers/graph.reducer";

export const graphTypeContext = createContext(initialGraphTypeState);
export const GraphTypeProvider = graphTypeContext.Provider;

export const graphNavContext = createContext(getInitialGraphNavState());
export const GraphNavProvider = graphNavContext.Provider;