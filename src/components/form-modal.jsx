export const FormModal = () => {
  return (
    <div className="form-modal-div">
      <div className="form-modal-div-left">
        <img
          src="icons/astro-tied.svg"
          alt="svg image of an astronaut tied to a rope"
        />
      </div>
      <div className="form-modal-div-right">
        <span className="form-cancel">
          <svg
            viewBox="0 0 53 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1.37157"
              y1="0.416167"
              x2="52.2431"
              y2="56.9147"
              stroke="white"
            />
            <line
              x1="0.628672"
              y1="56.9147"
              x2="51.5002"
              y2="0.416137"
              stroke="white"
            />
          </svg>
        </span>

        <form>
          <label htmlFor="username">GITHUB USERNAME</label>
          <input type="text" name="username" id="username" />
          <label htmlFor="password">USER PASSWORD</label>
          <input type="password" name="password" id="password" />
          <label htmlFor="remember_credentials">
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
          />
          <button type="submit">
            <p>REGISTER</p>
            <svg>
              <use xlinkHref="#label-style"></use>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};
