import styled from "styled-components";
import {
  baseFlare,
  floating,
  makeAbsoluteBottomRightDiv,
  makeAbsoluteTopRightDiv,
  makeColFlexCenter,
  makeFullSizeBlock,
  makeUnSelectableTextDiv,
} from "../styles/functions";

export const MottoStyled = styled.section`
  margin-top: 15rem;
  height: max-content;
  min-height: 30rem;
  ${makeColFlexCenter};
  padding-bottom: 20rem;
  overflow: visible;
  p {
    font-size: 4rem;
    width: 80%;
    max-width: 55rem;
    text-align: center;
    font-family: jura_bold;
    color: var(--accent-color);
    margin-top: 20%;
    z-index: 2;
  }

  .floater {
    ${makeAbsoluteTopRightDiv};
    top: 20%;
    right: 5%;
    height: 8rem;
    width: 8rem;
    ${floating};
    span {
      ${makeFullSizeBlock};
      transform: translate(-30%, 10%);
      ${floating};
    }
  }
  .flare {
    ${baseFlare};
    left: -10rem !important;
    z-index: 1;
  }
  .web-nexus {
    ${makeAbsoluteBottomRightDiv};
    bottom: -50%;
    /* z-index: -1; */
    img {
      filter: sepia(0.9);
      ${makeUnSelectableTextDiv};
    }
  }
`;
