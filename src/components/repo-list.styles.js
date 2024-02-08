import styled from "styled-components";
import {
  makeAbsoluteBottomDiv,
  makeAbsoluteTopLeftDiv,
  makeAbsoluteTopRightDiv,
  makeFullHeightBlock,
  makeFullWidthBlock,
  makeRowFlexStart,
} from "../styles/functions";

export const RepoListStyled = styled.ul`
  ${makeFullWidthBlock};
  width: 95%;
  height: 100%;
  overflow: auto;
  position: relative;
  .repo-highlight {
    ${makeAbsoluteTopLeftDiv};
    ${makeFullWidthBlock};
    background-color: #dfffbe;
    height: 4rem;
    top: 8rem;
    transition: all 0.2s ease-in-out;
    transition-delay: 0.1s;
    &.defunct {
      opacity: 0;
    }
  }
  li {
    ${makeFullWidthBlock};
    height: 4rem;
    ${makeRowFlexStart};
    position: relative;
    gap: 30%;
    padding-left: 5rem;
    font-family: manjari_bold;
    box-shadow: 0.1rem 0.1rem 0.3rem #85b51d33;
    align-items: center;
    cursor: pointer;
    &:hover {
      p,
      .repo-time {
        color: var(--bg-color);
      }
      .repo-line {
        background: linear-gradient(to bottom, var(--bg-color) 5%, transparent);
      }
    }
    p {
      color: var(--dull-color);
      & + .repo-time {
        color: var(--dull-color);
        opacity: 0.5;
      }
    }
    &::after {
      ${makeAbsoluteBottomDiv};
      ${makeFullWidthBlock};
      height: 0.2rem;
      background-color: var(--dull-color);
      opacity: 0.23;
      left: 0;
    }
    .repo-line,
    .repo-side-caret {
      ${makeAbsoluteTopRightDiv};
      ${makeFullHeightBlock};
      z-index: 2;
    }
    .repo-line {
      right: unset;
      left: 2rem;
      width: 1rem;
      background: linear-gradient(
        to bottom,
        var(--accent-color) 2%,
        transparent
      );
    }
    .repo-side-caret {
      width: 3rem;
      clip-path: polygon(50% 50%, 100% 100%, 100% 0);
      background-color: var(--bg-color);
    }
  }
`;
