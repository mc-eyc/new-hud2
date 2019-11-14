import React from "react";
import styled from "styled-components";

import Screen from "./screen";

const StyledScreens = styled.div.attrs(props => ({
    style: {
        display: props.active ? "block" : "none",
    },
}))`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const StyledModal = styled.div.attrs(props => ({ style: {} }))`
    background-color: rgba(0, 0, 0, 1);
    width: 100%;
    height: 100%;
`;

const StyledStage = styled.div.attrs(props => ({
    style: {
        width: props.width,
        height: props.height,
        left: props.x,
        top: props.y,
    },
}))`
    position: absolute;
`;

/**
 * Render the screens.
 *
 * Level 0 screens are *always* rendered.
 * Level 1 and 2 screens are only rendered as needed and only one at a time.
 */
export default function Screens(props) {
    const { screens, active, zones } = props;

    const activeScreen = React.useMemo(() => {
        return screens[active];
    }, [screens, active]);

    return (
        <StyledScreens active={props.active}>
            <div className="screens-layer-0">{/* Render main game screen here */}</div>
            {activeScreen && activeScreen.layer > 0 ? (
                <StyledModal className={`modal screens-layer-${activeScreen.layer}`}>
                    <StyledStage {...zones.stage}>
                        <Screen name={active} bounds={zones[`screenLayer${activeScreen.layer}`]} {...activeScreen} />
                    </StyledStage>
                </StyledModal>
            ) : null}
        </StyledScreens>
    );
}
