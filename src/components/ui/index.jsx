import React from "react";
import styled from "styled-components";

import skins from "./skins";

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
`;

export default function UI(props) {
    const { auto, autoLayout, platform, inverted, zones, hudLayout } = props;
    const { ui: uiZone } = zones;

    const Skin = skins[props.skin];

    React.useLayoutEffect(() => {
        if (auto) {
            autoLayout(Skin.autoLayout(uiZone, platform, inverted, hudLayout));
        }
    }, [auto, autoLayout, uiZone, platform, inverted, hudLayout, Skin]);

    return (
        <StyledUI className="ui" {...props.bounds}>
            {Skin ? <Skin {...props} /> : null}
        </StyledUI>
    );
}
