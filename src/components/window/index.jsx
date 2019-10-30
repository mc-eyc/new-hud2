import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Rnd } from "react-rnd";

import HUD from "../hud";

const StyledWindow = styled(Rnd)`
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%),
        linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%),
        linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;

    .size {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
        background: cornflowerblue;
        color: white;
        padding: 0.5em;
        border-radius: 0.25em;
        font-family: sans-serif;
    }

    .hud {
        position: absolute;
        bottom: 0;
        margin: 0px;
        width: 100%;
        max-height: 20%;
    }
`;

export function Window(props) {
    const [baseWidth, baseHeight] = [433, 865];
    const [gameGeom, setGameGeom] = useState({ width: baseWidth, height: baseHeight });
    return (
        <StyledWindow
            default={{
                x: window.innerWidth / 2 - baseWidth / 2,
                y: window.innerHeight / 2 - (baseHeight / 2) * 0.8,
                width: baseWidth,
                height: baseHeight,
            }}
            onResize={(e, dir, ref) => {
                const { width, height } = ref.getBoundingClientRect();
                setGameGeom({ width, height });
            }}>
            <div className="size">
                {gameGeom.width} x {gameGeom.height}
            </div>
            <IHUD
                balances={props.balances}
                buttons={props.buttons}
                theme={props.theme}
                clock={props.clock}
                game={gameGeom}
            />
        </StyledWindow>
    );
}

function IHUD({ balances, buttons, theme, game, clock = false }) {
    return <HUD balances={balances} buttons={buttons} theme={theme} clock={clock} game={game} />;
}

export default connect(state => state)(Window);
