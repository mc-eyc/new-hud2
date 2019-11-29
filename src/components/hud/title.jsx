import React from "react";
import styled from "styled-components";
import ScaledText from "../common/scaled-text";

const StyledTitle = styled.div.attrs(props => ({
    style: {
        display: props.enabled ? "block" : "none",
    },
}))`
    width: 100%;
    height: 12px;
    position: fixed;
    left: 0;
    top: 0;
    margin: 0px;
    padding: 0px;
    overflow: hidden;

    .scaled-text {
        position: absolute;
    }
`;

export default function Title(props) {
    return (
        <StyledTitle className="game-title" {...props}>
            {props.text && props.text.length ? <ScaledText className="text">{props.text}</ScaledText> : null}
        </StyledTitle>
    );
}
