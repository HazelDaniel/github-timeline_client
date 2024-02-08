import styled, { css } from "styled-components";
import {
  floating,
  makeAbsoluteBottomDiv,
  makeAbsoluteBottomLeftDiv,
  makeAbsoluteBottomRightDiv,
  makeAbsoluteTopDiv,
  makeAbsoluteTopLeftDiv,
  makeAbsoluteTopRightDiv,
  makeColFlexCenter,
  makeColFlexEnd,
  makeColFlexStart,
  makeFullHeightBlock,
  makeFullSizeBlock,
  makeFullWidthBlock,
  makeRowFlexCenter,
  makeRowFlexEnd,
  makeRowFlexStart,
} from "../styles/functions";

const bottomText = css`
  max-width: 20rem;
  margin-left: 10%;
  font-size: 1.5rem;
  margin-bottom: 5rem;
  text-align: center;
  justify-self: flex-end;
  align-self: center;
  font-family: manjari_bold;
`;

export const AppPageStyled = styled.main`
  ${makeFullWidthBlock};
  height: max-content;
  min-height: 90vh;
  margin-top: 5rem;
  ${makeRowFlexStart};

  .repositories-tab {
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

    &-title {
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
  }

  .repo-section {
    ${makeColFlexStart};
    ${makeFullWidthBlock};
    height: max-content;
    min-height: 100%;
    align-self: flex-end;
    width: 70%;
    padding-right: 5rem;
    @media screen and (max-width: 800px) {
      width: 100%;
      padding-right: 0;
    }
    .top {
      ${makeFullWidthBlock};
      ${makeColFlexStart};
      height: max-content;
      min-height: 100vh;
      padding-top: 4rem;
      padding-bottom: 10rem;
      position: relative;
      .floater {
        ${makeAbsoluteBottomRightDiv};
        ${floating};
        top: unset;
        bottom: 18%;
        right: 5%;
        height: 8rem;
        width: 8rem;
        z-index: 0;
        span {
          ${makeFullSizeBlock};
          transform: translate(-30%, 10%);
          ${floating};
        }
      }

      .z-bg {
        ${makeAbsoluteTopLeftDiv};
        ${makeFullSizeBlock};
        min-height: 80%;
        height: 100%;
        background: url("../icons/z-bg-small.svg");

        background-repeat: no-repeat;
        background-size: cover;
      }

      .repo-author-div {
        ${makeFullWidthBlock};
        ${makeRowFlexStart};
        height: max-content;
        min-height: 30rem;
        margin-top: 25%;
        padding: 1rem;
        .repo-author-image-div {
          width: 25rem;
          height: 22rem;
          ${makeColFlexStart};
          align-items: center;
          position: relative;
          overflow: visible;
          margin-right: 10%;
          &::after {
            height: 10rem;
            width: 10rem;
            ${makeAbsoluteBottomRightDiv};
            bottom: -2rem;
            right: -2rem;
            z-index: 0;
            background-image: linear-gradient(220deg, #5893b5, transparent);
            transform: rotateZ(1deg);
          }
          &::before {
            height: 10rem;
            width: 10rem;
            ${makeAbsoluteBottomRightDiv};
            bottom: -1.8rem;
            right: -1.8rem;
            background-color: var(--bg-color);
            transform: rotateZ(1deg);
            z-index: 1;
          }
          img {
            display: block;
            ${makeFullSizeBlock};
            object-fit: cover;
            z-index: 2;
          }
          h4 {
            ${makeAbsoluteBottomLeftDiv};
            height: max-content;
            width: max-content;
            bottom: -3rem;
            font-family: manjari_bold;
            color: var(--bright-color);
            opacity: 0.6;
          }
        }
        .repo-author-text-area {
          width: 40%;
          margin-left: auto;
          height: inherit;
          min-height: 25rem;
          font-size: 1.5rem;
          font-family: montserrat_regular;
          color: var(--bright-color);
          p {
            margin-bottom: 3rem;
          }
          h4 {
            font-family: manjari_bold;
            text-align: end;
          }
        }
      }
      .repo-icon-stat-div {
        ${makeFullWidthBlock};
        height: max-content;
        min-height: 30rem;
        padding: 35% 0 3rem 0;
        overflow: visible;
        margin-bottom: -10rem;
        .stat-cta-div {
          height: max-content;
          ${makeRowFlexStart};
          justify-content: space-between;
          align-items: center;
          padding: 0 3rem;
          margin-bottom: 2rem;
          & > div {
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
        .stat-div {
          ${makeFullWidthBlock};
          height: 8rem;
          background-color: #14251f;
          ${makeRowFlexStart};
          justify-content: space-around;
          align-items: center;
          box-shadow: 0.5rem 0.5rem 0.8rem #0000006c;
          position: relative;
          overflow: visible;
          svg {
            display: block;
          }
          .stat {
            height: 80%;
            width: max-content;
            ${makeColFlexCenter};
            align-items: center;
            svg {
              width: 3rem;
              transform: scale(0.7);
              &#fork-svg {
                transform: scale(0.5);
              }
            }
            p {
              width: max-content;
              min-width: 12rem;
              ${makeAbsoluteBottomDiv};
              bottom: -5rem;
              font-size: 1.5rem;
              font-family: manjari_bold;
              color: var(--dull-color);
              span {
                font-size: 2.5rem;
              }
            }
          }
        }
      }
    }
    .bottom {
      padding-top: 8rem;
      height: max-content;
      min-height: 80vh;
      .floater {
        ${makeAbsoluteBottomLeftDiv};
        ${floating};
        top: unset;
        bottom: 40%;
        right: 5%;
        height: 8rem;
        width: 8rem;
        z-index: 0;
        span {
          ${makeFullSizeBlock};
          transform: translate(-30%, 10%);
          ${floating};
        }
      }
      .stat-nav-div {
        width: 20rem;
        height: max-content;
        min-height: 18rem;
        ${makeColFlexCenter};
        align-items: flex-start;
        position: relative;
        &.floating {
          position: fixed;
          top: 10rem;
        }
        ul {
          ${makeFullWidthBlock};
          height: inherit;
          ${makeColFlexStart};
          align-items: inherit;
          justify-content: flex-start;
          li {
            height: 5rem;
            ${makeFullWidthBlock};
            ${makeColFlexCenter};
            font-size: 1.5rem;
            text-transform: capitalize;
            font-family: montserrat_regular;
            color: var(--bright-color);
            padding-left: 2rem;
            position: relative;
            align-items: center;
            opacity: calc(0.3 * var(--pos) + 0.1);
            transition: all 0.2s ease-out;
            transform: rotateX(-30deg);
            perspective: -100rem;
            background-color: transparent;
            transition-delay: 0.1s;
            a {
              ${makeFullSizeBlock};
              all: inherit;
            }
            cursor: pointer;
            &:hover {
              opacity: 1;
              transform: none;
              perspective: unset;
            }
            span {
              ${makeAbsoluteTopLeftDiv};
              ${makeFullHeightBlock};
              width: 1.5rem;
              background: linear-gradient(to bottom, #4abad2, #7a701800);
              z-index: 1;
            }
          }
        }
      }
      .stat-section {
        height: max-content;
        min-height: 25rem;
        ${makeFullWidthBlock};
        ${makeRowFlexEnd};
        align-items: center;
        position: relative;
        margin-bottom: 3rem;
        &-title {
          ${makeAbsoluteTopRightDiv};
          top: -5rem;
          right: 10%;
          font-size: 2.5rem;
          font-family: manjari_bold;
          color: var(--dull-color);
          &.middle {
            right: unset;
            left: 10%;
            width: 20rem;
            text-align: center;
            top: 10rem;
          }
        }
        .stat-right {
          width: 30rem;
          height: max-content;
          min-height: 25rem;
          ${makeColFlexStart};

          .license-title-text {
            margin-top: 20rem;
            ${bottomText};
            color: var(--bright-color);
            opacity: 0.6;
            & + .license-text {
              ${bottomText};
              text-transform: uppercase;
              color: #deffbd;
            }
          }

          .stat-contrib-list {
            height: max-content;
            min-height: 30rem;
            ul {
              ${makeFullWidthBlock};
              height: inherit;
              min-height: inherit;
              ${makeColFlexEnd};
              align-items: center;
              li {
                height: max-content;
                min-height: 8rem;
                width: 20rem;
                ${makeColFlexStart};
                align-items: flex-start;
                overflow: hidden;
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
                  height: 0;
                  opacity: 0;
                }
                p {
                  font-size: 1.3rem;
                  font-family: manjari_bold;
                  color: var(--bright-color);
                  height: 0;
                  opacity: 0;
                  transform: translateX(2rem);
                  max-width: 15rem;
                }
              }
            }
          }
          .stat-popup {
            ${makeFullHeightBlock};
            width: 80%;
            margin-right: auto;
            margin-top: 3rem;
            height: 12rem;
            background: url("../icons/comment-popup.svg");
            background-repeat: no-repeat;
            background-size: 100% auto;
            padding-left: 8%;
            ${makeRowFlexStart};
            color: var(--dull-color);
            & > div {
              ${makeFullHeightBlock};
              padding-top: 2rem;
            }
            .left {
              width: 5rem;
              ${makeRowFlexCenter};
              align-items: flex-start;
              font-size: 2rem;
              font-family: manjari_bold;
            }
            .right {
              font-family: manjari_regular;
              flex: 1;
              p {
                font-size: 1.5rem;
                text-transform: capitalize;
                margin-bottom: 1rem;
              }
              h2 {
                font-weight: lighter;
                margin-bottom: 2rem;
              }
              h4 {
                ${makeFullWidthBlock};
                text-align: end;
                padding-right: 2rem;
              }
            }
          }
        }
        .stat-separator {
          ${makeFullHeightBlock};
          max-height: 50rem;
          width: 2rem;
          z-index: 2;
          height: 30rem;
          // left: 29rem;
          ${makeColFlexCenter};
          align-items: center;
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
        .stat-left {
          flex: 1;
          height: 25rem;
          ${makeRowFlexEnd};
          align-items: flex-start;
          position: relative;
          ul {
            width: 15rem;
            height: max-content;
            min-height: 10rem;
            overflow: visible;
            li {
              height: 4rem;
              border-radius: 0.5rem;
              margin: 0.5rem 0;
              &:first-of-type {
                margin-top: -2rem;
              }
              button {
                ${makeFullSizeBlock};
                outline: none;
                border: none;
                border-radius: 0.5rem;
                background-color: #45c3ae34;
                backdrop-filter: blur(2rem);
                border: 1rem solid transparent;
                color: var(--dull-color);
                box-shadow: 0.05rem 0.05rem 0.5rem var(--accent-color_trans);
                transition: all 0.2s ease-in-out;
                font-size: 1.3rem;
                cursor: pointer;
                &:hover {
                  transform: scale(1.1);
                }
              }
            }
          }
        }
      }
    }
  }
`;
