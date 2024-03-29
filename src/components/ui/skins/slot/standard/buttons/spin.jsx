import React from "react";
import styled from "styled-components";

import useTransitionRef from "../../../../hooks/use-transition-ref";

import ScaledText from "../../../../../common/scaled-text";
import ButtonBody from "./common/button-body";
import ButtonLabel from "./common/button-label";

const StyledSpins = styled.svg.attrs(({ size = 32 }) => ({
    x: 32 - size / 2,
    y: 32 - size / 2,
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
}))`
    font-weight: 700;
`;

export default React.forwardRef(function Spin(props, forwardRef) {
    const [ref, skin, toggles] = useTransitionRef(forwardRef);

    return (
        <svg className="button spin" width="64" height="64" viewBox="0 0 64 64" ref={ref}>
            {chooseSkin(skin, props.data, toggles)}
        </svg>
    );
});

const chooseSkin = (skin = "default", data = {}, toggles = {}) => {
    switch (skin) {
        case "freeSpin":
            return (
                <>
                    <ButtonBody alt={true} />
                    {toggles.spins && data.spins >= 0 ? (
                        <StyledSpins className="ui-bg theme-fill">
                            <ScaledText>{data.spins}</ScaledText>
                        </StyledSpins>
                    ) : null}
                    <g transform="translate(32, 32)">
                        <ButtonLabel id="header" className="ui-bg theme-fill" radius={28} translate="32,32">
                            FREE
                        </ButtonLabel>
                        <ButtonLabel
                            id="footer"
                            className="ui-bg theme-fill"
                            radius={28}
                            direction={0}
                            translate="32,32">
                            SPINS
                        </ButtonLabel>
                    </g>
                </>
            );
        case "stop":
            return (
                <>
                    <ButtonBody />
                    <rect className="ui-fg theme-fill" width="32" height="32" x="16" y="16" rx="4" ry="4" />
                    {toggles.spins && data.spins > 0 ? (
                        <StyledSpins className="ui-bg theme-fill">
                            <ScaledText>{data.spins}</ScaledText>
                        </StyledSpins>
                    ) : null}
                </>
            );
        case "autoSpin":
            return (
                <>
                    <ButtonBody alt={true} />
                    <path
                        className="ui-bg theme-fill"
                        opacity="0.08"
                        d="M32.2934 13.1812A19.1122 19.1122 0 1 0 51.4056 32.2934A19.1122 19.1122 0 0 0 32.2934 13.1812Zm0.0000 32.3288A13.2167 13.2167 0 1 1 45.5101 32.2934A13.2206 13.2206 0 0 1 32.2934 45.5101Z"
                    />
                    <path
                        className="ui-bg theme-fill"
                        d="M56.7812 29.6312a1.1815 1.1815 0 0 0 -1.0358 -0.6262h-2.9458A20.7702 20.7702 0 1 0 32.2934 53.0636a2.5874 2.5874 0 1 0 0.0000 -5.1748a15.5953 15.5953 0 1 1 15.2409 -18.8838h-3.2687a1.1815 1.1815 0 0 0 -0.9727 1.8352l5.7380 8.5066a1.1815 1.1815 0 0 0 1.9494 0.0000L56.7104 30.8402A1.1815 1.1815 0 0 0 56.7812 29.6312Z"
                    />
                    {toggles.spins && data.spins > 0 ? (
                        <StyledSpins size={24} className="ui-bg theme-fill">
                            <ScaledText>{data.spins}</ScaledText>
                        </StyledSpins>
                    ) : null}
                </>
            );
        default:
            return (
                <>
                    <ButtonBody />
                    <path
                        className="ui-fg theme-fill"
                        d="M56.7812 29.6312a1.1815 1.1815 0 0 0 -1.0358 -0.6262h-2.9458A20.7702 20.7702 0 1 0 32.2934 53.0636a2.5874 2.5874 0 1 0 0.0000 -5.1748a15.5953 15.5953 0 1 1 15.2409 -18.8838h-3.2687a1.1815 1.1815 0 0 0 -0.9727 1.8352l5.7380 8.5066a1.1815 1.1815 0 0 0 1.9494 0.0000L56.7104 30.8402A1.1815 1.1815 0 0 0 56.7812 29.6312Z"
                    />
                </>
            );
    }
};
