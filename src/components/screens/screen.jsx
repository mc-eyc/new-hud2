import React from "react";
import styled from "styled-components";

import ScreenElementsRenderer from "./elements/renderer";

const StyledScreen = styled.div.attrs(props => ({
    style: {
        width: props.bounds.width,
        height: props.bounds.height,
        left: props.bounds.x,
        top: props.bounds.y,
        fontSize: `${Math.max(Math.min(props.bounds.width / 16, props.bounds.height / 8, 18), 10)}px`,
        padding: props.layer > 0 ? Math.min(props.bounds.height / 8, 10) : 0,
    },
}))`
    position: absolute;
    overflow: auto;
    box-sizing: border-box;
    flex-direction: column;

    // Center horizontally
    ${props => (props.align.x === "center" ? "align-items: center;" : "")}

    // Center vertically
    ${props =>
        props.align.y === "center" ? "display:flex;*:first-child{margin-top:auto}*:last-child{margin-bottom:auto}" : ""}
`;

export default function Screen(props) {
    const { bounds, elements, layer, align } = props;
    return (
        <StyledScreen className="screen" bounds={bounds} layer={layer} align={parseAlignment(align)}>
            <ScreenElementsRenderer elements={elements} />
        </StyledScreen>
    );
}

const parseAlignment = (align = "top left") => {
    return {
        x: align.split(" ")[0] || "top",
        y: align.split(" ")[1] || align.split(" ")[0] || "left",
    };
};