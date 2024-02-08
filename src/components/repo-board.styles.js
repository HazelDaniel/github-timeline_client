import {
  makeAbsoluteBottomDiv,
  makeAbsoluteTopLeftDiv,
  makeAbsoluteTopRightDiv,
  makeColFlexCenter,
  makeColFlexStart,
  makeFullHeightBlock,
  makeFullSizeBlock,
  makeFullWidthBlock,
  makeRowFlexCenter,
  makeRowFlexStart,
  makeUnSelectableTextDiv,
} from "../styles/functions";
import styled from "styled-components";

export const RepoBoardStyled = styled.div`
  height: max-content;
  min-height: 35rem;
  width: 90%;
  @media screen and (max-width: 480px) {
    width: 95%;
  }
  margin: 0 auto;
  align-self: flex-start;
  ${makeRowFlexStart};
  align-items: center;
  padding: 1rem 2rem 2rem 2rem;
  margin-bottom: 8rem;
  background: linear-gradient(-220deg, #22262c 20%, #22262c1c);

  .code-link-board {
    height: 25rem;
    width: 60%;
    margin: 5% 5% 0 0;
    padding: 3rem;
    position: relative;
    img {
      ${makeAbsoluteTopLeftDiv};
      ${makeFullSizeBlock};
      object-fit: contain;
      transform: scaleY(1.3) translateY(-5%);
      // z-index: -1;
    }
    & > span {
      ${makeAbsoluteTopLeftDiv};
      top: -20%;
      height: 4rem;
      overflow: hidden;
      ${makeRowFlexStart};
      width: 3rem;
      svg {
        display: block;
        ${makeFullHeightBlock};
        transform: scale(0.8);
        margin-right: auto;
      }
    }
    & > ul {
      ${makeFullWidthBlock};
      height: 4rem;
      ${makeRowFlexStart};
      margin-bottom: 2rem;
      li {
        width: 5rem;
        cursor: pointer;
        a {
          color: var(--dull-color);
          text-decoration: none;
          font-family: manjari_bold;
          position: relative;
          &.active {
            &::after {
              ${makeAbsoluteBottomDiv};
              left: 0;
              ${makeFullWidthBlock};
              height: 0.3rem;
              bottom: -0.5rem;
              border-radius: 1rem;
              background-color: var(--accent-color);
              z-index: 2;
            }
          }
        }
        &:first-of-type {
          margin-right: 3rem;
        }
      }
    }
    .code-link-div {
      font-family: montserrat_regular;
      p {
        width: 90%;
        padding: 0 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: none;

        height: 3.5rem;
        ${makeColFlexCenter};
        align-items: center;
        border-radius: 0.3rem;
        border: 0.2rem solid var(--repo-link-border-color);
        border-right: none;
        margin-bottom: 1rem;
        color: var(--bright-color);
        ${makeUnSelectableTextDiv};
        & + h3 {
          font-size: 1rem;
          color: var(--dull-color);
          opacity: 0.5;
        }
        span {
          ${makeAbsoluteTopRightDiv};
          ${makeFullHeightBlock};
          ${makeColFlexCenter};
          align-items: center;
          width: 4rem;
          background-color: var(--dull-color);
          opacity: 0.8;
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          right: -0.3rem;
          transform: scaleY(1.09);
          svg {
            display: block;
            ${makeFullWidthBlock};
            transform: scale(0.6);
            cursor: pointer;
          }
          &:active {
            background-color: var(--bright-color);
            svg {
              path {
                fill: var(--bright-color) !important;
              }
            }
          }
        }
      }
    }
  }
  .code-info-board {
    height: 30rem;
    flex: 1;
    ${makeColFlexCenter};
    align-items: center;
    ul {
      ${makeFullSizeBlock};
      ${makeColFlexStart};
      align-items: flex-start;
      li {
        p {
          color: var(--accent-color);
          text-transform: uppercase;
          font-family: manjari_bold;
          margin-bottom: 2rem;
          font-size: 1.3rem;
        }
        h3 {
          font-family: manjari_regular;
          color: var(--dull-color);
          ${makeRowFlexCenter};
          align-items: center;
          span {
            margin: auto 0;
            margin-right: 2rem;
            font-size: 2rem;
            ${makeColFlexCenter};
            ${makeFullHeightBlock};
            display: inline-flex;
            align-items: center;
            float: left;
            transform: translateY(-25%);
          }
        }
        &:first-of-type {
          margin-bottom: 20%;
        }
      }
    }
  }
`;
