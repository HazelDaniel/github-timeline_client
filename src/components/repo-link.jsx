import { memo, useCallback, useContext, useEffect } from "react";
import {
  repoBoardContext,
  repoBottomContext,
  repoOwnerAndStatContext,
} from "../contexts/repo-data.context";
import {
  __updateRepoBoardData,
  __updateRepoBottomData,
  __updateRepoOwnerAndStatData,
} from "../reducers/repo-data.reducer";
import { setRepoLinkLastPos } from "../utils/storage";

export const RepoLink = memo(function RepoLink({ position, data, listState }) {
  const { repoBoardDispatch } = useContext(repoBoardContext);
  const { repoOwnerAndStatDispatch } = useContext(repoOwnerAndStatContext);
  const { repoBottomDispatch } = useContext(repoBottomContext);

  if (!data.dateUpdated.getHours) {
    data.dateUpdated = new Date(data.dateUpdated);
  }

  // console.log("link rendering");
  useEffect(() => {
    if (position === 0 && data.ownerName) {
      repoBoardDispatch(__updateRepoBoardData(data));
      repoOwnerAndStatDispatch(__updateRepoOwnerAndStatData(data));
      repoBottomDispatch(__updateRepoBottomData(data));
    }
  }, [position, data]);

  return (
    <li
      data-pos={`${position}`}
      onClick={() => {
        repoBoardDispatch(__updateRepoBoardData(data));
        repoOwnerAndStatDispatch(__updateRepoOwnerAndStatData(data));
        repoBottomDispatch(__updateRepoBottomData(data));
        setRepoLinkLastPos({ lastPos: position });
      }}
    >
      <span className="repo-line"></span>
      <p className="repo-name">{data.name}</p>
      <span className="repo-time">
        {(data.dateUpdated.getHours() % 12).toString().padStart(2, "0")}:
        {data.dateUpdated.getHours().toString().padStart(2, "0")}{" "}
        {data.dateUpdated.getHours() >= 12 ? "pm" : "am"}
      </span>
      <span className="repo-side-caret"></span>
    </li>
  );
});
