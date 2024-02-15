import {
  makeAbsoluteBottomDiv,
  makeAbsoluteBottomRightDiv,
  makeAbsoluteTopDiv,
  makeAbsoluteTopLeftDiv,
  makeAbsoluteTopRightDiv,
  makeColFlexCenter,
  makeColFlexStart,
  makeFullHeightBlock,
  makeFullSizeBlock,
  makeFullWidthBlock,
  makeRowFlexCenter,
  makeRowFlexStart,
} from "../styles/functions";
import styled from "styled-components";

export const RepoTabStyled = styled.aside`
  ${makeAbsoluteTopLeftDiv};
  ${makeColFlexStart};
  height: 600px;
  @media screen and (max-width: 480px) {
    height: 80vh;
  }
  overflow: visible;
  box-shadow: 0.2rem 0.3rem 0.8rem var(--dark-bg-color);
  float: left;
  top: 10rem;
  backdrop-filter: blur(8px);
  position: sticky;
  width: 33rem;
  @media screen and (max-width: 800px) {
    position: fixed;

    // ====== a hiding class
    &.closed {
      width: 3rem;
      backdrop-filter: unset;
      box-shadow: unset;
      .repositories-tab-title,
      .repositories,
      .repo-nav-cta {
        width: 0 !important;
        overflow: hidden;
      }
      .repo-toggler {
        opacity: 1 !important;
        & > span {
          transform: scaleX(1) !important;
        }
      }
    }
    // ======
  }
  z-index: 6;
  align-self: flex-start;

  .repositories-tab-title {
    ${makeFullWidthBlock};
    text-align: center;
    ${makeAbsoluteTopDiv};
    top: -3rem;
    ${makeRowFlexCenter};
    align-items: center;
    font-size: 1.2rem;
    text-transform: uppercase;
    font-family: manjari_bold;
    color: var(--dull-color);
    span {
      ${makeColFlexCenter};
      display: inline-flex;
      width: 2rem;
      height: 2rem;
      margin-left: 1rem;
      svg {
        display: block;
        ${makeFullHeightBlock};
        transform: scale(0.8);
      }
    }
  }

  .repository-wrapper {
    position: relative;
    ${makeFullSizeBlock};
    overflow: visible;
    ${makeColFlexStart};
    align-items: flex-start;
    padding-top: 8rem;
    .repo-toggler {
      width: 3rem;
      height: 3rem;
      ${makeAbsoluteBottomRightDiv};
      right: 2rem;
      bottom: 5rem;
      right: -1.5rem;
      z-index: 3;
      border: 0.1rem solid var(--accent-color);
      border-radius: 0.3rem;
      cursor: pointer;
      box-shadow: 0.1rem 0.2rem 0.3rem var(--bg-color);
      transform: scale(1.8);
      @media screen and (min-width: 801px) {
        display: none;
      }
      * {
        cursor: pointer;
      }
      & > span {
        ${makeFullSizeBlock};
        width: 85%;
        margin-left: auto;
        border-left: 0.1rem solid var(--accent-color);
        border-radius: inherit;
        ${makeColFlexCenter};
        color: var(--accent-color);
        align-items: center;
        font-size: 2rem;
        transition: all 0.3s ease-in-out;
        transform: scaleX(-1);
        &:hover {
          margin-left: 0;
        }
      }
    }
  }
  .repo-nav-cta {
    justify-self: flex-end;
    ${makeFullWidthBlock};
    height: 5rem;
    margin-top: auto;
    width: 80%;
    margin-bottom: 20%;
    ${makeRowFlexStart};
    gap: 30%;
    & > div {
      width: 10rem;
      button {
        ${makeFullWidthBlock};
        font-size: 1.2rem;
        ${makeRowFlexCenter};
        align-items: center;
        gap: 1rem;
        height: 2rem;
        position: relative;
        cursor: pointer;
        font-family: manjari_regular;
        color: var(--bright-color);
        background-color: unset;
        outline: unset;
        border: unset;
        &.blurred {
          filter: blur(2rem);
          background-color: var(--accent-color_trans);
        }
        &::before {
          ${makeAbsoluteBottomDiv};
          width: 80%;
          height: 0.1rem;
          left: 10%;
          background-color: var(--bright-color);
        }
        &:hover {
          & > span {
            right: -10%;
          }
        }
        span {
          font-size: 2rem;
          line-height: 0;
          ${makeFullHeightBlock};
          ${makeAbsoluteTopRightDiv};
          top: 1.5rem;
          align-items: center;
          transform: scale(1.8);
          right: -20%;
          transition: all 0.2s ease-in-out;
        }
      }
    }
    .right {
      & > button {
        & > span {
          right: unset;
          left: -20%;
        }
        &::before {
          right: 10%;
          left: unset;
        }
        &:hover {
          & > span {
            right: unset;
            left: -10%;
          }
        }
      }
    }
  }
`;
