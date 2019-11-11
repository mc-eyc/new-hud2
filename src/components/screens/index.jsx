import React from "react";
import styled from "styled-components";

import Screen from "./screen";

const StyledScreens = styled.div.attrs(props => ({
    style: {
        display: props.active && props.active !== "main" ? "block" : "none",
    },
}))`
    position: absolute;
    width: 100%;
    height: 100%;

    .modal {
        background-color: rgba(0, 0, 0, 1);
        width: 100%;
        height: 100%;
    }
`;

/**
 * Render the screens.
 *
 * Level 0 screens are *always* rendered.
 * Level 1 and 2 screens are only rendered as needed.
 */
export default function Screens(props) {
    const { screens, active, zones } = props;

    const activeScreen = React.useMemo(() => {
        return screens[active];
    }, [screens, active]);

    return (
        <StyledScreens active={props.active}>
            <div className="screens-level-0">{}</div>
            {activeScreen.level > 0 ? (
                <div className={`modal screens-level-${activeScreen.level}`}>
                    <Screen name={active} bounds={zones[`screenLevel${activeScreen.level}`]} {...activeScreen} />
                </div>
            ) : null}
        </StyledScreens>
    );
}
