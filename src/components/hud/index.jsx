import React, { useMemo } from "react";
import styled from "styled-components";
import useResizeObserver from "use-resize-observer";

import Layouts from "./layouts";
import Title from "./title";

const StyledHUD = styled.div`
    padding: 0px;

    .layout {
        position: absolute;
        bottom: 0px;
    }
`;

/**
 * The HUD is the top level element for all containers, layouts, and elements used to
 * represent the balances and buttons that make up the game's "HUD".
 */
export default function HUD(props) {
    // Resize observer
    const [ref, width, height] = useResizeObserver();

    // The bounds are calculated only when width and height are different, otherwise the cached value is used.
    const bounds = useMemo(() => ({ width, height, x: 0, y: 0 }), [width, height]);

    return (
        <StyledHUD className="hud" ref={ref} theme={props.theme}>
            <Title {...props.title} />
            <Layouts
                width={bounds.width || props.parent.width}
                height={bounds.height || props.parent.height}
                titleEnabled={props.title.titleEnabled}
                {...props}
            />
        </StyledHUD>
    );
}
