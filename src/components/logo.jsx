import { useLocation, useNavigate } from "react-router-dom";

export const Logo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="logo-div"
    >
      <img src="icons/logo.svg" alt="the site's logo" className="logo-image"
				onClick={() => {
					if (location.pathname === "/") return;
					navigate("/");
				}}
			/>
    </div>
  );
};
