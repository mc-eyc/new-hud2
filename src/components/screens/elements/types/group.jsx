import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ScreenElementsRenderer from "../renderer";

const StyledGroup = styled.div.attrs(props => ({
    style: { flexDirection: props.orientation === "vertical" ? "column" : "row" },
}))`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;

    > * {
        flex-basis: ${props => props.ratio};
    }
`;

export default function Group(props) {
    return (
        <StyledGroup className={props.className} orientation={props.orientation} ratio={props.ratio}>
            <ScreenElementsRenderer elements={props.children} />
        </StyledGroup>
    );
}

Group.propTypes = {
    orientation: PropTypes.oneOf(["horizontal", "vertical"]),
    ratio: PropTypes.string.isRequired,
};

Group.defaultProps = {
    orientation: "horizontal",
    ratio: "25%",
};
