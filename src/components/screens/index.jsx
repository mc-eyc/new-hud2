import React from "react";
import styled from "styled-components";

const StyledScreens = styled.div.attrs(props => ({}))`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid green;
  box-sizing: border-box;
`;

export default function Screens(props) {
    return <StyledScreens />;
}
