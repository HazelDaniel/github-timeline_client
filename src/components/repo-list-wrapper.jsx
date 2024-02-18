import { useLoaderData, useNavigate } from "react-router-dom";
import { RepoList } from "./repo-list";
import { useContext, useEffect } from "react";
import { alertModalContext } from "../contexts/alert-modal.context";
import {
  __setModalText,
  __setModalType,
  __showAlertModal,
} from "../reducers/alert-modal.reducer";

export const RepoListWrapper = (props) => {
  const userData = useLoaderData();


  return (
    <>
      <RepoList {...props} userData={userData} />
    </>
  );
};
