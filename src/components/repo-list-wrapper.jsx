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
  const { alertModalState, alertModalDispatch } = useContext(alertModalContext);

  console.log(userData);
  useEffect(() => {
    if (userData.error) {
      alertModalDispatch(__setModalType(2));
      alertModalDispatch(__setModalText(userData.error.message));
      alertModalDispatch(__showAlertModal());
    } else if (userData.message) {
      alertModalDispatch(__setModalType(0));
      alertModalDispatch(__setModalText(userData.message));
      alertModalDispatch(__showAlertModal());
    }
  }, [userData]);

  return (
    <>
      <RepoList {...props} userData={userData} />
    </>
  );
};
