import React from "react";

import Group from "./group";

export default function HorizontalLayout(...children) {
    return [
        <Group key="auto-config-container" x={0} y={8} size={48}>
            {children[0]}
        </Group>,
        <Group key="spin-container" x={54} y={0} size={64}>
            {children[1]}
        </Group>,
        <Group key="bet-config-container" x={124} y={8} size={48}>
            {children[2]}
        </Group>
    ];
}

HorizontalLayout.viewBox = "0 0 172 64";
