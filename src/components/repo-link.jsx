export const RepoLink = ({ position, data }) => {
  if (!data.dateUpdated.getHours) {
    data.dateUpdated = new Date(data.dateUpdated);
  }

  return (
    <li data-pos={`${position}`}>
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
};
