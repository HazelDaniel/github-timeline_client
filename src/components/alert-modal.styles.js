import styled from "styled-components";
import {
  debug,
  makeAbsoluteTopDiv,
  makeAbsoluteTopLeftDiv,
  makeAbsoluteTopRightDiv,
  makeColFlexCenter,
  makeColFlexStart,
  makeFullHeightBlock,
  makeFullSizeBlock,
  makeFullWidthBlock,
  makeRowFlexCenter,
  makeRowFlexEnd,
  makeRowFlexStart,
  makeUnSelectableTextDiv,
  removeTapHighlight,
} from "../styles/functions";

export const AlertModalStyled = styled.div`
  width: 60rem;
  height: 30rem;
  top: 15%;
  @media screen and (max-width: 480px) {
    width: 50rem;
    height: 45rem;
  }
  transition: all 0.3s linear;
  transition-property: transform;
  position: fixed;
  ${makeColFlexCenter};
  z-index: 7;
  left: 15vw;
  right: 15vw;
  overflow: visible;
  &.hidden {
    transform: translateX(-100vw);
  }
  /* background-size: 0 */
  @media screen and (max-width: 480px) {
    left: 8%;
    right: unset;
  }
  mix-blend-mode: screen;
  backdrop-filter: blur(5px);
  ${removeTapHighlight};
  border-radius: 5rem;
  border-top-left-radius: unset;
  border-bottom-right-radius: unset;
  .alert-frame,
  .alert-frame_fail {
    /* ${debug}; */
    ${makeFullWidthBlock};
    position: relative;
    height: max-content;
    transition-property: opacity;
    ${makeUnSelectableTextDiv};
    /* ${debug}; */
    &:active {
      opacity: 0.7;
    }

    .alert-floater {
      ${makeAbsoluteTopDiv};
      ${makeFullHeightBlock};
      height: 20rem;
      ${makeRowFlexCenter};
      align-items: center;
      top: 20%;
      width: 2rem;
      transition: all 0.2s ease-out;
      &.left {
        left: -5rem;
        svg {
          transform: scale(1.5, 2.5);
        }
      }
      &.right {
        right: -5rem;
        svg {
          transform: scale(-1.5, 2.5);
        }
        @media screen and (max-width: 480px) {
          /* right: 10%; */
          /* right: -1rem !important; */
        }
      }
    }
    .frame {
      ${makeFullSizeBlock};
      ${makeAbsoluteTopLeftDiv};
      left: 3%;
      svg {
        ${makeFullSizeBlock};
      }
      /* z-index: -1; */
      /* border-radius: 70%; */
      /* background-image: url("icons/alert-frame.svg"); */
      transform: scale(1.25, 1.5) translate(-1.4rem, 1.6rem);
    }
    &::after {
      height: 1.5rem;
      ${makeAbsoluteTopDiv};
      width: 50%;
      right: 5rem;
      top: -1.5rem;
      background-color: var(--accent-color);
    }
    .alert-body {
      width: inherit;
      height: calc(60rem / 2);
      cursor: pointer;
      @media screen and (max-width: 480px) {
        height: calc(50rem / 2);
      }
      border-radius: 8rem;
      border-top-left-radius: unset;
      border-bottom-right-radius: unset;

      &:hover {
        .alert-frame-edge {
          &:nth-of-type(1) {
            top: 3rem;
            right: 4.5rem;
            svg {
              transform: translateX(50%) scale(-1);
            }
          }
          &:nth-of-type(2) {
            top: unset;
            right: unset;
            bottom: 4rem;
            left: 3rem;
            ${makeRowFlexStart};
            svg {
              transform: translateX(-48%);
            }
          }
          &_fail:nth-of-type(1) {
            top: 3rem;
            right: 4.5rem;
          }
          &_fail:nth-of-type(2) {
            top: unset;
            right: unset;
            bottom: 4rem;
            left: 3rem;
          }
        }
        .alert-floater.left {
          left: -2.5rem;
        }
        .alert-floater.right {
          right: -2rem;
        }
      }
      .alert-frame-edge,
      .alert-frame-edge_fail {
        transition: all 0.2s linear;
        height: 40%;
        ${makeAbsoluteTopRightDiv};
        svg {
          ${makeFullHeightBlock};
        }
        &:nth-of-type(1) {
          top: 2rem;
          right: 3.5rem;
          svg {
            transform: translateX(50%) scale(-1);
          }
        }

        &:nth-of-type(2) {
          top: unset;
          right: unset;
          bottom: 3rem;
          left: 2rem;
          ${makeRowFlexStart};
          svg {
            transform: translateX(-48%);
          }
        }
        &_fail:nth-of-type(1) {
          svg {
            transform: translateX(50%) scale(1);
          }
        }
        &_fail:nth-of-type(2) {
          svg {
            transform: translateX(-48%) scale(-1);
          }
        }
      }
      position: relative;
      ${makeColFlexStart};
      font-family: jura_bold;
      color: var(--accent-color);
      cursor: pointer;
      p,
      button {
        cursor: pointer;
      }
      .alert-state {
        color: var(--accent-color);
        font-size: 2.5rem;
        min-width: 80%;
        text-align: start;
        margin: 0 auto;
        margin-top: 3rem;
        margin-bottom: 10%;
        font-weight: bolder;
        text-shadow: 0.1rem 0.1rem 0.3rem var(--accent-color);
      }
      .alert-text {
        font-size: 1.4rem;
        width: 70%;
        margin: 0 auto;
        text-align: center;
        margin-bottom: 5rem;
      }
      .alert-cta-div {
        width: 80%;
        margin: 0 auto;
        ${makeRowFlexEnd};
        .alert-cta {
          width: 12rem;
          height: 3.5rem;
          position: relative;
          button {
            width: 100%;
            bottom: 10%;
            font-size: 1.4rem;
            border: none;
            font-weight: bolder;
            color: var(--accent-color);
            background-color: unset;
            /* &:active {
              border: 0.1rem solid var(--accent-color);
            } */
          }
          .frame {
            ${makeFullSizeBlock};
            ${makeAbsoluteTopLeftDiv};

            svg {
              ${makeFullWidthBlock};
            }

            transform: scale(1.5, 2) translateY(-30%);
            @media screen and (max-width: 480px) {
              transform: scale(1.5, 2) translateY(-25%);
            }
          }
        }
      }
    }
  }
  .alert-frame_fail::after {
    background-color: var(--fail-color) !important;
  }
  .alert-frame_fail {
    * {
      color: var(--fail-color) !important;
      
    }
    .alert-state {
      text-shadow: .1rem .1rem .2rem var(--fail-color);
    }
  }
`;
