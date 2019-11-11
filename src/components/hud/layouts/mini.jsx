import React from "react";
import styled from "styled-components";
import svgpath from "svgpath";

import Balances from "../../balances";
import Buttons from "../../buttons";

const StyledLayout = styled.svg.attrs(props => ({
    style: {
        width: props.width,
        height: props.height,
    },
}))`
    .balances {
        height: 100%;
    }
`;

export default function Mini(props) {
    const { balances, width } = props;
    const height = 32;
    const baseSize = height;
    const buttons = sortButtons(props.buttons);
    return (
        <StyledLayout className="layout mini" width={width} height={height}>
            <path className="body" d={genPath(width, height)} />
            <path className="border" d={genBorder(width, height)} />
            <foreignObject width={width - baseSize} height={baseSize} x={0} y={0}>
                <Balances balances={balances} />
            </foreignObject>
            <foreignObject width={baseSize} height={baseSize} x={width - baseSize} y={0}>
                <Buttons buttons={buttons} size={baseSize} />
            </foreignObject>
        </StyledLayout>
    );
}

Mini.stageBounds = ({width, height}, title = false) => {
    return {
        width,
        height: height - 32 - 2 - (title ? 12 : 0),
        x: 0,
        y: title ? 12 : 0,
    };
};


const genPath = (width, height) => {
    const points = [`M 0 0`, `L ${width} 0`, `L ${width} ${height}`, `L 0 ${height}`];
    return svgpath(points.join(" "));
};

const genBorder = (width, height) => {
    return svgpath(genPath(width, height).toString()).iterate((seg, i) => (i > 1 ? [] : null));
};

const sortButtons = (buttons = {}) => {
    return buttons.menu ? ["menu"] : [];
};
