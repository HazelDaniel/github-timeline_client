import { useLocation, useNavigate } from "react-router-dom";
import { FormCheckbox } from "./form-checkbox";
import { FormModalStyled } from "./form-modal.styles";

import { getGitHubUsername, storeGitHubUsername, userInfo } from "../data";
import { useRef } from "react";

const handleSignin = (target, btn) => {
  let rememberCredentials = null;
  let username = null;
  btn.disabled = true;
  const formData = new FormData(target);
  username = formData.get("username");
  rememberCredentials = formData.get("remember_credentials");
  userInfo.username = username;

  if (rememberCredentials) {
    (async () => {
      try {
        const newUsername = await storeGitHubUsername(userInfo);
        console.log("New username stored:", newUsername);
      } catch (err) {
        console.error(err);
        alert(err.message);
      } finally {
        btn.disabled = false;
      }
    })();
  }
};


const handleSignUp = (target, btn) => {
  let password;
  btn.disabled = true;
  // const fields = ["password", "username", "remember_credentials"];
  const formData = new FormData(target);
  password = formData.get("password");
  console.log(formData.get("username"));
  console.log(formData.get("remember_credentials"));
  btn.disabled = false;
};

export const FormModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const buttonRef = useRef(null);

  return (
    <FormModalStyled className="form-modal-div">
      <div className="form-modal-overlay"> </div>
      <div className="modal-wrapper">
        <div className="left">
          <img
            src="icons/astro-tied.svg"
            alt="svg image of an astronaut tied to a rope"
          />
        </div>
        <div className="right">
          <span
            className="form-cancel"
            onClick={() => navigate("/", { replace: true })}
          >
            <svg
              viewBox="0 0 53 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="1.37157" y1="0.416167" x2="52.2431" y2="56.9147" />
              <line x1="0.628672" y1="56.9147" x2="51.5002" y2="0.416137" />
            </svg>
          </span>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (location.pathname === "/signin") {
                return handleSignin(e.target, buttonRef?.current);
              } else {
                return handleSignUp(e.target, buttonRef?.current);
              }
            }}
          >
            <label htmlFor="username">GITHUB USERNAME</label>
            <input type="text" name="username" id="username" required />

            {location.pathname === "/signup" ? (
              <>
                <label htmlFor="password">USER PASSWORD</label>
                <input type="password" name="password" id="password" />
              </>
            ) : null}

            <FormCheckbox />

            <button type="submit" ref={buttonRef}>
              <p>{location.pathname === "/signup" ? "REGISTER" : "SIGN IN"}</p>
              <svg>
                <use xlinkHref="#label-style"></use>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </FormModalStyled>
  );
};
