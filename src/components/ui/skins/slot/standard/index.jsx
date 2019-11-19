import React from "react";
import styled from "styled-components";

import Spin from "./buttons/spin";
import AutoSpinConfig from "./buttons/auto-spin-config";
import BetConfig from "./buttons/bet-config";
import VerticalLayout from "./layouts/vertical";
import HorizontalLayout from "./layouts/horizontal";
import useTransitions from "../../../hooks/use-transitions";
import useSkin from "../../../hooks/use-skin";

const StyledUI = styled.svg`
    .button {
        cursor: pointer;
    }
`;

export default React.forwardRef(function SlotStandard(props, forwardRef) {
    const { orientation, data } = props;
    const Layout = orientation === "vertical" ? VerticalLayout : HorizontalLayout;

    const autoRef = React.useRef();
    const spinRef = React.useRef();
    const betRef = React.useRef();

    const [play, stop] = useTransitions({
        [["default", "spin"]]: () => console.log("spinning..."),
        [["spin", "default"]]: () => console.log("finish spinning..."),
    });

    useSkin(forwardRef, {
        autoLayout,
        play,
        stop,
    });

    return (
        <StyledUI width="100%" height="100%" viewBox={Layout.viewBox}>
            <Layout callback={props.callback}>
                <AutoSpinConfig ref={autoRef} />
                <Spin ref={spinRef} />
                <BetConfig ref={betRef} />
            </Layout>
        </StyledUI>
    );
});

// Called when automatically laying out where the UI should go (ie. the game is not providing it)
const autoLayout = ({ width, height }, platform, inverted = false, hud = "landscape") => {
    if ((platform === "mobile" && hud === "landscape") || (hud === "mini" && width > height)) {
        return {
            bounds: {
                width: width * 0.2,
                height,
                x: inverted ? 0 : width * 0.8,
                y: 0,
            },
            orientation: "vertical",
        };
    } else {
        // Portrait and mini-portrait needs to be a bit offset otherwise align to the maximum area
        if (hud === "portrait" || (hud === "mini" && width <= height * 1.5)) {
            return {
                bounds: {
                    width: width * (hud === "mini" ? 0.8 : 1.0),
                    height: height * (hud === "portrait" ? 0.3 : 0.5),
                    x: width * (hud === "mini" ? 0.1 : 0),
                    y: height * (hud === "portrait" ? 0.6 : 0.5),
                },
                orientation: "horizontal",
            };
        } else {
            return {
                bounds: {
                    width,
                    height: height * 0.2,
                    x: 0,
                    y: height * 0.8,
                },
                orientation: "horizontal",
            };
        }
    }
};
