import { MottoStyled } from "./motto.styled";

export const Motto = () => {
  return (
      <MottoStyled className="moto-section">
        <p>Viewing your github repository through a lens ...</p>
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
}