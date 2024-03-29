import { NavStyled } from "./nav.styles";
import { Link } from "react-router-dom";
import { memo, useContext } from "react";
import { alertModalContext } from "../contexts/alert-modal.context";
import {
  __setModalText,
  __setModalType,
  __showAlertModal,
} from "../reducers/alert-modal.reducer";

export const Nav = memo(function Nav() {
  const { alertModalDispatch } = useContext(alertModalContext);
  return (
    <NavStyled>
      <div className="control-stick"></div>
      <div className="control">
        <span className="control-span active">
          <span></span>
        </span>
        <div className="nav-label-div">
          <div className="nav-label">
            <Link
              to="/signup"
              onClick={(e) => {
                e.preventDefault();
                alertModalDispatch(__setModalType(3));
                alertModalDispatch(__setModalText("Feature coming soon !"));
                alertModalDispatch(__showAlertModal());
              }}
            >
              SIGN UP
            </Link>
            <svg>
              <use xlinkHref="#label-style"></use>
            </svg>
          </div>
          <svg
            viewBox="0 0 202 230"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M201 228L48.5 158.5L2.5 1.5"
              stroke="#45C3AD"
              strokeWidth="4"
            />
          </svg>
        </div>
      </div>

      <div className="control-stick"></div>
      <div className="control">
        <span className="control-span">
          <span></span>
        </span>
        <div className="nav-label-div">
          <div className="nav-label">
            <Link to="/signin">LOGIN</Link>
            <svg>
              <use xlinkHref="#label-style"></use>
            </svg>
          </div>
          <svg
            viewBox="0 0 202 230"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M201 228L48.5 158.5L2.5 1.5"
              stroke="#45C3AD"
              strokeWidth="4"
            />
          </svg>
        </div>
      </div>

      <div className="control-stick"></div>
      <div className="control">
        <span className="control-span">
          <span></span>
        </span>
        <div className="nav-label-div">
          <div className="nav-label">
            <Link to="/app">APP</Link>
            <svg>
              <use xlinkHref="#label-style"></use>
            </svg>
          </div>
          <svg
            viewBox="0 0 202 230"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M201 228L48.5 158.5L2.5 1.5"
              stroke="#45C3AD"
              strokeWidth="4"
            />
          </svg>
        </div>
      </div>
    </NavStyled>
  );
});
