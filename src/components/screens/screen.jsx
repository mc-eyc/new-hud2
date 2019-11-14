import React from "react";
import styled from "styled-components";

const StyledScreen = styled.div.attrs(props => ({
    style: {
        width: props.bounds.width,
        height: props.bounds.height,
        left: props.bounds.x,
        top: props.bounds.y,
    },
}))`
    position: absolute;
    background-color: green;
    border: 1em solid limegreen;
    box-sizing: border-box;
`;

export default function Screen(props) {
    const { bounds } = props;
    return <StyledScreen bounds={bounds} />;
}
