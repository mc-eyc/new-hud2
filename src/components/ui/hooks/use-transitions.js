import React from "react";

export default function useTransitions(anims) {
    const [animations] = React.useState(anims);
    return [
        (from, to) => console.log("play", from, to, animations[[from, to]]),
        () => console.log("stopping all animations"),
    ];
}
