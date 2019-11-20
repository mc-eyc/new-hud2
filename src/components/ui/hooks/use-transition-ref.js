import React from "react";

export default function useTransitionRef(ref) {
    const elementRef = React.useRef();
    React.useImperativeHandle(ref, () => ({
        /*
        play: () => console.log("playing"),
        stop: () => console.log("stopping"),
      */
        updateState: () => console.log("Updating to some state value"),
        element: elementRef.current,
    }));
    return elementRef;
}
