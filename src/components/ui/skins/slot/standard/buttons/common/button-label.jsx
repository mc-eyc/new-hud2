import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const StyledTextPath = styled("textPath")`
    text-transform: uppercase;
    font-size: ${props => props.fontSize}px;
    text-align: center;
    letter-spacing: ${props => props.fontSize * 0.25}px;
    font-weight: bold;
`;

// TODO: Change to TweenMax ref possibly on the other transform to animate?

export default function ButtonLabel(props) {
    const { id, radius, direction, mod, fontSize, animated, debug } = props;
    return (
        <>
            <defs>
                <path id={`${id}-labelPath`} d={arc(radius, direction, mod)}>
                    {animated ? (
                        <animateTransform
                            attributeName="transform"
                            begin="0s"
                            dur="5s"
                            type="rotate"
                            from="0"
                            to="360"
                            repeatCount="indefinite"
                        />
                    ) : null}
                </path>
            </defs>
            <text className={classNames("label", props.className)} dy={direction * fontSize * 0.75} textAnchor="middle">
                <StyledTextPath xlinkHref={`#${id}-labelPath`} fontSize={fontSize} startOffset="50%">
                    {props.children}
                </StyledTextPath>
            </text>
            {debug ? <path d={arc(radius, direction, mod)} fill="transparent" stroke="red" /> : null}
        </>
    );
}

ButtonLabel.defaultProps = {
    direction: 1,
    mod: 1,
    debug: false,
    fontSize: 10,
    animated: true,
};

const arc = (radius, direction = 1, mod = 1) => {
    const r = radius * mod;
    return `M -${r} 0 A ${r} ${r} 0 0 ${direction} ${r} 0`;
};
