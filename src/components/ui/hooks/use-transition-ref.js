import React from "react";

export default function useTransitionRef(ref) {
  React.useImperativeHandle(ref, () => ({
    play: () => console.log("playing"),
    stop: () => console.log("stopping"),
  }));
}