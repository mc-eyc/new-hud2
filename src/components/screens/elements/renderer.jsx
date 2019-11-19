import React from "react";
import classNames from "classnames";
import _omit from "lodash.omit";

import elements from "./types";

export default function ScreenElementRenderer(props) {
    return props.elements.map((e, i) => {
        const Element = elementChooser(e.type);
        const className = classNames(
            "element",
            e.type,
            i === 0 && "first-element",
            i === props.elements.length - 1 && "last-element"
        );
        return <Element key={`screen-element-${i}`} {..._omit(e, ["type"])} className={className} />;
    });
}

const elementChooser = type => {
    switch (type) {
        case "button":
            return elements.Button;
        case "group":
            return elements.Group;
        case "header":
            return elements.Header;
        case "text":
            return elements.Text;
        default:
            throw new Error(`Unknown element type "${type}"`);
    }
};
