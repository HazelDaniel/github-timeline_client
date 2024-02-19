import { ALERT_INFO } from "../data";
import { isEqual } from "../utils/comparison";

const AlertActionTypes = {
  showModal: "SHOW_MODAL",
  hideModal: "HIDE_MODAL",
  setModalType: "SET_MODAL_TYPE",
  setModalText: "SET_ALERT_TEXT",
  setCtaText: "SET_CTA_TEXT",
};

export const initialModalState = {
  modalType: ALERT_INFO,
  modalText: "no alert message",
  ctaText: "QUIT",
  visible: false,
};

export const alertModalReducer = (state = initialModalState, action) => {
  let newState = { ...state, ...(action.payload && action.payload) };
  switch (action.type) {
    case AlertActionTypes.showModal:
      return { ...newState, visible: true };
    case AlertActionTypes.hideModal:
      return { ...newState, visible: false };
    default:
      if (isEqual(newState, state)) return state;
      return newState;
  }
};

export const __showAlertModal = () => {
  return {
    type: AlertActionTypes.showModal,
  };
};

export const __hideAlertModal = () => {
  return {
    type: AlertActionTypes.hideModal,
  };
};

export const __setModalType = (type) => {
  return {
    type: AlertActionTypes.setModalType,
    payload: { modalType: type },
  };
};

export const __setModalText = (text) => {
  return {
    type: AlertActionTypes.setModalText,
    payload: { modalText: text },
  };
};

export const __setCtaText = (text) => {
  return {
    type: AlertActionTypes.setCtaText,
    payload: { ctaText: text },
  };
};
