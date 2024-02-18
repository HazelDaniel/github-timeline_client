import { ALERT_INFO } from "../data";
import { isEqual } from "../utils/comparison";

const AlertActionTypes = {
  showModal: "SHOW_MODAL",
  hideModal: "HIDE_MODAL",
  setModalType: "SET_MODAL_TYPE",
  setCtaText: "SET_CTA_TEXT",
};

export const initialModalState = {
  modalType: ALERT_INFO,
  text: "no alert message",
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

// export const __changeGraphType = () => {
//   return {
//     type: GraphActionTypes.setGraphType,
//   };
// };

// export const __setBarType = () => {
//   return {
//     type: GraphActionTypes.setBarType,
//   };
// };

// export const __setLineType = () => {
//   return {
//     type: GraphActionTypes.setLineType,
//   };
// };

// export const __setDateInterval = (dateInterval) => {
//   return {
//     type: GraphActionTypes.setDateInterval,
//     payload: dateInterval,
//   };
// };
