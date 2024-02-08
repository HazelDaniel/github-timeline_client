import styled from "styled-components";
import {
  makeAbsoluteBottomRightDiv,
  makeAbsoluteBottomLeftDiv,
  makeColFlexCenter,
  makeFullSizeBlock,
  makeColFlexStart,
  makeFullWidthBlock,
  makeAbsoluteBottomDiv,
  makeAbsoluteTopLeftDiv,
  makeColFlexEnd
} from "../styles/functions";

export const NavStyled = styled.nav`
  position: fixed;
  top: 20vh;
  @media screen and (max-height: 300px) {
    top: 0;
    transform: scale(0.6);
  }
  @media screen and (max-height: 700px) and (min-width: 800px) {
    top: 0;
    transform: scale(0.6);
  }
  right: 2rem;
  z-index: 6;
  height: clamp(50rem, 80vh, 60rem);
  width: 5rem;
  @media screen and (max-width: 480px) {
    width: 7rem;
  }
  overflow: visible;
  ${makeColFlexStart};
  align-items: center;
  justify-content: space-evenly;
  .control-stick {
    background-color: var(--dull-trans-color);
    width: 0.5rem;
    height: 3rem;
    border-radius: 2rem;
    ${makeAbsoluteBottomDiv};
    left: 50%;
    opacity: 0.7;
    transform: translateX(-50%);
    &:first-of-type {
      bottom: 90%;
      height: 6rem;
    }
    &:nth-of-type(3) {
      bottom: 54%;
      height: 10rem;
    }
    &:nth-of-type(5) {
      bottom: 27%;
      height: 3rem;
    }
  }
  .control {
    ${makeFullWidthBlock};
    ${makeColFlexStart};
    align-items: center;
    position: relative;
    &:first-of-type {
      justify-self: flex-start !important;
      margin-bottom: auto;
      margin-top: 150%;
    }
    &:nth-of-type(2) {
      margin-bottom: 200%;
    }
    &:hover {
      .nav-label-div {
        transform: translateY(-10%); // animation
        right: 0;
        opacity: 1;
      }
    }
    .control-span {
      height: 4rem;
      width: 4rem;
      border-radius: 50%;
      position: relative;
      ${makeColFlexCenter};
      align-items: center;
      border: 0.1rem solid var(--accent-color);
      box-shadow: 0.1rem 0.1rem 0.8rem var(--accent-color_trans);
      &.active {
        &::before {
          ${makeAbsoluteTopLeftDiv};
          ${makeFullSizeBlock};
          transform: scale(1.7);
          border-radius: inherit;
          outline: 0.05rem solid var(--accent-color);
          opacity: 0.1;
        }
      }
      span {
        ${makeFullSizeBlock};
        transform: scale(0.75);
        border-radius: inherit;
        background-color: var(--accent-color);
      }
    }
    .nav-label-div {
      ${makeAbsoluteBottomRightDiv};
      z-index: -1;
      width: 40rem;
      height: 20rem;
      ${makeColFlexEnd};
      align-items: flex-end;
      transform: translateY(45%) scale(0) rotateZ(-85deg);
      transform-origin: bottom;
      right: -350%;
      opacity: 0;
      transition: all 0.3s ease-in-out;
      .nav-label {
        height: 30%;
        width: 25rem;
        align-self: center;
        ${makeColFlexCenter};
        position: relative;
        a {
          font-size: 2rem;
          font-family: manjari_regular;
          font-weight: bolder;
          color: var(--accent-color-bright);
          text-align: center;
          ${makeFullSizeBlock};
          ${makeColFlexCenter};
          align-items: center;
          transform: scaleX(1.07);
          transform-origin: center;
          position: relative;
          text-decoration: none;
          z-index: 2;
          &::after {
            ${makeAbsoluteTopLeftDiv};
            ${makeFullSizeBlock};
            background: linear-gradient(
              to bottom,
              var(--accent-color_trans) 10%,
              transparent
            );
            z-index: -1;
          }
        }
        svg {
          ${makeAbsoluteBottomLeftDiv};
          ${makeFullWidthBlock};
          transform: scale(1.3, 1.5);
          transform-origin: bottom;
        }
      }
      svg {
        height: 70%;
        margin-right: 15%;
      }
    }
  }
`;
