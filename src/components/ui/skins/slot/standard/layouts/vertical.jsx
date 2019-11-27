import React from "react";

import Group from "./group";

export default function VerticalLayout(...children) {
    return [
        <Group key="auto-config-container" x={8} y={0} size={48}>
            {children[0]}
        </Group>,
        <Group key="spin-container" x={0} y={54} size={64}>
            {children[1]}
        </Group>,
        <Group key="bet-config-container" x={8} y={124} size={48}>
            {children[2]}
        </Group>,
    ];
}

VerticalLayout.viewBox = "0 0 64 174";
