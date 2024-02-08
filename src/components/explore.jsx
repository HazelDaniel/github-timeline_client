import { ExploreStyled } from "./explore.styles";


export const Explore = () => {
  return (
      <ExploreStyled className="explore">
        <div className="explore-top">
          <div className="flare"></div>
          <p>
            BE A PART OF THE <br />
            ADVENTURE
            <img src="images/rocket.png" alt="a 3d image of a rocket" />
          </p>
        </div>

        <div className="explore-bottom">
          <div className="control-segment">
            <span className="control-stick"></span>
            <div className="control">
              <span className="control-span">
                <span></span>
              </span>
              <div className="nav-label-div">
                <div className="nav-label">
                  <a href="#">EXPLORE</a>
                  <svg>
                    <use xlinkHref="#label-style"></use>
                  </svg>
                </div>
                <svg
                  viewBox="0 0 202 230"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M201 228L48.5 158.5L2.5 1.5"
                    stroke="#45C3AD"
                    strokeWidth="4"
                  />
                </svg>
              </div>
            </div>
            <span className="control-stick"></span>
          </div>

          <div className="control-segment dormant">
            <span className="control-stick"></span>
            <div className="control">
              <span className="control-span">
                <span></span>
              </span>
            </div>
            <span className="control-stick"></span>
          </div>
          <img
            src="images/metrix_1.png"
            alt="an image depicting a sci-fi like web interface"
          />
        </div>
      </ExploreStyled>
  );
}