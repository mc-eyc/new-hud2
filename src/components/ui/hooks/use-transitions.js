import React from "react";

export default function useTransitions(targetRefs, anims) {
    // Parse out the target refs
    const refs = parseRefs(targetRefs);

    // Store the animations in the state
    const [animations, setAnimations] = React.useState({});

    // Store the timeline in the state
    const [timeline, setTimeline] = React.useState();

    // Setup the animations in the state once (avoids the expensive call to explodeAnims)
    React.useEffect(() => {
        setAnimations(explodeAnims(anims));
    }, []);

    return [
        (from, to) => {
            const key = animKey(from, to);
            if (animations[key]) {
                const tl = animations[key](refs);
                setTimeline(tl);
            }
        },
        () => {
            if (timeline) {
                timeline.progress(1);
            }
        },
        timeline,
    ];
}

// Parse out the refs into their current state
function parseRefs(refs) {
    const result = {};
    Object.keys(refs).forEach(key => (result[key] = refs[key].current));
    return result;
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
