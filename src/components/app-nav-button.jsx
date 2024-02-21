import { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { repoBoardContext } from "../contexts/repo-data.context";

const NavButtonDynamic = memo(function NavButtonDynamic({ text, data }) {
  const { repoBoardState } = useContext(repoBoardContext);
  return (
    <div>
      <Link to={repoBoardState.HTTPSLink || "#"} state={data} target="_blank">
        {text.toLowerCase()}
      </Link>
    </div>
  );
});

export const AppNavButton = ({ to, text, data }) => {
  if (data.type === "dynamic") {
    return <NavButtonDynamic text={text} data={data} />;
  }
  return (
    <div>
      <Link to={to} state={data}>
        {text.toLowerCase()}
      </Link>
    </div>
  );
};
