import { useParallax } from "react-scroll-parallax";
import { MottoStyled } from "./motto.styled";

export const Motto = () => {
  const parallaxTitle = useParallax({
    translateY: [200, 0],
    easing: "easeOutQuad",
    speed: 3.2,
  });
  return (
    <MottoStyled className="moto-section">
      <p ref={parallaxTitle.ref}>
        Viewing your github repository through a lens ...
      </p>
      <span className="floater">
        <span></span>
      </span>
      <div className="flare"></div>
      <div className="web-nexus">
        <img
          src="images/metrix_1.png"
          alt="an image depicting a sci-fi like web interface "
        />
      </div>
    </MottoStyled>
  );
};
