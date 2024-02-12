
export const StatContrib = ({avatarUrl, bio}) => {
  return (
    <li>
      <span></span>
      <img
        src={`${avatarUrl}`}
        alt="github profile picture of a software engineer"
        loading="lazy"
      />
      <p>
        {bio}
      </p>
    </li>
  );
}