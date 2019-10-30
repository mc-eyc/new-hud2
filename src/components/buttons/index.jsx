import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "./button";

const StyledButtons = styled.div.attrs(props => ({
    style: {
        width: props.count > 2 ? props.size : Math.min(props.count, 2) * props.size,
        gridTemplateAreas: gridTemplateAreas(props.count, props.direction),
    },
}))`
    display: grid;

    > :nth-child(1) {
        grid-area: b0;
    }

    > :nth-child(2) {
        grid-area: b1;
    }

    > :nth-child(3) {
        grid-area: b2;
    }

    > :nth-child(4) {
        grid-area: b3;
    }
`;

export default function Buttons({ size, buttons, direction }) {
    return (
        <StyledButtons className="buttons" size={size} count={buttons.length} direction={direction}>
            {buttons.map((b, i) => (
                <Button key={`btn-${i}`} button={b} size={size} />
            ))}
        </StyledButtons>
    );
}

Buttons.propTypes = {
    size: PropTypes.number.isRequired,
    buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
    direction: PropTypes.oneOf(["right", "left"]),
    color: PropTypes.string.isRequired,
    disabledColor: PropTypes.string.isRequired,
};

Buttons.defaultProps = {
    size: 0,
    buttons: [],
    direction: "right",
    color: "red",
    disabledColor: "blue",
};

const gridTemplateAreas = (length, direction) => {
    switch (length) {
        case 1:
            return `"b0"`;
        case 2:
            return direction === "left" ? `"b1 b0"` : `"b0 b1"`;
        case 3:
            return `"b0 b0" "b1 b2"`;
        case 4:
            return `"b0 b1" "b2 b3"`;
        default:
            return `"b0"`;
    }
};
