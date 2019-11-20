import React from "react";

export default function useSkin(ref, opts) {
  React.useImperativeHandle(ref, () => ({
    autoLayout: opts.autoLayout,
    play: opts.play,
    stop: opts.stop,
  }), [opts]);
  // TODO: Optimise recreating this value with callbacks maybe?
}