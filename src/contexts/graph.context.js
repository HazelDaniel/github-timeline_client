import { createContext } from "react";
import { initialGraphState } from "../reducers/graph.reducer";

export const graphTypeContext = createContext(initialGraphState);
export const GraphTypeProvider = graphTypeContext.Provider;