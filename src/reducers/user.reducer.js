import { userInfo } from "../data";
import { shallowEqual } from "../utils/comparison";
// import { shallowEqual } from "../utils/comparison";

const userActionTypes = {
  updateUser: "UPDATE_USER",
  // setBarType: "SET_BAR_TYPE",
  // setLineType: "SET_LINE_TYPE",
};

export const initialUserState = userInfo;

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case userActionTypes.updateUser:
      return { ...action.payload };
    default:
      return state;
  }
};

export const __updateUser = (user) => {
  return {
    type: userActionTypes.updateUser,
    payload: user,
  };
};
