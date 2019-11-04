import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from "react";
import styled from "styled-components";

const StyledText = styled.svg`
    overflow: visible;

    text {
        text-align: center;
        text-anchor: middle;
    }
`;

export class ST extends React.Component {
    componentDidMount() {
        this.textRenderer = document.createElement("span");
        this.ref = React.createRef();
    }

    componentWillUnmount() {
        document.body.removeChild(this.textRenderer);
        this.textRenderer = null;
        this.ref = null;
    }

    render() {
        return <StyledText>{this.props.children}</StyledText>;
    }

    static getViewBox(str, elem, widthCoef = 1.1, heightCoef = 1) {
        elem.innerText = str;
        return `0 0 ${elem.offsetWidth * widthCoef} ${elem.offsetHeight * heightCoef}`;
    }

    static getStyles(elem) {
        const styles = window.getComputedStyle(elem);
        return {
            fontFamily: styles.fontFamily,
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight,
        };
    }
}

export default function ScaledText(props) {
    const textRef = useRef(null);
    const str = props.children.toString();
    const [textRenderer, setTextRenderer] = useState(null);

    // Initialise the off screen text renderer as well as provide for its removal
    useEffect(() => {
        if (textRef.current) {
            const elem = createTextRenderer(textRef.current);
            document.body.appendChild(elem);
            setTextRenderer(elem);

            return () => {
                document.body.removeChild(elem);
                setTextRenderer(null);
            };
        }
    }, []);

    // Calculate the new viewbox whenever the string changes
    const viewBox = useMemo(() => {
        return getViewBox(str, textRenderer);
    }, [str, textRenderer]);

    return (
        <StyledText className="scaled-text" width="100%" height="100%" viewBox={viewBox}>
            <text x="50%" y="50%" alignmentBaseline="central" dominantBaseline="central" ref={textRef}>
                {str}
            </text>
        </StyledText>
    );
}

const createTextRenderer = ref => {
    const textRenderer = document.createElement("span");
    textRenderer.style.visibility = "hidden";
    textRenderer.style.position = "absolute";
    textRenderer.style.margin = textRenderer.style.padding = textRenderer.style.top = textRenderer.style.left = "0px";
    textRenderer.style.boxSizing = "border-box";
    textRenderer.style.textAlign = "center";

    if (ref) {
        applyStyles(textRenderer, window.getComputedStyle(ref));
    }

    return textRenderer;
};

const applyStyles = (target, styles) => {
    target.style.fontFamily = styles.fontFamily;
    target.style.fontWeight = styles.fontWeight;
    target.style.fontSize = styles.fontSize;
    return target;
};

const getViewBox = (str, renderer, wcoef = 1.1, hcoef = 1) => {
    if (str && renderer) {
        renderer.innerText = str;
        return `0 0 ${renderer.offsetWidth * wcoef} ${renderer.offsetHeight * hcoef}`;
    } else {
        return `0 0 0 0`;
    }
};