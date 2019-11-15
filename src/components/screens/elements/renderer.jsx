import React from "react";
import _omit from "lodash.omit";

import elements from "./types";

export default function ScreenElementRenderer(props) {
  return props.elements.map((e, i) => {
    const Element = elementChooser(e.type);
    return <Element key={`screen-element-${i}`} {..._omit(e, ["type"])} />;
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