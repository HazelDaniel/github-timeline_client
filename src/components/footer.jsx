import { memo } from "react";

export const Footer = memo(function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <img
          src="icons/logo.svg"
          alt="the logo image in svg format"
          className="footer-image"
        />
        <h4>VIewing your github repository through a lens ...</h4>
      </div>
      <div className="footer-bottom">
        <p>
          made with love by
          <a href="https://www.github.com/HazelDaniel">Hazel Daniel</a>
        </p>
        <p>copyright &copy; 2024. All rights reserved</p>
      </div>
    </footer>
  );
});
