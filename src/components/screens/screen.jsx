import React from "react";
import styled from "styled-components";

import ScreenElementsRenderer from "./elements/renderer";

const StyledScreen = styled.div.attrs(props => ({
    style: {
        width: props.bounds.width,
        height: props.bounds.height,
        left: props.bounds.x,
        top: props.bounds.y,
        fontSize: `${Math.min(props.bounds.width / 16, props.bounds.height / 8, 18)}px`,
        padding: props.layer > 0 ? Math.min(props.bounds.height / 8, 10) : 0,
    },
}))`
    position: absolute;
    overflow: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    margin: auto;
    /*
    background-color: green;
    border: 1em solid limegreen;
    box-sizing: border-box;
    */
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

const flexAlign = align => {
    switch (align) {
        case "top":
        case "left":
            return "flex-start";
        case "bottom":
        case "right":
            return "flex-end";
        default:
            return align;
    }
};
