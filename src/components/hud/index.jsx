import React, { useRef, useMemo } from "react";
import styled from "styled-components";
import useResizeObserver from "use-resize-observer";

import StyledTheme from "./theme";

import Layouts from "../layouts";

const StyledHUD = StyledTheme(
    styled.div`
        padding: 0px;

        .layout {
            position: absolute;
            bottom: 0px;
        }
    `
);

/**
 * The HUD is the top level element for all containers, layouts, and elements used to
 * represent the balances and buttons that make up the game's "HUD".
 */
export default function HUD(props) {
    // Resize observer
    const [ref, width, height] = useResizeObserver();

    // The bounds are calculated only when width and height are different, otherwise the cached value is used.
    // TODO: is it more appropriate to implement with useLayoutEffect?
    const bounds = useMemo(
        () => ({ width, height, x: 0, y: 0 }),
        [width, height]
    );

    return (
        <StyledHUD className="hud" ref={ref} theme={props.theme}>
            <Layouts width={bounds.width || props.game.width} height={bounds.height || props.game.height} {...props} />
        </StyledHUD>
    );
}

HUD.defaultProps = {
    game: {
        width: 0,
        height: 0,
    },
};
