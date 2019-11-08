import React, { useEffect } from "react";
import styled from "styled-components";
import _pick from "lodash.pick";
import useResizeObserver from "use-resize-observer";

import Theme from "./theme";

import UI from "../ui";
import HUD from "../hud";
import Screens from "../screens";

const StyledCradle = Theme(
    styled.div`
        width: 100%;
        height: 100%;
    `
);

export default function Cradle(props) {
    // TODO: Resize observer here instead of on the HUD
    const [ ref, width, height ] = useResizeObserver();

  
    // Update the viewport if the size of this element changes
    const { updateZone } = props;
    useEffect(() => {
      if (updateZone) {
        updateZone("viewport", { width, height });
      }
    }, [ref, width, height, updateZone]);

    return (
        <StyledCradle className="cradle" theme={props.theme} ref={ref}>
            <Screens {..._pick(props, ["screens", "zones"])} />
            <UI {...props.ui} {..._pick(props, ["zones", "game", "autoLayout"])} />
            <HUD {..._pick(props, ["balances", "buttons", "clock", "parent", "zones", "updateGameBounds"])} />
        </StyledCradle>
    );
}
