import { Link, useNavigate } from "react-router-dom";

export const GraphCta  = () => {
  const navigate = useNavigate();

  return (
    <div className="graph-cta-div">
      <div className="top">
        <div className="left">
          <button>
            previous week<span>{"\u2190"}</span>
          </button>
        </div>
        <div className="right">
          <button>
            <span>{"\u2192"}</span>next week
          </button>
        </div>
      </div>
      <div className="bottom">
        <div>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1, { replace: true });
            }}
          >
            {" "}
            back to repository{" "}
          </Link>
          <span>
            <svg
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_90_390" fill="white">
                <path d="M0 0H29V29H0V0Z" />
              </mask>
              <path
                d="M29 0H31V-2H29V0ZM0 2H29V-2H0V2ZM27 0V29H31V0H27Z"
                fill="#45C3AD"
                mask="url(#path-1-inside-1_90_390)"
              />
              <line
                y1="-1"
                x2="19.4454"
                y2="-1"
                transform="matrix(-0.685218 0.728338 -0.820553 -0.57157 26.6486 0.674438)"
                stroke="#45C3AD"
                strokeWidth="2"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};
