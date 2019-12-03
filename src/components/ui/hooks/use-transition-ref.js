import React from "react";

// TODO: Should this accept a set of conditions too?
export default function useTransitionRef(ref, helpers = {}) {
    const elementRef = React.useRef();
    const [skin, setSkin] = React.useState("default");
    const [toggles, setToggles] = React.useState({});

    React.useImperativeHandle(ref, () => ({
        setSkin,
        setToggle: (name, enabled) => setToggles({ ...toggles, [name]: enabled }),
        element: elementRef.current,
        target: getTransitionTarget(elementRef.current),
        ...helpers,
    }));

    return [elementRef, skin, toggles];
}

const getTransitionTarget = element => {
    if (element && element.parentElement && element.parentElement.className) {
        const className = element.parentElement.className.baseVal || element.parentElement.className;
        if (className.includes("ui-transition-target")) {
            return element.parentElement;
        } else {
            return element;
        }
    } else {
        return element;
    }
};
