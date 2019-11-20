import React from "react";

export default function HorizontalLayout(props) {
    return [
            <g key="auto-config-container" transform="translate(0, 8)">{props.children[0]}</g>,
            <g key="spin-container" transform="translate(54, 0)">{props.children[1]}</g>,
            <g key="bet-config-container" transform="translate(124, 8)">{props.children[2]}</g>,
    ];
}

HorizontalLayout.viewBox = "0 0 172 64";
