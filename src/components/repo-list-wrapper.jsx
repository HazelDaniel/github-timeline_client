import { useLoaderData, useNavigate } from "react-router-dom";
import { RepoList } from "./repo-list";
import { useEffect } from "react";

export const RepoListWrapper = (props) => {
  const userData = useLoaderData();

  console.log(userData);

  return (
    <>
      <RepoList {...props} userData={userData} />
    </>
  );
};
