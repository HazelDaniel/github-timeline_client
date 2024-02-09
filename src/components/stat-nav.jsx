import { useLocation } from "react-router-dom";

export const StatNav = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const fullRoute = pathName.trim() + location.search.trim();

  return (
  <ul className="stat-nav">
    <li style={{ "--pos": 3 }}>
      <a href={fullRoute + "#latest-commit"}>latest commit</a>
      <span></span>
    </li>
    <li style={{ "--pos": 2 }}>
      <a href={fullRoute + "#top-contributors"}>top contributors</a>
      <span></span>
    </li>
    <li style={{ "--pos": 1 }}>
      <a href={fullRoute + "#license"}>license</a> <span></span>
    </li>
  </ul>);
}