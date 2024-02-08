import styled, { css } from "styled-components";
import {
  debug,
  makeAbsoluteBottomDiv,
  makeAbsoluteBottomLeftDiv,
  makeAbsoluteTopLeftDiv,
  makeColFlexEnd,
  makeColFlexStart,
  makeFullSizeBlock,
  makeFullWidthBlock,
  makeRowFlexCenter,
  makeRowFlexStart,
  makeUnSelectableTextDiv,
} from "../styles/functions";

export const floater = css`
  ${makeAbsoluteBottomLeftDiv};
  ${makeRowFlexStart};
  ${makeFullWidthBlock};
  min-width: 90vw;
  align-items: center;
  height: 10rem;
  bottom: 20%;
  justify-content: center;
  z-index: 3;
`;

export const HeroStyled = styled.section`
  ${makeFullWidthBlock};
  ${makeColFlexStart};
  ${makeUnSelectableTextDiv};
  align-items: center;
  margin-top: -2rem;
  height: 70vh;
  min-height: 60rem;
  max-height: 90vh;

  &::before {
    ${makeFullSizeBlock};
    ${makeAbsoluteBottomLeftDiv};
    background-color: #000000c0;
    z-index: 2;
  }
  .hero-timeline-mark-div {
    ${makeAbsoluteBottomLeftDiv};
    ${makeColFlexEnd};
    min-height: 25rem;
    width: 1rem;
    z-index: 5;
    margin-left: 2%;
    width: 0.5rem;
    bottom: 45%;
    overflow: visible;

    .hero-timeline-glow {
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      margin-bottom: 1.5rem;
      background-color: var(--accent-color);
      position: relative;
      &::before {
        ${makeFullSizeBlock};
        ${makeAbsoluteTopLeftDiv};
        transform: scale(1.3) translate(-0.1rem, -0.1rem);
        border: 0.1rem solid var(--accent-color);
        border-radius: inherit;
        transform-origin: center;
        box-shadow: 0.05rem 0.1rem 1.1rem var(--accent-color_trans);
        // cursor: pointer;
      }
    }
    div {
      ${makeFullWidthBlock};
      background-color: var(--dull-trans-color);
      border-radius: 2rem;
      &:first-of-type {
        margin-bottom: 1rem;
        height: 13rem;
      }
      &:last-of-type {
        height: 10rem;
      }
    }
  }

  .hero-timeline-text-div {
    ${makeAbsoluteBottomLeftDiv};
    ${makeColFlexStart};
    align-items: flex-start;
    bottom: 58%;
    @media screen and (max-width: 480px) {
      bottom: 52%;
    }
    left: 6rem;
    width: max-content;
    min-width: 20rem;
    height: max-content;
    min-height: 20rem;
    z-index: 4;
    h3 {
      font-size: 1.3rem;
      font-family: jura_regular;
      color: var(--dull-trans-color);
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 3.5rem;
      text-transform: uppercase;
      font-family: poppins_bold;
      margin-left: 20%;
      color: var(--bright-color);
      margin-bottom: 0.5rem;
    }
    h2 {
      font-family: jura_regular;
      font-size: 3.5rem;
      margin-left: 55%;
      color: var(--accent-color);
      font-weight: lighter;
    }
  }

  .hero-image-div {
    ${makeFullSizeBlock};
    ${makeColFlexStart};
    overflow: visible;
    position: relative;

    img {
      ${makeFullSizeBlock};
      object-fit: cover;
      aspect-ratio: 5/3;
      filter: sepia(0.9);
      filter: grayscale(0.8);
    }
    &-slider-facade {
      ${floater};
      z-index: 4 !important;
      ${makeRowFlexCenter};
      align-items: center;
      & > * {
        background-color: transparent;
      }
      input {
        width: 91%;
        height: 100%;
        transform: translateX(2%);
        margin-right: auto; // react addition
        -webkit-appearance: none;
        opacity: 0;
        /* ${debug}; */
      }
    }
    .hero-timeline-slider {
      ${floater};
      /* ${debug}; */
      span {
        height: 3rem;
        width: 0.5rem;
        position: relative;
        display: inline-flex;
        background-color: var(--dull-trans-color);
        margin: 0 2.8%;
        border-radius: 2rem;
        transition: all 0.2s ease-out;
        // cursor: pointer;
        &:first-of-type {
          margin: unset;
          margin: 0 1%;
          margin-left: 2%;
        }
        &:last-of-type {
          margin-left: 1%;
          @media screen and (max-width: 380px) {
            display: none;
          }
        }
        &.stretched {
          height: 6rem;
          margin-bottom: -3rem;
        }
        &.elevate {
          transform: translateY(-3rem);
        }
        &.elevate-subtle {
          transform: translateY(-1rem);
        }
        p {
          ${makeAbsoluteBottomDiv};
          width: max-content;
          height: 3rem;
          left: -200%;
          bottom: -5rem;
          font-family: jura_regular;
          font-size: 1.3rem;
          color: var(--bright-color);
        }
      }
    }
  }
  .hero-picture-completion {
    ${makeAbsoluteBottomDiv};
    ${makeFullWidthBlock};
    bottom: -11rem;
    z-index: 5;
    image-rendering: crisp-edges;
    background: linear-gradient(to bottom, black, transparent);
    img {
      background: linear-gradient(to bottom, black, transparent);
      opacity: 0.8;
      filter: saturate(0.9);
      mix-blend-mode: difference;
    }
  }
`;
