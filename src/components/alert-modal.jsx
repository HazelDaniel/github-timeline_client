import { alertModalContext } from "../contexts/alert-modal.context";
import { __hideAlertModal } from "../reducers/alert-modal.reducer";
import { AlertModalStyled } from "./alert-modal.styles";
import { useContext } from "react";

const alertStates = ["SUCESS", "FAILURE", "ERROR", "INFO"];

export const AlertModal = () => {
  const { alertModalState, alertModalDispatch } = useContext(alertModalContext);
  const { visible, ctaText, modalText, modalType } = alertModalState;

  return (
    <AlertModalStyled className={`alert${!visible ? " hidden" : ""}`}>
      <div
        className={`alert-frame${
          modalType === 1 || modalType === 2 ? "_fail" : ""
        }`}
      >
        <div className="frame">
          <svg>
            <use
              xlinkHref={`#alert-frame${
                modalType === 1 || modalType === 2 ? "_fail" : ""
              }`}
            ></use>
          </svg>
        </div>
        <div className="alert-body">
          <div className="alert-floater left">
            <svg>
              <use
                xlinkHref={`#alert-floater${
                  modalType === 1 || modalType === 2 ? "_fail" : ""
                }`}
              ></use>
            </svg>
          </div>
          <span
            className={`alert-frame-edge${
              modalType === 1 || modalType === 2 ? "_fail" : ""
            }`}
          >
            <svg>
              <use
                xlinkHref={`#alert-frame-edge${
                  modalType === 1 || modalType === 2 ? "_fail" : ""
                }`}
              ></use>
            </svg>
          </span>
          <span
            className={`alert-frame-edge${
              modalType === 1 || modalType === 2 ? "_fail" : ""
            }`}
          >
            <svg>
              <use
                xlinkHref={`#alert-frame-edge${
                  modalType === 1 || modalType === 2 ? "_fail" : ""
                }`}
              ></use>
            </svg>
          </span>

          <p className="alert-state">{alertStates[modalType] || "INFO"}!!</p>
          <p className="alert-text">{modalText}</p>
          <div className="alert-cta-div">
            <div className="alert-cta">
              <div className="frame">
                <svg>
                  <use
                    xlinkHref={`#alert-frame${
                      modalType === 1 || modalType === 2 ? "_fail" : ""
                    }`}
                  ></use>
                </svg>
              </div>
              <button
                onClick={() => {
                  alertModalDispatch(__hideAlertModal());
                }}
              >
                {ctaText}
              </button>
            </div>
          </div>
          <div className="alert-floater right">
            <svg>
              <use
                xlinkHref={`#alert-floater${
                  modalType === 1 || modalType === 2 ? "_fail" : ""
                }`}
              ></use>
            </svg>
          </div>
        </div>
      </div>
    </AlertModalStyled>
  );
};
