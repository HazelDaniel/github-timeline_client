import { useContext, useRef, useState } from "react";
import { days, months } from "../data";
import { repoBottomContext } from "../contexts/repo-data.context";


export const CommitSignpost = () => {
  const { repoBottomState } = useContext(repoBottomContext);
  const dateData = {
    dateCreated: repoBottomState.dateCreated,
    dateUpdated: repoBottomState.dateUpdated,
  };
  const [tabState, setTabState] = useState({ current: "created" });
  const [_, setDataState] = useState(dateData.dateCreated);
  const popUp = useRef(null);

  // console.log("renderinng commit signpost");
  let dateOption =
    tabState.current === "created"
      ? dateData.dateCreated
      : dateData.dateUpdated;
  if (!dateOption.getDate) {
    dateOption = new Date(dateOption);
  }

  return (
    <>
      <div className="stat-left">
        <ul>
          <li>
            <button
              className={tabState.current === "created" ? "active" : ""}
              onClick={() => {
                popUp.current.classList.remove("raise_up");
                setDataState(dateData.dateCreated);
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
                setDataState(dateData.dateUpdated);
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
            <p>{dateOption.getDate().toString().padStart(2, "0")}</p>
          </div>
          <div className="right">
            <p>{days[dateOption.getDay()]}</p>
            <h2>
              {months[dateOption.getMonth()]} {dateOption.getFullYear()}
            </h2>
            <h4>
              {dateOption.getHours().toString().padStart(2, "0")}:
              {dateOption.getMinutes().toString().padStart(2, "0")}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};
