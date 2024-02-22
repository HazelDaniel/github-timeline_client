import { ParallaxProvider } from "react-scroll-parallax";
import { About } from "../components/about";
import { Explore } from "../components/explore";
import { Hero } from "../components/hero";
import { Motto } from "../components/motto";

export const Index = () => {
  return (
    <>
      <ParallaxProvider>
      <Hero />
        <Motto />
        <About />
      </ParallaxProvider>

      <Explore />
    </>
  );
};
