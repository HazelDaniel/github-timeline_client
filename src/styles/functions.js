import { createGlobalStyle, css, keyframes } from "styled-components";

//FUNCTIONS
export const removeScrollBar = () => css`
  &::-webkit-scrollbar {
    display: none !important;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
`;
export const makeUnSelectableTextDiv = () => css`
  &::selection {
    background-color: transparent;
  }
  * {
    &::selection {
      background-color: transparent;
    }
  }
`;
export const debug = css`
  border: 0.1rem solid red;
  background-color: #0000ff44;
`;
export const makeFlexCenter = css`
  display: flex;
  align-items: center;
`;
export const makeFlex = css`
  display: flex;
  align-items: center;
`;
export const makeFlexEnd = css`
  display: flex;
  align-items: flex-end;
`;
export const makeRowFlex = css`
  display: flex;
  flex-direction: row;
`;
export const makeRowFlexStart = css`
  ${makeRowFlex};
  flex-direction: row;
  justify-content: flex-start;
`;
export const makeRowFlexCenter = css`
  ${makeFlex};
  flex-direction: row;
  justify-content: center;
`;
export const makeRowFlexEnd = css`
  ${makeFlex};
  flex-direction: row;
  justify-content: flex-end;
`;
export const makeColFlexStart = css`
  ${makeFlex};
  flex-direction: column;
  justify-content: flex-start;
`;
export const makeColFlexCenter = css`
  ${makeFlex};
  flex-direction: column;
  justify-content: center;
`;
export const makeColFlexEnd = css`
  ${makeFlex};
  flex-direction: column;
  justify-content: flex-end;
`;
export const makeFullWidthBlock = css`
  display: block;
  width: 100%;
`;
export const makeFullHeightBlock = css`
  display: block;
  height: 100%;
`;
export const makeFullSizeBlock = css`
  ${makeFullWidthBlock};
  ${makeFullHeightBlock};
`;
export const makeAbsoluteDiv = css`
  position: absolute;
  content: "";
`;
export const makeAbsoluteTopDiv = css`
  ${makeAbsoluteDiv};
  top: 0;
`;
export const makeAbsoluteTopRightDiv = css`
  ${makeAbsoluteTopDiv};
  right: 0;
`;
export const makeAbsoluteTopLeftDiv = css`
  ${makeAbsoluteTopDiv};
  left: 0;
`;
export const makeAbsoluteBottomDiv = css`
  ${makeAbsoluteDiv};
  bottom: 0;
`;
export const makeAbsoluteBottomRightDiv = css`
  ${makeAbsoluteBottomDiv};
  right: 0;
`;
export const makeAbsoluteBottomLeftDiv = css`
  ${makeAbsoluteBottomDiv};
  left: 0;
`;
export const makeMainContainer = css`
  margin-top: 5rem;
  ${makeFullWidthBlock};
  ${makeColFlexStart};

  height: max-content;
  position: relative;
  min-height: 100vh;
`;

export const floating = css`
  border-radius: 50%;
  background-color: var(--floater-color);
  backdrop-filter: blur(2px);
  opacity: 0.8;
`;

export const baseFlare = css`
  ${makeAbsoluteBottomLeftDiv};
  left: 10%;
  height: 80vw;
  width: 120vw;
  border-radius: 50%;
  z-index: -2;
  background: radial-gradient(
    circle at 50% 50%,
    var(--accent-color_trans),
    transparent
  );
  background: radial-gradient(
    45.19% 45.19% at 47.91% 57.12%,
    #45c3ad21 0%,
    #00000000 100%
  );
  transform: translate(-20%, 30%);
  opacity: 0.8;
`;

const slideUpMediumFrame = keyframes`
  from {
    transform: translateY(10%);
  }
  to {
    transform: translateY(0);
  }
`;
const slideInMediumFrame = keyframes`
  from {
    transform: translateX(20%);
  }
  to {
    transform: translateX(0);
  }

`;
const slideUpHardFrame = keyframes`
  from {
    transform: translateY(30%);
  }
  to {
    transform: translateY(0);
  }

`;
const slideInHardFrame = keyframes`
  from {
    transform: translateX(50vw);
  }
  to {
    transform: translateX(0);
  }
`;

export const slideUpMedium = css`
  transform: translateY(0%);

  &.slide_up {
    animation-name: ${slideUpMediumFrame};
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
`;

export const slideInMedium = css`
  transform: translateX(0%);

  &.slide_up {
    animation-name: ${slideInMediumFrame};
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
`;

export const slideUpHard = css`
  transform: translateY(0%);

  &.slide_up {
    animation-name: ${slideUpHardFrame};
    animation-duration: 1.2s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
`;

export const slideInHard = css`
  transform: translateX(0%);

  &.slide_up {
    animation-name: ${slideInHardFrame};
    animation-duration: 0.3s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
`;

const raiseUpFrame = keyframes`
  from {
    opacity: 1;
  }
  25% {
    transform: rotateZ(30deg) translate(-2rem, 5rem);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  to {
    transform: unset;
    opacity: 1;
  }
`;

export const raiseUp = css`
  transform: unset;

  &.raise_up {
    animation-name: ${raiseUpFrame};
    animation-duration: 0.8s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
`;

// GLOBALS
export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: jura_regular;
  src: url("fonts/Jura-VariableFont_wght.ttf");
}

@font-face {
  font-family: poppins_bold;
  src: url("fonts/Poppins-Bold.ttf");
}

@font-face {
  font-family: jura_bold;
  src: url("fonts/Jura-Bold.ttf");
}

@font-face {
  font-family: manjari_regular;
  src: url("fonts/Manjari-Regular.ttf");
}

