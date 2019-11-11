import React, { useEffect, useMemo } from "react";
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

const StyledUIContainer = styled.div.attrs(props => ({
    style: {
        // Should this actually be visibility hidden for the sake of animations?
        display: props.screenLevel < 2 ? "block" : "none",
        width: props.width,
        height: props.height,
        left: props.x,
        top: props.y,
    },
}))`
    position: absolute;
`;

export default function Cradle(props) {
    // TODO: Resize observer here instead of on the HUD
    const [ref, width, height] = useResizeObserver();

    // Update the viewport if the size of this element changes
    const { updateZone } = props;
    useEffect(() => {
        if (updateZone) {
            updateZone("viewport", { width, height });
        }
    }, [ref, width, height, updateZone]);

    // Level of the current screen
    const screenLevel = useMemo(() => {
        return props.screens.screens[props.screens.active].level;
    }, [props]); 

    // The HUD layout is relevant to everyone
    const hudLayout = props.hud.layout;

    return (
        <StyledCradle className="cradle" theme={props.theme} ref={ref}>
            <Screens {...props.screens} {..._pick(props, ["zones"])} />

            <StyledUIContainer className="ui-container" {...props.zones.ui} screenLevel={screenLevel}>
                <UI hudLayout={hudLayout} {...props.ui} {..._pick(props, ["zones", "game", "autoLayout"])} />
            </StyledUIContainer>

            <HUD
                {..._pick(props, [
                    "balances",
                    "buttons",
                    "clock",
                    "parent",
                    "title",
                    "zones",
                    "updateGameBounds",
                    "updateZone",
                    "setHUDLayout",
                ])}
            />
        </StyledCradle>
    );
}
