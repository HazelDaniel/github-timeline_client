import styled from "styled-components";
import {
  makeAbsoluteTopLeftDiv,
  makeAbsoluteTopRightDiv,
  makeColFlexCenter,
  makeColFlexStart,
  makeFullHeightBlock,
  makeFullSizeBlock,
  makeFullWidthBlock,
  makeRowFlexStart,
} from "../styles/functions";

export const FormModalStyled = styled.div`
  position: fixed;
  top: 20%;
  width: 30rem;
  height: 30rem;
  z-index: 10;
  ${makeColFlexCenter};
  .form-modal-overlay {
    ${makeAbsoluteTopLeftDiv};
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: -1;
    background-color: var(--ash-color_trans);
    backdrop-filter: blur(12px);
  }
  .modal-wrapper {
    position: relative !important;
    min-height: clamp(40rem, 60rem, 85vh);
    min-width: 80vw;
    width: clamp(40rem, 70vw, 65rem);
    @media screen and (max-width: 480px) {
      top: 15vh;
      min-height: 70vh;
      width: 90vw;
      min-width: 50rem;
    }
    @media screen and (min-width: 801px) {
      min-width: 60vw;
    }
    left: 33vw;
    @media screen and (max-width: 480px) {
      left: 15rem;
    }
    top: 5rem;
    overflow: visible;
    ${makeRowFlexStart};
    /* box-shadow: 0.2rem 0.2rem 4rem #333333e0; */

    .left {
      position: relative !important;
      overflow: hidden;
      flex: 1 !important;
      height: inherit;
      min-height: inherit;
      z-index: -1;
      ${makeColFlexStart};
      img {
        ${makeFullSizeBlock};
        height: 40%;
        align-self: flex-start;
        object-fit: 100% contain;
      }
      background: linear-gradient(-130deg, black 2%, transparent);
    }
    .right {
      position: relative !important;
      width: 65%;
      min-width: 65%;
      left: unset;
      height: inherit;
      min-height: inherit;
      overflow: visible;
      margin-left: auto;
      max-height: 100%;
      z-index: 2;
      &::before {
        ${makeAbsoluteTopLeftDiv};
        ${makeFullSizeBlock};
        z-index: -1;
        background: linear-gradient(
          180deg,
          rgba(69, 195, 173, 0.1) 30%,
          transparent
        );
        /* border: 1rem solid transparent; */
        backdrop-filter: blur(2rem);
      }
      .form-cancel {
        ${makeAbsoluteTopRightDiv};
        top: -5rem;
        height: 5rem;
        width: 5rem;
        ${makeColFlexCenter};
        align-items: center;
        background: linear-gradient(133deg, rgb(2, 7, 6) 45%, transparent);
        z-index: -1;
        &:active {
          border: 0.1rem solid var(--accent-color_trans);
        }
        svg {
          stroke: var(--bright-color);
          ${makeFullWidthBlock};
          transform: scale(0.8);
          path {
            stroke: var(--bright-color);
          }
        }
      }
      form {
        ${makeFullHeightBlock};
        ${makeColFlexStart};
        align-items: flex-start;
        overflow: hidden;
        input,
        label {
          width: 80%;
          height: 10%;
          margin-left: auto;
          @media screen and (min-width: 801px) {
            margin-left: 3rem;
          }
          @media screen and (max-width: 480px) {
            width: 100%;
          }
        }
        label {
          &:first-of-type {
            margin-top: 5rem;
          }
          color: var(--accent-color_trans);
          height: max-content;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          text-transform: uppercase;
          font-family: manjari_bold;
          &.credential-label {
            ${makeRowFlexStart};
            display: flex !important;
            align-items: center;
            gap: 1rem;
            position: relative !important;
            p {
              ${makeAbsoluteTopLeftDiv};
              left: 40%;
              flex: 1 !important;
              padding-left: 2rem;
              margin-left: auto;
              min-width: max-content;
            }
            /* font-size: 1.5rem;
            font-family: manjari_thin; */
            color: var(--bright-color);
            &.active {
              & > span > span .radio {
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
                  width: 0.6rem !important;
                  height: 0.6rem !important;
                  border-radius: 50%;
                  transition: all 0.2s ease-out;
                  display: block;
                }
              }
            }
          }
        }
        input {
          margin-bottom: 10%;
          border-radius: 0.5rem;
          outline: none;
          border: 1px solid var(--bright-color);
          background-color: rgba(0, 0, 0, 0.2);
          color: var(--dull-color);
          padding-left: 1rem;
          font-size: 1.2rem;
          &[type="checkbox"] {
            display: none;
          }
        }
        button {
          height: 50px;
          width: 15rem;
          margin: 0 auto;
          margin-top: 3rem;
          position: relative;
          @media screen and (max-width: 480px) {
            width: 80%;
          }
          &:active {
            svg {
              fill: var(--accent-color_trans);
              stroke: var(--accent-color_trans);
              path {
                fill: var(--accent-color_trans);
                stroke: var(--accent-color_trans);
              }
            }
          }
          background-color: transparent;
          border: unset;
          ${makeColFlexCenter};
          p {
            display: inline-flex;
            align-items: center;
            flex-direction: column;
            color: var(--accent-color);
            font-size: 1.2rem;
            text-shadow: 0.1rem 0.1rem 0.3rem var(--accent-color);
          }
          svg {
            ${makeFullSizeBlock};
            ${makeAbsoluteTopLeftDiv};
            height: 100%;
            width: auto;
            left: -35%;
            @media screen and (max-width: 480px) {
              left: unset;
              transform: scaleX(0.8);
            }
          }
        }
      }
    }
  }
`;
