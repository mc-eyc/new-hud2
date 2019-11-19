import React from "react";

export default function useTransitions(anims) {
    const [animations] = React.useState(anims);
    return [() => console.log("play", animations), () => console.log("stop", animations)];
}
