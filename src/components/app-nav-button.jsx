import { Link } from "react-router-dom";

export const AppNavButton = ({ to, text, data }) => {
  return (
    <div>
      <Link to={to} state={data}>
        {text.toLowerCase()}
      </Link>
    </div>
  );
};
