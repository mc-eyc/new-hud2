import React from "react";

export default function VerticalLayout(...children) {
    return [
        <g key="auto-config-container" transform="translate(8, 0)">
            {children[0]}
        </g>,
        <g key="spin-container" transform="translate(0, 54)">
            {children[1]}
        </g>,
        <g key="bet-config-container" transform="translate(8, 124)">
            {children[2]}
        </g>,
    ];
}

VerticalLayout.viewBox = "0 0 64 174";
