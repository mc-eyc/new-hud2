import React from "react";

export default function useTransitions(anims) {
    const [animations] = React.useState(anims);
    const [timeline, setTimeline] = React.useState(null);
    return [
        (from, to) => {
            if (animations[[from, to]]) {
                const tl = animations[[from, to]]();
                console.log(tl);
                setTimeline(tl);
            }
        },
        () => {
            if (timeline) {
                console.log("Stopping", timeline);
                timeline.progress(1);
            }
        },
    ];
}
