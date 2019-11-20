import React from "react";

import useTransitionRef from "../../../../hooks/use-transition-ref";

export default React.forwardRef(function AutoSpinConfig(props, forwardRef) {
    const [ref] = useTransitionRef(forwardRef);

    return (
        <svg className="button auto-spin-config" width="48" height="48" viewBox="0 0 48 48" ref={ref}>
            <circle className="ui-bg theme-fill" cx="24" cy="24" r="24" />
            <circle className="ui-fg theme-stroke" cx="24" cy="24" r="23" strokeWidth="2" fill="none" />`
        </svg>
    );
});
