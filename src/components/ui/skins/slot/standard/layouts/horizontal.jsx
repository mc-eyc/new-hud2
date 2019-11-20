import React from "react";

export default function HorizontalLayout(...children) {
    return [
        <g key="auto-config-container" transform="translate(0, 8)">
            {children[0]}
        </g>,
        <g key="spin-container" transform="translate(54, 0)">
            {children[1]}
        </g>,
        <g key="bet-config-container" transform="translate(124, 8)">
            {children[2]}
        </g>,
    ];
}

HorizontalLayout.viewBox = "0 0 172 64";
