import React from "react";

export default function useTransitionRef(ref) {
    const elementRef = React.useRef();
    const [skin, setSkin] = React.useState("default");

    React.useImperativeHandle(ref, () => ({
        setSkin,
        updateState: () => console.log("Updating to some state value"),
        element: elementRef.current,
    }));

    return [elementRef, skin];
}
