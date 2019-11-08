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
    border: 1px solid red;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    svg {
        border: 1px solid green;
        box-sizing: border-box;
    }
`;

export default function UI(props) {
    const { auto, autoLayout, game, platform, inverted } = props;

    const Skin = skins[props.skin];

    React.useLayoutEffect(() => {
        if (auto) {
            autoLayout(Skin.autoLayout(game.bounds, platform, inverted));
        }
    }, [auto, autoLayout, game, platform, inverted, Skin]);

    return (
        <StyledUI className="ui" {...props.bounds}>
            {Skin ? <Skin {...props} /> : null}
        </StyledUI>
    );
}
