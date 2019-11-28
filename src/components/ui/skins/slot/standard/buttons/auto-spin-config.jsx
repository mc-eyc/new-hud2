import React from "react";

import useTransitionRef from "../../../../hooks/use-transition-ref";
import ButtonBody from "./common/button-body";

export default React.forwardRef(function AutoSpinConfig(props, forwardRef) {
    const [ref, skin, toggles] = useTransitionRef(forwardRef);

    return (
        <svg className="button auto-spin-config" width="48" height="48" viewBox="0 0 48 48" ref={ref}>
            {chooseSkin(skin, props.data, toggles)}
        </svg>
    );
});

const chooseSkin = (skin, data = {}, toggles = {}) => {
    switch (skin) {
        case "close":
            return (
                <>
                    <ButtonBody size={48} />
                    <g transform="translate(24, 24) rotate(45)">
                        <line
                            className="ui-fg theme-stroke"
                            x1={-12}
                            y1="0"
                            x2={12}
                            y2="0"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                    </g>
                    <g transform="translate(24, 24) rotate(-45)">
                        <line
                            className="ui-fg theme-stroke"
                            x1={-12}
                            y1="0"
                            x2={12}
                            y2="0"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                    </g>
                </>
            );
        default:
            return (
                <>
                    <ButtonBody size={48} />
                    <g transform="translate(-3, -3) scale(0.7)">
                        <path
                            fill="white"
                            d="M63.2795 34.3520a1.2340 1.2340 0 0 0 -1.0932 -0.6542H59.5445A21.8965 21.8965 0 0 0 21.7226 23.5528a2.4845 2.4845 0 0 0 3.7184 3.3126a16.9193 16.9193 0 0 1 28.9855 6.8489H51.4203A1.2340 1.2340 0 0 0 50.3934 35.6108l5.3830 7.9752a1.2257 1.2257 0 0 0 2.0538 0.0000L63.2133 35.6108A1.2422 1.2422 0 0 0 63.2795 34.3520Z"
                        />
                        <path
                            fill="white"
                            d="M54.1615 49.2754a2.4845 2.4845 0 0 0 -3.5114 0.1739a16.9193 16.9193 0 0 1 -28.8861 -6.9482h2.7578A1.2422 1.2422 0 0 0 25.5487 40.5797l-5.3830 -7.9752a1.2919 1.2919 0 0 0 -2.0621 0.0000L12.7288 40.5797a1.2422 1.2422 0 0 0 1.0269 1.9379H16.6460A21.8965 21.8965 0 0 0 54.3354 52.7867A2.4845 2.4845 0 0 0 54.1615 49.2754Z"
                        />
                    </g>
                </>
            );
    }
};
