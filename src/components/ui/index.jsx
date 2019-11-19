import React from "react";
import styled from "styled-components";

import skins from "./skins";
import { calcSafeArea, calcStageGlobal } from "./utils";

const StyledUI = styled.div.attrs(props => ({
    style: {
        width: props.width,
        height: props.height,
        left: props.x,
        top: props.y,
    },
}))`
    position: absolute;
    display: flex;
    align-items: center;
    pointer-events: auto;
`;

export default function UI(props) {
    const { auto, bounds, autoLayout, platform, inverted, zones, hudLayout, updateZone, activeScreen } = props;
    const { viewport: viewportZone, stage: stageZone, ui: uiZone } = zones;

    const ref = React.useRef(null);
    const skinRef = React.useRef(null);

    const Skin = skins[props.skin];

    React.useLayoutEffect(() => {
        if (auto && skinRef.current && typeof skinRef.current.autoLayout === "function") {
            autoLayout(skinRef.current.autoLayout(uiZone, platform, inverted, hudLayout));
        }
    }, [auto, autoLayout, uiZone, platform, inverted, hudLayout, Skin, skinRef]);

    React.useLayoutEffect(() => {
        if (updateZone && ref.current) {
            // Global position of the stage so that we can compare the global position of the UI elements
            const globalParent = calcStageGlobal(viewportZone, stageZone);
            // Get global position of the UI ref
            const uiBounds = ref.current.getBoundingClientRect();
            // Calculate the safe area for the screen
            updateZone("screenLayer1", calcSafeArea({ parent: globalParent, child: uiBounds }));
        }
    }, [activeScreen, bounds, uiZone, stageZone, viewportZone, updateZone, ref]);

    return (
        <StyledUI className="ui" ref={ref} {...props.bounds}>
            {Skin ? <Skin {...props} ref={skinRef} /> : null}
        </StyledUI>
    );
}
