import { Outlet, useLocation } from "react-router-dom";
import { GlobalStyle } from "./styles/functions";
import { CustomMouse } from "./components/custom-mouse";
import { Nav } from "./components/nav";

function App() {
  const location = useLocation();

  return (
    <>
      <GlobalStyle $page={location.pathname} />
      <CustomMouse />
      <Nav />
      <header>
        <div className="logo-div">
          <img
            src="icons/logo.svg"
            alt="the site's logo"
            className="logo-image"
          />
        </div>
      </header>
      <Outlet />

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
    </>
  );
}

export default App;
