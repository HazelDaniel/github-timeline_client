import { Outlet, useLocation } from "react-router-dom";
import { GlobalStyle } from "./styles/functions";
import { CustomMouse } from "./components/custom-mouse";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

export const user = null;

function App() {
  const location = useLocation();

  return (
    <>
      <GlobalStyle $page={location.pathname} />
      <CustomMouse />
      <Nav />
      <Header />

      <Outlet />

      <Footer />
    </>
  );
}

export default App;
