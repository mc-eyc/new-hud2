import React, { useRef } from "react";
import styled from "styled-components";
import svgpath from "svgpath";

import Container from "../../common/container";
import Clock from "../../clock";
import Balances from "../../balances";
import Buttons from "../../buttons";

const StyledLayout = styled.svg.attrs(props => ({
    style: {
        // Geometry
        width: props.width,
        height: props.height,
    },
}))`
    cursor: auto;
    padding: 0px;

    path.border {
        stroke-width: ${props => props.stroke};
        fill: none;
    }

    .clock {
        text-align: center;
        font-size: 50%;
    }

    .balances:first-child {
        height: 60%;
        font-size: 90%;
        margin-bottom: 4px;
    }

    .balances:last-child {
        height: 40%;
        font-size: 60%;
        justify-content: center;
    }
`;

export default function Portrait(props) {
    const { clock, width } = props;

    const height = 96;

    const baseSize = height;

    // Convenient sizes
    const baseY = clock ? baseSize / 8 : 0;

    // Sort the buttons and balances into their appropriate containers
    const buttons = sortButtons(props.buttons);
    const balances = sortBalances(props.balances);

    // Convenient structure for the path drawing arguments
    const pathArgs = [{ width, height }, baseSize, clock];
    const bodyPath = genPath(...pathArgs);

    return (
        <StyledLayout className="layout portrait" width={width} height={height} stroke={2} baseSize={baseSize}>
            <path className="body" d={bodyPath} />
            <path className="border" d={genBorder(bodyPath)} />
            {clock ? (
                <Container x={width / 2 - baseSize / 2} y={0} width={baseSize} height={baseSize / 4}>
                    <Clock />
                </Container>
            ) : null}
            <Container width={baseSize} height={height} x={0} y={baseY + baseSize / 4}>
                <Buttons buttons={buttons.left} size={baseSize / 2} />
            </Container>
            <Container
                className="top"
                width={width - baseSize}
                height={height - baseY - props.stroke}
                debug={true}
                x={baseSize / 2}
                y={Math.max(baseY * 2)}>
                <Balances balances={balances.top} />
                <Balances balances={balances.bottom} />
            </Container>
            <Container width={baseSize} height={height} x={width - baseSize / 2} y={baseY + baseSize / 4}>
                <Buttons buttons={buttons.right} size={baseSize / 2} />
            </Container>
        </StyledLayout>
    );
}

Portrait.defaultProps = {
    baseSize: 64,
    stroke: 2,
};

Portrait.stageBounds = ({ width, height }, title = false) => {
    return {
        width,
        height: height - 96 - 2 - (title ? 12 : 0),
        x: 0,
        y: title ? 12 : 0,
    };
};

Portrait.uiBounds = ({ width, height }, title = false) => {
    return {
        width: width * 0.8,
        height: height - 96 - 2 - (title ? 12 : 0),
        x: width * 0.1,
        y: title ? 12 : 0,
    };
};

const genPath = ({ width, height }, baseSize, clock = false) => {
    const baseOffset = baseSize / 4;
    const clockOffset = clock ? baseOffset * 2 : 0;
    const baseY = clock ? baseOffset : 0;
    const points = [
        // Start at 0 and the baseSize offset if needed
        `M 0 ${baseY}`,
        // Move to the clock offset
        `L ${width / 2 - clockOffset - baseOffset} ${baseY}`,
        // Draw up and to the right
        `L ${width / 2 - clockOffset} ${clock ? 0 : baseY}`,
        // Draw across and to the right
        `L ${width / 2 + clockOffset} ${clock ? 0 : baseY}`,
        // Draw down and to the right
        `L ${width / 2 + clockOffset + baseOffset} ${baseY}`,
        // Finish
        `L ${width} ${baseY}`,
        `L ${width} ${height}`,
        `L 0 ${height}`,
        // Auto closed
    ];
    return svgpath(points.join(" "));
};

const genBorder = path => {
    return svgpath(path.toString()).iterate((seg, i) => {
        if (i > 5) {
            return [];
        } else {
            return null;
        }
    });
};

const sortButtons = (buttons = {}) => {
    const btns = {
        left: [],
        right: [],
        extra: [],
    };

    if (buttons.menu) {
        btns.right.push("menu");
    }

    if (buttons.sound) {
        btns.left.push("sound");
    }

    // Menu goes on the right, always
    return btns;
};

const sortBalances = (balances = []) => {
    return {
        top: balances.filter(b => ["Win", "Winnings"].includes(b.title)),
        bottom: balances.filter(b => ["Credit", "Bet", "Free Games"].includes(b.title)),
    };
};
