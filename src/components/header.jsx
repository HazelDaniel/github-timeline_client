import { memo } from "react";

export const Header = memo(function Header () {
  return (
      <header>
        <div className="logo-div">
          <img
            src="icons/logo.svg"
            alt="the site's logo"
            className="logo-image"
          />
        </div>
      </header>
  );
});