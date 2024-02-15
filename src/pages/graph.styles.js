import styled from "styled-components";
import {
  floating,
  makeAbsoluteBottomDiv,
  makeAbsoluteBottomLeftDiv,
  makeAbsoluteBottomRightDiv,
  makeAbsoluteTopDiv,
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
} from "../styles/functions";

export const GraphStyled = styled.section`
  ${makeColFlexStart};
  ${makeFullWidthBlock};
  align-items: center;
  height: max-content;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  padding: 0 3rem 10rem 3rem;

  .floater {
    ${makeAbsoluteBottomLeftDiv};
    ${floating};
    bottom: 18%;
    left: 5%;
    height: 8rem;
    width: 8rem;
    z-index: 0;
    span {
      ${makeFullSizeBlock};
      transform: translate(-30%, 10%);
      ${floating};
    }
  }

  .graph-section-top {
    ${makeFullWidthBlock};
    ${makeColFlexStart};
    height: max-content;
    min-height: 40rem;
    align-items: flex-start;
    .graph-type-toggler {
      ${makeFullWidthBlock};
      ${makeRowFlexEnd};
      height: max-content;
      margin-bottom: 1rem;
      ul {
        width: 20rem;
        height: 10rem;
        ${makeColFlexCenter};
        align-items: flex-end;
        li {
          ${makeRowFlexStart};
          width: 70%;
          align-items: center;
          gap: 1rem;
          height: 3rem;
          font-size: 1.5rem;
          font-family: manjari_thin;
          color: var(--bright-color);
          &.active {
            & > span > span > span {
              background-color: var(--accent-color);
            }
          }
          & > span {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 0.3rem;
            border: 0.2rem solid var(--accent-color_trans);
            border: 0.2rem solid #45c3ae46;
            & > span {
              ${makeFullSizeBlock};
              transform: scale(0.8);
              transform-origin: center;
              border-radius: 50%;
              border: 0.2rem solid var(--accent-color);
              ${makeColFlexCenter};
              align-items: center;
              .radio {
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
                transition: all 0.2s ease-out;
              }
            }
          }
        }
      }
    }

    .graph-area {
      ${makeFullWidthBlock};
      ${makeColFlexStart};
      align-items: flex-start;
      height: max-content;
      min-height: 80vh;
      position: relative;
      &-title {
        font-size: 3.5rem;
        font-family: jura_regular;
        color: var(--bright-color);
        margin-bottom: 3rem;
        span {
          color: var(--accent-color_trans);
          font-size: 2rem;
          margin-left: 2rem;
        }
      }
      #graph {
        width: 70vw;
        @media screen and (max-width: 800px) {
          width: 90vw;
        }
        height: 500px;
        margin: 0 auto;
      }
      .floater {
        left: unset;
        ${makeAbsoluteBottomRightDiv};
        right: 8%;
        bottom: 15rem;
      }
    }
    .graph-cta-div {
      ${makeFullWidthBlock};
      height: 15rem;
      ${makeColFlexStart};
      gap: 2rem;
      margin-top: 5rem;
      & > div {
        ${makeFullWidthBlock};
      }
      .top {
        ${makeRowFlexStart};
        gap: 8rem;
        & > div {
          width: 10rem;
          ${makeUnSelectableTextDiv};
          * {
            -webkit-tap-highlight-color: transparent;
            tap-highlight-color: transparent;
          }
          button {
            ${makeUnSelectableTextDiv};
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
              ${makeUnSelectableTextDiv};
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
      .bottom {
        ${makeRowFlexEnd};
        align-items: center;
        height: 4rem;
        & > div {
          ${makeFullHeightBlock};
          width: 12rem;
          height: 4rem;
          width: 15rem;
          ${makeColFlexCenter};
          align-items: center;
          border: 0.1rem solid var(--accent-color);
          span {
            ${makeAbsoluteTopRightDiv};
            width: 2rem;
            height: 2rem;
            svg {
              ${makeFullSizeBlock};
              transform: scale(0.8);
            }
          }

          a {
            font-size: 1.3rem;
            text-decoration: none;
            font-family: manjari_regular;
            color: var(--accent-color);
          }
        }
      }
    }
  }
  .graph-section-bottom {
    ${makeFullWidthBlock};
    height: max-content;
    min-height: 80vh;
    ${makeRowFlexStart};
    align-items: flex-start;
    gap: 10%;
    .stat-separator {
      ${makeFullHeightBlock};
      max-height: 50rem;
      width: 2rem;
      z-index: 2;
      height: 30rem;
      ${makeColFlexCenter};
      align-items: center;
      opacity: 0.6;
      & > span {
        height: 100%;
        ${makeRowFlexCenter};
        width: 0.8rem;
        background-image: linear-gradient(
          to bottom,
          var(--accent-color) 30%,
          transparent
        );
        margin-left: auto;
        span {
          ${makeAbsoluteTopDiv};
          top: 4rem;
          height: 2.5rem;
          width: 2.5rem;
          border-radius: 50%;
          border: 0.1rem solid var(--dull-color);
          background-color: var(--dark-bg-color);
          cursor: pointer;
        }
      }
      &.second > span {
        background-image: linear-gradient(
          to bottom,
          transparent 20%,
          var(--accent-color) 80%,
          transparent
        );
        span {
          margin-top: 4rem;
        }
      }
    }

    .gsb-left {
      height: max-content;
      min-height: 15rem;
      width: 40%;
      & > div {
        height: inherit;
        min-height: inherit;
        ${makeColFlexStart};
        align-items: flex-start;
        gap: 5rem;
        & > p {
          font-size: 2.5rem;
          font-family: manjari_bold;
          text-transform: uppercase;
          color: var(--dull-color);
        }
        .contributors-list {
          ${makeFullWidthBlock};
          ${makeRowFlexStart};
          height: max-content;
          min-height: 10rem;
          z-index: 2;

          ul {
            height: inherit;
            min-height: inherit;
            ${makeFullWidthBlock};
            ${makeRowFlexStart};
            align-items: center;
            flex-wrap: wrap;
            overflow: visible;
            li {
              height: max-content;
              min-height: 8rem;
              width: 20rem;
              ${makeColFlexStart};
              overflow: visible;
              align-items: flex-start;
              img {
                transform: translateX(2rem);
              }
              &:hover {
                overflow: visible;
                span {
                  opacity: 1;
                  height: 1rem;
                }
                p {
                  opacity: 1;
                  height: max-content;
                }
              }
              & > * {
                margin-right: auto;
                transition: all 0.3s ease-out;
              }
              img {
                display: block;
                width: 5rem;
                height: 5rem;
                border-radius: 50%;
                object-fit: cover;
                margin-bottom: 2rem;
              }
              span {
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
                background-color: var(--accent-color);
                box-shadow: -0.1rem 0.2rem 0.5rem var(--accent-color_trans);
                margin-bottom: 1rem;
                margin-left: unset;
                transform: unset;
                opacity: 0;
              }
              p {
                font-size: 1.3rem;
                font-family: manjari_bold;
                color: var(--bright-color);
                opacity: 0;
                transform: translateX(2rem);
                max-width: 15rem;
              }
            }
          }
        }
      }
    }

    .gsb-right {
      margin-top: 20rem;
      width: 40%;
      height: 40rem;
      ${makeColFlexStart};
      align-items: center;
      .repo-description-div {
        color: var(--dull-color);
        font-family: manjari_bold;
        p {
          font-size: 2.5rem;
          text-transform: uppercase;
          margin-bottom: 3rem;
        }
        .repo-description {
          font-size: 1.5rem;
        }
      }
    }
  }
`;
