import { HeroStyled } from "./hero.styles";
import { Slider } from "./slider";

export const Hero = () => {
  return (
    <HeroStyled className="hero">
      <div className="hero-timeline-mark-div">
        <span className="hero-timeline-glow">
          <span></span>
        </span>
        <div className="hero-timeline-mark1"></div>
        <div className="hero-timeline-mark2"></div>
      </div>

      <div className="hero-timeline-text-div">
        <h3>00/00/00</h3>
        <h1>Github</h1>
        <h2>timeline</h2>
      </div>
      <div className="hero-image-div">
        <img
          src="images/github-globe.png"
          alt="image depicting a globe behind the github octopus"
          className="hero-image"
          draggable="false"
        />

        <Slider />
      </div>
      <div className="hero-picture-completion">
        <img src="images/Rectangle-25.png" alt="" draggable="false" />
      </div>
    </HeroStyled>
  );
};
