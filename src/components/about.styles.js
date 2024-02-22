import styled from "styled-components";
import {
  debug,
  dropShake,
  makeAbsoluteBottomLeftDiv,
  makeAbsoluteTopLeftDiv,
  makeColFlexCenter,
  makeColFlexStart,
  makeFullSizeBlock,
  makeFullWidthBlock,
  makeRowFlexStart,
  makeUnSelectableTextDiv,
  slideInLeft,
} from "../styles/functions";

export const AboutStyled = styled.section`
  ${makeFullWidthBlock};
  height: max-content;
  min-height: 60rem;
  ${makeColFlexStart};
  margin-bottom: 80rem;
  @media screen and (min-width: 800px) {
    margin-bottom: 70rem;
  }
  @media screen and (min-width: 1000px) {
    margin-bottom: 40rem;
  }
  .about-top {
    ${makeRowFlexStart};
    height: max-content;
    min-height: 30rem;
    position: relative;
    padding-bottom: 30rem;
    @media screen and (min-width: 800px) {
      padding-bottom: 10rem;
    }
    margin-bottom: 10rem;
    .about-text-div {
      ${makeColFlexStart};
      height: 30rem;
      width: 40%;
      @media screen and (max-width: 756px) {
        width: 60%;
      }
      margin-left: 8%;
      transform: translateX(-25vw);
      animation-duration: 0.2s;
      animation-timing-function: linear;
      ${slideInLeft};
      .scroll-handle-div {
        ${makeAbsoluteTopLeftDiv};
        top: -10%;
        width: 8rem;
        height: 2rem;
        left: -10%;
      }
      p {
        font-size: 1.8rem;
        @media screen and (max-width: 480px) {
          font-size: 2rem;
        }
        font-family: manjari_regular;
        color: var(--bright-color);
      }
    }
    .about-bullet-div {
      width: 30%;
      margin-top: 0;
      min-height: 30rem;
      height: max-content;
      margin-left: auto;
      margin-right: 10%;
      @media screen and (max-width: 756px) {
        width: 40%;
        transform: translate(-20%, 80%);
        margin-top: 30%;
      }
      .scroll-handle-div {
        ${makeAbsoluteTopLeftDiv};
        top: -8%;
        width: 100%;
        .scroll-handle {
          width: 110%;
        }
      }
      .about-bullet {
        margin-top: 1rem;
        height: max-content;
        min-height: 30rem;
        background-color: var(--dark-color-fade);
        ${makeColFlexCenter};
        align-items: flex-start;
        justify-content: space-evenly;
        transform: translateY(-30%);
        ${dropShake};
        animation-iteration-count: 1 !important;
        animation-fill-mode: forwards;
        transform-origin: top;
        svg {
          ${makeAbsoluteTopLeftDiv};
          width: 2rem;
          transform: translate(-350%, 50%);
          top: -50%;
        }
        li {
          font-size: 2rem;
          width: 70%;
          @media screen and (max-width: 480px) {
            width: 80%;
          }
          font-family: manjari_thin;
          font-weight: lighter;
          font-weight: 400;
          color: var(--bright-color);
          font-weight: lighter;
          margin-left: 3rem;
          backdrop-filter: blur(12rem);
        }
      }
    }
  }
  .about-bottom {
    ${makeFullWidthBlock};
    ${makeRowFlexStart};
    min-height: 60rem;
    @media screen and (max-width: 756px) {
      min-height: 80rem;
    }
    height: max-content;
    flex-wrap: wrap !important;
    flex-basis: 40rem;
    .floater {
      ${makeAbsoluteBottomLeftDiv};
      border-radius: 50%;
      background-color: var(--floater-color);
      backdrop-filter: blur(2px);
      opacity: 0.8;
      height: 8rem;
      width: 8rem;
      transform: translate(2rem, 20rem);
      span {
        all: inherit;
        transform: translate(-30%, 10%);
      }
    }
    .about-detail {
      width: 35rem;
      height: 18rem;
      margin: 3rem;
      overflow: hidden;
      background: linear-gradient(to bottom, #ffffff18 30%, #5f5f5f0c);
      border-radius: 0.3rem;
      overflow: visible;
      ${makeColFlexStart};
      align-items: flex-start;
      // cursor: pointer;
      ${makeUnSelectableTextDiv};
      mix-blend-mode: difference;
      &:first-of-type {
        @media screen and (min-width: 800px) {
          margin-right: 20rem;
        }
      }
      @media screen and (max-width: 756px) {
        margin: 10rem auto;
        margin-left: 20%;
        width: 40rem;
        min-height: 30rem;
        height: max-content;
        padding-bottom: 2rem;
      }
      &:hover {
        .detail-border-highlight,
        .detail-cover {
          width: 100%;
        }
      }
      @media screen and (max-width: 756px) {
        height: 20rem;
      }
      .detail-cover {
        ${makeFullSizeBlock};
        ${makeAbsoluteTopLeftDiv};
        z-index: -1;
        background-color: #c0c0c00c;
        width: 60%;
        border-radius: inherit;
        transition: all 0.5s ease-out;
        /* z-index: 3; */
      }
      .detail-border-highlight {
        width: 60%;
        height: 1rem;
        ${makeAbsoluteTopLeftDiv};
        top: -0.5rem;
        background-color: var(--accent-color);
        transition: all 0.5s ease-out;
      }
      p {
        max-width: 50%;
        font-family: manjari_bold;
        color: var(--bright-color);
        position: relative;
        span {
          ${makeAbsoluteTopLeftDiv};
          left: -8%;
          top: -2%;
          width: 2.5rem;
          height: 2.5rem;
          overflow: hidden;
          svg {
            ${makeFullWidthBlock};
            transform: scale(0.8);
          }
        }
        &:first-of-type {
          font-size: 2rem;
          margin: 15% 0 5% 8%;
          min-width: 60%;
          width: max-content;
          text-align: start;
          padding-left: 2rem;
        }
        &:last-of-type {
          font-size: 1.3rem;
          @media screen and (max-width: 756px) {
            font-size: 1.5rem;
          }
          font-weight: 200;
          min-width: 30rem;
          margin-left: 2%;
          padding: 0 2rem;
          font-family: manjari_thin;
        }
      }
    }
  }
`;
