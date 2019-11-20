import React from "react";

export default function useTransitions(anims) {
    const [animations] = React.useState(explodeAnims(anims));
    const [timeline, setTimeline] = React.useState();

    return [
        (from, to) => {
            const key = animKey(from, to);
            if (animations[key]) {
                const tl = animations[key]();
                setTimeline(tl);
            }
        },
        () => {
            console.log("Stopping", timeline);
            if (timeline) {
                timeline.progress(1);
            }
        },
        timeline,
    ];
}

// Parse out the animations with multiple keys into individual entries for each one.
function explodeAnims(anims) {
    const result = {};
    Object.keys(anims).forEach(key => {
        key.split("|")
            .map(fmtKey)
            .forEach(k => (result[k] = anims[key]));
    });
    return result;
}

// Format a single key entry into the appropriate format
function fmtKey(key) {
    // Is it a transition or a singular entry? Must have at least one character before ">"
    if (key.indexOf(">")) {
        return key
            .split(">")
            .map(k => k.trim())
            .reduce((prev, cur) => animKey(prev, cur));
    } else {
        return key.trim();
    }
}

function animKey(from, to) {
    return `${from} > ${to}`;
}
