import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import PerfectScrollbar from "perfect-scrollbar";

import "perfect-scrollbar/css/perfect-scrollbar.css";

import ScreenElementsRenderer from "./elements/renderer";

const StyledScreen = styled.div.attrs(props => ({
    style: {
        width: props.bounds.width,
        height: props.bounds.height,
        left: props.bounds.x,
        top: props.bounds.y,
        fontSize: props.fontSize,
        ...props.padding,
    },
}))`
    position: absolute;
    overflow: hidden;
    box-sizing: border-box;
    flex-direction: column;

    .ps__rail-x, .ps__rail-y, .ps--clicking {
        background:transparent !important;
        opacity: 1.0 !important;

        .ps__thumb-x, .ps__thumb-y {
            border-radius: 0;
        }
    }

    // Center horizontally
    ${props => (props.align.x === "center" ? "align-items: center;" : "")}

    // Center vertically
    ${props =>
        props.align.y === "center"
            ? "display:flex;.element:first-of-type{margin-top:auto}.element:last-of-type{margin-bottom:auto}"
            : ""}

`;

export default function Screen(props) {
    const { name, bounds, elements, layer, align } = props;
    const ref = useRef(null);
    const [fontSize, setFontSize] = useState(calcFontSize(bounds.width, bounds.height));
    const [padding, setPadding] = useState(calcPadding(layer, bounds.height));
    const [ps, setPs] = useState(null);

    // This hook uses a high-performance rendering trick to keep the scrollbar present across modal screens and
    // only actually destroys it when returning to the main screen.
    useEffect(() => {
        // If there is no scrollbar then enter one into the state
        if (!ps) {
            setPs(new PerfectScrollbar(ref.current));
        }
        // If there is a scrollbar then return an unmounting action for it
        if (ps) {
            return () => {
                ps.destroy();
                setPs(null);
            };
        }
    }, [ref, ps, setPs]);

    // This hook cleanly updates the scrollbar bounds rather than jumping around. Whenever the screen, elements,
    // or bounds change then this is updated. The padding and font sizes are also updated.
    useEffect(() => {
        if (ps) {
            ps.update();
            setPadding(calcPadding(layer, bounds.height, ps.scrollbarYActive, ps.scrollbarXActive));
            setFontSize(calcFontSize(bounds.width, bounds.height));
        }
    }, [ps, layer, name, bounds, elements]);

    // This hook scrolls to the top of each screen once the screen has rendered.
    useLayoutEffect(() => {
        if (ps && ref.current) {
            ref.current.scrollTop = 0;
        }
    }, [name, ps, ref]);

    return (
        <StyledScreen
            className="screen"
            bounds={bounds}
            layer={layer}
            align={parseAlignment(align)}
            padding={padding}
            fontSize={fontSize}
            ref={ref}>
            <ScreenElementsRenderer elements={elements} />
        </StyledScreen>
    );
}

const parseAlignment = (align = "top left") => {
    return {
        x: align.split(" ")[0] || "top",
        y: align.split(" ")[1] || align.split(" ")[0] || "left",
    };
};

const calcFontSize = (width, height) => {
    return `${Math.max(Math.min(width / 16, height / 8, 18), 10)}px`;
};

const calcPadding = (layer, height, vScroll = false, hScroll = false) => {
    const padding = layer > 0 ? Math.min(height / 8, 10) : 0;
    return layer > 0
        ? {
              paddingTop: 0,
              paddingRight: padding + (vScroll ? 6 : 0),
              paddingBottom: vScroll ? 6 : 0,
              paddingLeft: padding,
          }
        : { padding };
};
