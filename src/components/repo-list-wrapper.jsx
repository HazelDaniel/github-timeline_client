import { useLoaderData, useNavigate } from "react-router-dom";
import { RepoList } from "./repo-list";
import { useEffect } from "react";

export const RepoListWrapper = (props) => {
  const userData = useLoaderData();
  const navigate = useNavigate();

  // useEffect(()=>{

  //   if (userData.error)  {
  //     navigate("/app#alert", {state: {state: 1, text: userData.error?.message}})
  //   } else {
  //     navigate("/app#alert", {state: {state: 0, text: userData.message }})
  //   }
  //   console.log("wrapper rendering");
  // }, [userData])
  console.log(userData);

  return (
    <>
      <RepoList {...props} userData={userData} />
    </>
  );
};
