import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledContainer = styled.foreignObject.attrs(props => ({
    style: {
        maxHeight: props.height,
    }
}))``;

export default function Container(props) {
    return (
        <StyledContainer {...{ ...props, width: Math.max(0, props.width), height: Math.max(0, props.height) }}>
            {props.children}
        </StyledContainer>
    );
}

Container.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

Container.defaultProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
};
