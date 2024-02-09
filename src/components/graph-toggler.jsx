import { useContext, useState } from "react";
import { graphTypeContext } from "../contexts/graph.context";
import { __setBarType, __setLineType } from "../reducers/graph.reducer";

export const GraphToggler = () => {
  const [toggleState, setToggleState] = useState("lines");
  const { graphTypeDispatch } = useContext(graphTypeContext);

  return (
    <ul>
      <li
        className={toggleState === "bars" ? "active" : ""}
        onClick={() => {
          setToggleState("bars");
          graphTypeDispatch(__setBarType());
        }}
      >
        <span className="toggler-radio">
          <span>
            <span className="radio"> </span>
          </span>
        </span>
        <p>Bars</p>
      </li>
      <li
        className={toggleState === "lines" ? "active" : ""}
        onClick={() => {
          setToggleState("lines");
          graphTypeDispatch(__setLineType());
        }}
      >
        <span className="toggler-radio">
          <span>
            <span className="radio"> </span>
          </span>
        </span>
        <p>Lines</p>
      </li>
    </ul>
  );
};
