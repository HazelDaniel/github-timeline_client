import { useLocation } from "react-router-dom";
import { AlertModalStyled } from "./alert-modal.styles";
import { useState } from "react";

const alertStates = ["SUCESS", "FAILURE", "ERROR"];

export const AlertModal = () => {
  const [isHidden, setHidden] = useState(false);
  const location = useLocation();
  const hash = location.hash;
  const alert = location.state;

  // console.log("hash is ", hash);
  // console.log("state is ", alert);

  return (
    <AlertModalStyled
      className={`alert${isHidden ? " hidden" : ""}`}
    >
      <div className="alert-frame">
        <div className="alert-body">
          <div className="alert-floater left">
            <svg>
              <use xlinkHref="#alert-floater"></use>
            </svg>
          </div>
          <span className="alert-frame-edge">
            <svg>
              <use xlinkHref="#alert-frame-edge"></use>
            </svg>
          </span>
          <span className="alert-frame-edge">
            <svg>
              <use xlinkHref="#alert-frame-edge"></use>
            </svg>
          </span>

          <p className="alert-state">{alertStates[alert?.state] || "INFO"}!!</p>
          <p className="alert-text">{alert?.text || "no alert message"}</p>
          <div className="alert-cta-div">
            <div className="alert-cta">
              <button
                onClick={() => {
                  if (alert?.action)
                    alert.action(...(alert.args && alert.args));
                  setHidden(true);
                }}
              >
                QUIT
              </button>
            </div>
          </div>
          <div className="alert-floater right">
            <svg>
              <use xlinkHref="#alert-floater"></use>
            </svg>
          </div>
        </div>
      </div>
    </AlertModalStyled>
  );
};
