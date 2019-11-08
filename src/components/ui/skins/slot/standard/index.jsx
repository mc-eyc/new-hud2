import React from "react";
import styled from "styled-components";

import Spin from "./buttons/spin";
import AutoSpinConfig from "./buttons/auto-spin-config";
import BetConfig from "./buttons/bet-config";
import VerticalLayout from "./layouts/vertical";
import HorizontalLayout from "./layouts/horizontal";

const StyledUI = styled.svg``;

export default function SlotStandard(props) {
    const { orientation, data } = props;
    const Layout = orientation === "vertical" ? VerticalLayout : HorizontalLayout;
    return (
        <StyledUI width="100%" height="100%" viewBox={Layout.viewBox}>
            <Layout>
                <AutoSpinConfig />
                <Spin />
                <BetConfig />
            </Layout>
        </StyledUI>
    );
}

// Called when automatically laying out where the UI should go (ie. the game is not providing it)
SlotStandard.autoLayout = ({ width, height }, platform, inverted = false) => {
    if (platform === "mobile") {
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
};
