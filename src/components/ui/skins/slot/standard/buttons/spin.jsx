import React from "react";

import useTransitionRef from "../../../../hooks/use-transition-ref";

export default React.forwardRef(function Spin(props, forwardRef) {
    const [ref, skin] = useTransitionRef(forwardRef);

    return (
        <svg className="button spin" width="64" height="64" viewBox="0 0 64 64" ref={ref} data-skin={skin}>
            {chooseSkin(skin)}
        </svg>
    );
});

const chooseSkin = (skin = "default") => {
    switch (skin) {
        case "freeSpin":
            return [
                <circle className="ui-fg" cx="32" cy="32" r="32" />,
                <circle className="ui-bg" cx="32" cy="32" r="31" strokeWidth="2" fill="none" />,
            ];
        default:
            return [
                <circle className="ui-bg" cx="32" cy="32" r="32" />,
                <circle className="ui-fg" cx="32" cy="32" r="31" strokeWidth="2" fill="none" />,
            ];
    }
};
