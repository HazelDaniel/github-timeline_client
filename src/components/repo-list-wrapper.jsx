import { useLoaderData } from "react-router-dom";
import { RepoList } from "./repo-list";

export const RepoListWrapper = (props) => {
  const userData = useLoaderData();
  return (
    <>
    <RepoList {...props} userData={userData} />
    </>
  );
}