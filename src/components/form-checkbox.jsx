import { useEffect, useRef, useState } from "react";

const handleCheckState = (checkBox, fn) => {
  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      fn(true);
    } else {
      fn(false);
    }
  });
};

export const FormCheckbox = () => {
  const [isActive, setActive] = useState(false);
  const checkBox = useRef(null);
  console.log(isActive);

  useEffect(() => {
    if (checkBox) {
      handleCheckState(checkBox.current, setActive);
    }
  }, [checkBox]);

  return (
    <>
      <label
        htmlFor="remember_credentials"
        className={`credential-label${isActive ? " active" : ""}`}
      >
        <span>
          <span className="toggler-radio">
            <span>
              <span className="radio"> </span>
            </span>
          </span>
          <p>remember my credentials</p>
        </span>
      </label>
      <input
        type="checkbox"
        name="remember_credentials"
        id="remember_credentials"
        ref={checkBox}
      />
    </>
  );
};
