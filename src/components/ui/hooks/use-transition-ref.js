import React from "react";

export default function useTransitionRef(ref) {
    const elementRef = React.useRef();
    React.useImperativeHandle(ref, () => ({
      /*
        play: () => console.log("playing"),
        stop: () => console.log("stopping"),
      */
        element: elementRef.current,
    }));
    return elementRef;
}
