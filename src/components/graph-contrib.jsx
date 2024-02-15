import { GLOBAL_PLACEHOLDER_URL } from "../data";

export const GraphContrib = ({ commits }) => {
  return (
    <div className="gsb-left">
      <div className="graph-contributors-div">
        <p>weekly contributors</p>
        <div className="contributors-list">
          <ul>
            {Array.from(commits).map((commit, i) => {
              return (
                <li key={i}>
                  <span></span>
                  <img
                    src={commit.author.avatarUrl || GLOBAL_PLACEHOLDER_URL}
                    alt="github profile picture of a software engineer"
                    loading="lazy"
                  />
                  <p>{commit.author.bio}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
