import React from "react";
import styled from "styled-components";

const StyledGroup = styled.g.attrs(props => ({ transform: `translate(${props.x}, ${props.y})` }))`
    transform-origin: center;
`;

const StyledWrapper = styled.g.attrs(props => ({ width: props.size, height: props.size }))`
    overflow: visible;
    transform-origin: center;
`;

const StyledChild = styled.g`
    transform-origin: center;
`;

export default function Group(props) {
    return (
        <StyledGroup x={props.x} y={props.y}>
            <StyledWrapper size={props.size} x={0} y={0}>
                <StyledChild className="ui-transition-target">{props.children}</StyledChild>
            </StyledWrapper>
        </StyledGroup>
    );
}
