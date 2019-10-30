import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import svgpath from "svgpath";

import Balances from "../balances";
import Buttons from "../buttons";
import Clock from "../clock";
import Container from "../common/container";
import { balancesType, balancesDefaultType, longestBalanceString } from "../../utils";

const StyledLayout = styled.svg.attrs(props => ({
    style: {
        // Geometry
        width: props.width,
        height: props.height,
    },
}))`
    cursor: auto;
    padding: 0px;
    margin: 0px;

    path.border {
        stroke-width: ${props => props.stroke};
        fill: none;
    }

    // Alignments
    .right-sm {
        text-align: right;
    }

    // Balances
    .balances {
        height: ${props => props.balancesHeight - props.stroke}px;
        align-content: center;

        .balance {
            .title {
                white-space: nowrap;
            }
            .value {
            }
        }
    }
`;

export default function Landscape(props) {
    // Props
    const { width, game, baseSize, clock, balances } = props;

    const height = Math.min(game.height, 64);

    const buttons = sortButtons(props.buttons);

    // Constants that refer to specific offsets and coordinates based on baseHeight
    const baseHalf = baseSize / 2;
    const baseMedium = baseSize / 4;
    const baseSmall = baseSize / 16;

    // The buttons may need to shrink their height and y values
    const largeShrinkY = baseMedium;
    const largeShrinkHeight = height - baseMedium;

    // Calculate the clock side
    const clockSide = clock ? (buttons.left.length > 2 ? "right" : "left") : "none";

    // The individual button containers can now have their values set

    // This is the base size of the left buttons, these buttons are intended to form a grid when there are 3 or more
    const buttonsLeftSize = (clockSide === "left" ? largeShrinkHeight : baseSize) / (buttons.left.length >= 3 ? 2 : 1);
    const buttonsLeftY = clockSide === "left" ? largeShrinkY : 0;
    const buttonsLeftWidth = Math.min(buttons.left.length, 2) * buttonsLeftSize;
    const buttonsLeftHeight = (buttons.left.length > 2 ? 2 : 1) * buttonsLeftSize;

    // This is the base size of the right buttons, these buttons are never intended to have more than two buttons
    const buttonsRightSize = clockSide === "right" ? largeShrinkHeight : baseSize;
    const buttonsRightY = clockSide === "right" ? largeShrinkY : 0;

    // Path offsets
    const leftOffset = clockSide === "left" ? baseSize : Math.min(buttons.left.length, 2) * buttonsLeftSize;
    const rightOffset = clockSide === "right" ? baseSize : Math.min(buttons.right.length, 2) * buttonsRightSize;

    // Longest string in the balances to determine if we should scale font sizes
    const maxLabel = longestBalanceString(balances);
    const balancesHeight = height - baseMedium;

    return (
        <StyledLayout
            className="layout landscape"
            width={width}
            height={height}
            stroke={props.stroke}
            maxLabel={maxLabel}
            balancesHeight={balancesHeight}
            viewBox={`0 0 ${width} ${height}`}>
            {/* Geometry */}
            <path className="body" d={genPath({ width, height }, baseSize, leftOffset, rightOffset)} />
            <path className="border" d={genBorder({ width, height }, baseSize, leftOffset, rightOffset)} />

            {/* Optional left clock */}
            {clockSide === "left" ? (
                <Container className="left-sm" x={baseSmall} y={baseSmall} width={leftOffset} height={baseMedium}>
                    <Clock />
                </Container>
            ) : null}

            {/* Large Left Buttons */}
            <Container className="left-lg" x={0} y={buttonsLeftY} width={buttonsLeftWidth} height={buttonsLeftHeight}>
                <Buttons buttons={buttons.left} size={buttonsLeftSize} />
            </Container>

            {/* Optional right clock */}
            {clockSide === "right" ? (
                <Container
                    className="right-sm"
                    x={width - baseSize - baseSmall}
                    y={baseSmall}
                    width={baseSize}
                    height={baseMedium}>
                    <Clock />
                </Container>
            ) : null}

            {/* Large Right Buttons */}
            <Container
                className="right-lg"
                x={width - buttonsRightSize * buttons.right.length}
                y={buttonsRightY}
                width={buttonsRightSize * buttons.right.length}
                height={buttonsRightSize}>
                <Buttons buttons={buttons.right} size={buttonsRightSize} direction="left" />
            </Container>

            {/* Balances */}
            <Container
                x={0 + buttonsLeftWidth}
                y={baseSize / 3.5 - props.stroke}
                width={width - buttonsLeftWidth - buttons.right.length * buttonsRightSize}
                height={balancesHeight}>
                <Balances balances={balances} />
            </Container>
        </StyledLayout>
    );
}

Landscape.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    baseSize: PropTypes.number.isRequired,
    stroke: PropTypes.number.isRequired,
    buttons: PropTypes.object.isRequired,
    clock: PropTypes.bool,
    ...balancesType,
};

Landscape.defaultProps = {
    width: 0,
    height: 0,
    baseSize: 64,
    stroke: 2,
    buttons: {},
    clock: false,
    ...balancesDefaultType,
};

const genPath = ({ width, height }, baseHeight, leftOffset, rightOffset) => {
    const points = [
        // Start at 0 and height as we are drawing upwards
        `M 0 ${height}`,
        // Draw to the top left - if no left offset then draw to the same level as the balances
        `L 0 ${leftOffset ? 0 : baseHeight / 4}`,
        // Draw the flat level to the right
        `L ${leftOffset} ${leftOffset ? 0 : baseHeight / 4}`,
        // Draw down and across to the bottom level
        `L ${leftOffset + baseHeight * 0.5} ${baseHeight / 4}`,
        // Draw across until the next bump
        `L ${width - rightOffset - baseHeight * 0.5} ${baseHeight / 4}`,
        // Draw up and to the right for the menu bump
        `L ${width - rightOffset} ${rightOffset ? 0 : baseHeight / 4}`,
        // Draw to the right corner
        `L ${width} ${rightOffset ? 0 : baseHeight / 4}`,
        // Draw to the bottom right
        `L ${width} ${baseHeight}`,
        // The path is now automatically closed so no return line is required
    ];
    return svgpath(points.join(" "));
};

const genBorder = (geom, baseHeight, leftOffset, rightOffset) => {
    return genPath(geom, baseHeight, leftOffset, rightOffset).iterate((seg, i) => {
        if (i === 0) {
            return [`M 0 ${leftOffset ? 0 : baseHeight / 4}`];
        } else if (i > 6) {
            return [];
        } else {
            return null;
        }
    });
};

const sortButtons = (buttons = []) => {
    // Parse out the buttons into the appropriate groups that we expect
    const btns = {
        left: [],
        right: [],
    };

    // If the menu button is present then it must be added to the right
    if (buttons.menu) {
        btns.right.push("menu");
    }

    // If the sound button is present it should be on the left unless there are any other buttons in which
    // case it will be on the right
    if (buttons.sound) {
        if (Object.keys(buttons).some(b => b !== "menu" && b !== "sound" && buttons[b])) {
            btns.right.push("sound");
        } else {
            btns.left.push("sound");
        }
    }

    // The left side supports one large button only, all others are prepended to the extras list
    const vendorButtons = Object.keys(buttons).filter(b => b !== "menu" && b !== "sound" && buttons[b]);
    if (vendorButtons.length) {
        btns.left.push(...vendorButtons);
    }

    return btns;
};
