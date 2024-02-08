import styled, { css } from "styled-components";
import {
  baseFlare,
  debug,
  makeAbsoluteBottomDiv,
  makeAbsoluteBottomLeftDiv,
  makeAbsoluteBottomRightDiv,
  makeAbsoluteTopLeftDiv,
  makeColFlexCenter,
  makeColFlexEnd,
  makeColFlexStart,
  makeFullSizeBlock,
  makeFullWidthBlock,
} from "../styles/functions";

const segment = css`
  ${makeFullWidthBlock};
  ${makeColFlexCenter};
  align-items: center;
  height: 30rem;
  position: relative;
  overflow: visible;
`;
export const ExploreStyled = styled.section`
  height: max-content;
  min-height: 60rem;
  ${makeFullWidthBlock};
  ${makeColFlexStart};
  align-items: center;

  .explore-top {
    ${segment};
    .flare {
      ${baseFlare};
      left: 0;
      bottom: 20%;
    }
    p {
      position: relative;
      height: 20rem;
      text-align: center;
      ${makeColFlexStart};
      align-items: center;
      font-size: 3rem;
      font-family: jura_bold;
      color: var(--accent-color);
      img {
        display: unset;
        height: 20rem;
        ${makeAbsoluteTopLeftDiv};
        left: -11rem;
        top: -72%;
        z-index: -3;
      }
    }
  }
  .explore-bottom {
    ${segment};
    flex-direction: row !important;
    justify-content: space-around !important;
    overflow: hidden !important;
    img {
      ${makeAbsoluteBottomRightDiv};
      bottom: -20%;
      filter: sepia(0.9);
      z-index: -1;
    }
    .control-segment {
      width: 20rem;
      position: relative;

      .control {
        height: 5rem;
        width: 5rem;
        ${makeColFlexStart};
        align-items: center;
        position: relative;
        transform: scale(0.8);
        margin-left: 20%;

        .control-span {
          height: 4rem;
          width: 4rem;
          border-radius: 50%;
          // cursor: pointer;
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
          transform-origin: bottom;
          right: -350%;
          transition: all 0.3s ease-in-out;
          .nav-label {
            height: 30%;
            width: 25rem;
            align-self: center;
            ${makeColFlexCenter};
            // cursor: pointer;
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
              margin-left: 35rem;
              & + svg {
                margin-left: 18rem;
              }
              &::after {
                ${makeAbsoluteTopLeftDiv};
                ${makeFullSizeBlock};
                left: 11%;
                width: 82%;
                background: linear-gradient(
                  to bottom,
                  var(--accent-color_trans) 10%,
                  transparent
                );
                z-index: -1;
              }
            }
            svg {
              display: block !important;
              ${makeAbsoluteBottomLeftDiv};
              ${makeFullWidthBlock};
              transform: scale(1.3, 1.5);
              transform-origin: bottom;
            }
          }
          svg {
            height: 70%;
            margin-right: 15%;
            transform: scaleX(-1);
          }
          & > svg {
            transform: scaleX(-1) rotateZ(-10deg);
            margin-bottom: 3rem;
          }
        }
      }
      .control-stick {
        ${makeAbsoluteBottomDiv};
        height: 0.5rem;
        width: 80%;
        background-color: var(--dull-trans-color);
        border-radius: 2rem;
        opacity: 0.5;
        &:nth-of-type(1) {
          left: -10%;
          width: 5rem;
          transform: rotateZ(43deg);
          bottom: 120%;
        }
        &:nth-of-type(2) {
          width: 12rem;
          right: -20%;
          bottom: 35%;
        }
      }

      &.dormant {
        .control {
          margin-left: 50%;
        }
        .control-stick {
          &:nth-of-type(1) {
            left: -20%;
            width: 12rem;
            transform: unset;
            bottom: 35%;
          }
          &:nth-of-type(2) {
            width: 5rem;
            right: -15%;
            bottom: 35%;
          }
        }
      }
    }
  }
`;
