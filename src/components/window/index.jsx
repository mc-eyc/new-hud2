import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Rnd } from "react-rnd";

import HUD from "../hud";
import UI from "../ui";
import Screens from "../screens";
import Cradle from "../cradle";

const StyledWindow = styled(Rnd)`
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%),
        linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%),
        linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    border-radius: 0.5em;
    overflow: hidden;

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
    const [baseWidth, baseHeight] = [800, 600];
    const [viewportGeom, setViewportGeom] = useState({ width: baseWidth, height: baseHeight, x:0, y: 0 });
    return (
        <StyledWindow
            default={{
                x: window.innerWidth / 2 - baseWidth / 2 + 150,
                y: window.innerHeight / 2 - (baseHeight / 2) * 0.8,
                width: baseWidth,
                height: baseHeight,
            }}
            onResize={(e, dir, ref) => {
                const { width, height, left: x, top: y } = ref.getBoundingClientRect();
                setViewportGeom({ width, height });
                props.updateZone("viewport", { width, height, x, y });
            }}
            onDrag={(e, { node }) => {
                const { width, height, left: x, top: y } = node.getBoundingClientRect();
                props.updateZone("viewport", { width, height, x, y });
            }}>
            <div className="size">
                {viewportGeom.width} x {viewportGeom.height}
            </div>

            <Cradle {...props} parent={viewportGeom} />
        </StyledWindow>
    );
}

export default connect(
    state => state,
    dispatch => ({
        setHUDLayout: layout => dispatch({ type: "hud.setLayout", layout }),
        autoLayout: (layout = {}) => dispatch({ type: "ui.updateLayout", ...layout }),
        updateZone: (name, zone) => dispatch({ type: "zones.update", name, ...zone }),
    })
)(Window);
