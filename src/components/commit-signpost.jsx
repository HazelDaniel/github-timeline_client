import { useRef, useState } from "react";
import { commitSignpostData } from "../data";

const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const CommitSignpost = () => {
  const [tabState, setTabState] = useState({ current: "created" });
  const [dataState, setDataState] = useState(commitSignpostData.createdAt);
  const popUp = useRef(null);

  return (
    <>
      <div className="stat-left">
        <ul>
          <li>
            <button
              className={tabState.current === "created" ? "active" : ""}
              onClick={() => {
                popUp.current.classList.remove("raise_up");
                setDataState(commitSignpostData.createdAt);
                setTabState({ current: "created" });
              }}
            >
              created at
            </button>
          </li>
          <li>
            <button
              className={tabState.current === "updated" ? "active" : ""}
              onClick={() => {
                popUp.current.classList.remove("raise_up");
                setDataState(commitSignpostData.updatedAt);
                setTabState({ current: "updated" });
                popUp.current.classList.add("raise_up");
              }}
            >
              updated at
            </button>
          </li>
        </ul>
      </div>
      <div className="stat-separator first">
        <span>
          <span></span>
        </span>
      </div>
      <div className="stat-right">
        <div className="stat-popup raise_up" ref={popUp}>
          <div className="left">
            <p>{dataState.getDate().toString().padStart(2, "0")}</p>
          </div>
          <div className="right">
            <p>{days[dataState.getDay()]}</p>
            <h2>
              {months[dataState.getMonth()]} {dataState.getFullYear()}
            </h2>
            <h4>
              {dataState.getHours().toString().padStart(2, "0")}:
              {dataState.getMinutes().toString().padStart(2, "0")}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};