@font-face {
  font-family: manjari_bold;
  src: url("fonts/Manjari-Bold.ttf");
}

@font-face {
  font-family: manjari_thin;
  src: url("fonts/Manjari-Thin.ttf");
}

@font-face {
  font-family: montserrat_regular;
  src: url("fonts/Montserrat-Regular.ttf");
}

@font-face {
  font-family: poppins_regular;
  src: url("fonts/Poppins-Regular.ttf");
}

:root {
  --flare-color: #14251f;
  --bg-color: #17181f;
  --bright-color: #ffffff;
  --dull-trans-color: #b5b5b5ee;
  --accent-color: #45c3ad;
  --accent-color_trans: #45c3ae98;
  --floater-color: #45c3ae09;
  --accent-color-bright: #43edcf;
  --dark-color-fade: #0000002d;
  --footer-color: #020706;
  --license-color: #deffbd;
  --dull-color: #d8d8d8;
  --repo-link-border-color: #8385895d;
  --dark-bg-color: #121219;
  --author: "HazelDaniel";

  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;

  color-scheme: light dark;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  max-width: 100vw;
  position: relative;
  cursor: ${({ $page }) => {
    if ($page != "/app") return "none";
    return `url("icons/mouse.svg") 30 30, auto`;
  }};
}
a {
  cursor: pointer;
}

html {
  max-width: 100vw;
  width: 100vw;
  cursor: none;
  overflow-x: hidden;
  scroll-behavior: smooth;
  li {
    list-style-type: none;
  }
  font-size: 10px;

  @media screen and (min-width: 1500px) {
    font-size: 15px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 12px;
  }
  @media screen and (max-width: 756px) {
    font-size: 8px;
  }
  @media screen and (max-width: 480px) {
    font-size: 6px;
  }
}

body,#root {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  background: linear-gradient(
    to bottom left,
    var(--bg-color) 70%,
    var(--flare-color) 100%
  );
  height: max-content;
  ${removeScrollBar};
}

#custom-mouse {
  position: absolute;
  width: 5rem;
  height: 5rem;
  max-width: 50px;
  max-height: 50px;
  // border: 0.05rem solid var(--accent-color);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: background-color 0.3s ease;
  z-index: 99;
  align-items: center;
  ${makeColFlexCenter};
  display: ${({ $page }) => {
    if ($page === "/app") return "none";
    return "flex";
  }};
  box-shadow: 0.2rem 0.2rem 2.5rem var(--accent-color_trans),
    0.1rem -0.5rem 2rem black;
  span {
    &.visible {
      width: 1rem;
      height: 1rem;
      border-radius: inherit;
      background-color: var(--accent-color-bright);
      background: radial-gradient(var(--accent-color-bright) 5%, transparent);
    }
  }
}

.floating {
  border-radius: 50%;
  background-color: var(--floater-color);
  backdrop-filter: blur(2px);
  opacity: 0.8;
}
header {
  ${makeFullWidthBlock};
  height: 10rem;
  ${makeRowFlexStart};
  position: relative;
  .logo-div {
    ${makeFullSizeBlock};
    ${makeRowFlexStart};
    align-items: center;
    background: linear-gradient(to bottom, #000008ea 80%, transparent 100%);
    img {
      height: 5rem;
      object-fit: cover;
      transform: scale(0.8);
    }
  }
  .search-icon-div {
    width: 15rem;
    height: 6rem;
    ${makeAbsoluteBottomRightDiv};
    bottom: 20%;
    border-top-left-radius: 3rem;
    cursor: pointer;
    background: linear-gradient(
      -83deg,
      var(--accent-color-bright) 5%,
      transparent
    );

  ${makeColFlexCenter};
    // cursor: pointer;
    svg {
      height: 60%;
      cursor: pointer;
    }
  }
}
.base_flare {
}

.scroll-handle {
  ${makeFullWidthBlock};
  ${makeRowFlexStart};
  height: max-content;
  &.flipped {
    transform: scaleX(-1);
  }
  .hub {
    width: 1.5rem;
    height: 1.5rem;
    border: 0.1rem solid var(--bright-color);
  }
  .line {
    flex: 1;
    min-width: auto;
    height: 0.1rem;
    background-color: var(--bright-color);
  }
}



footer {
  ${makeFullWidthBlock};
  height: max-content;
  min-height: 35rem;
  background-color: var(--footer-color);
  ${makeColFlexStart};
  align-items: flex-start;
  padding: 0 5rem;
  justify-content: space-between;
  .footer-top {
    ${makeFullWidthBlock};
    ${makeColFlexStart};
    align-items: flex-start;
    height: max-content;
    min-height: 15rem;
    margin-top: 5rem;
    img {
      width: 8rem;
      transform: scale(0.8);
      margin-bottom: 1rem;
    }
    h4 {
      font-size: 1.3rem;
      font-family: jura_regular;
      color: #d8d8d8;
      font-weight: lighter;
      padding-left: 1.8rem;
    }
  }
  .footer-bottom {
    ${makeFullWidthBlock};
    ${makeColFlexCenter};
    height: 8rem;
    p {
      ${makeFullWidthBlock};
      font-size: 1.2rem;
      color: var(--bright-color);
      font-family: jura_regular;
      &:first-of-type {
        margin-bottom: 2rem;
        margin-left: 3rem;
        a {
          font-weight: bolder;
          text-decoration: none;
          color: inherit;
        }
      }
      &:last-of-type {
        font-family: poppins_regular;
        text-align: center;
        justify-self: flex-end !important;
        margin-bottom: 0;
        opacity: 0.7;
      }
    }
  }
}

`;
