import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from "react";
import styled from "styled-components";

const StyledText = styled.svg`
    overflow: visible;

    path {
        fill: red;
    }

    text {
        text-align: center;
        text-anchor: middle;
    }
`;

export default function ScaledText(props) {
    const str = props.children.toString();
    const viewBox = useMemo(() => getViewBox(str), [str]);

    return (
        <StyledText className="scaled-text" width="100%" height="100%" viewBox={viewBox}>
            <text x="50%" y="50%" alignmentBaseline="central" dominantBaseline="central">
                {str}
            </text>
        </StyledText>
    );
}

const getViewBox = (str) => {
  let elem = document.createElement("span");
  elem.style.fontFamily = "Open Sans";
  elem.style.fontSize = "1em";
  elem.style.visibility = "hidden";
  elem.style.margin = "0px";
  elem.style.padding = "0px";
  elem.style.boxSizing = "border-box";
  elem.style.textAlign = "center";

  elem.innerText = str

  document.body.appendChild(elem);

  const width = elem.offsetWidth * 1.1;
  const height = elem.offsetHeight;

  document.body.removeChild(elem);
  elem = null;

  return `0 0 ${width} ${height}`;
};
