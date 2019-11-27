import React from "react";

import useTransitionRef from "../../../../hooks/use-transition-ref";

export default React.forwardRef(function BetConfig(props, forwardRef) {
    const [ref, skin, toggles] = useTransitionRef(forwardRef);

    return (
        <svg className="button bet-config" width="48" height="48" viewBox="0 0 48 48" ref={ref}>
            {chooseSkin(skin, props.data, toggles)}
        </svg>
    );
});

const chooseSkin = (skin, data = {}, toggles = {}) => {
    switch (skin) {
        case "close":
            return (
                <>
                    <circle className="ui-bg theme-fill" cx="24" cy="24" r="24" />
                    <circle className="ui-fg theme-stroke" cx="24" cy="24" r="23" strokeWidth="2" fill="none" />
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
                    <circle className="ui-bg theme-fill" cx="24" cy="24" r="24" />
                    <circle className="ui-fg theme-stroke" cx="24" cy="24" r="23" strokeWidth="2" fill="none" />
                    <g transform="translate(-4, -2) scale(0.75)">
                        <g transform="translate(38, 25)">
                            <ellipse fill="white" cx="0" cy="0" rx="18" ry="10" />
                        </g>
                        <g transform="translate(0, -12)">
                            <path
                                fill="white"
                                d="M38.0952 49.0518c-9.1097 0.0000 -16.7288 -4.0663 -18.3188 -9.4327a7.1222 7.1222 0 0 0 -0.3147 2.0870C19.4617 48.0331 27.8012 53.2257 38.0952 53.2257S56.7288 48.0331 56.7288 41.7060a7.1222 7.1222 0 0 0 -0.3147 -2.0870C54.8240 44.9855 47.2050 49.0518 38.0952 49.0518Z"
                            />
                        </g>
                        <g transform="translate(0, -6)">
                            <path
                                fill="white"
                                d="M38.0952 49.0518c-9.1097 0.0000 -16.7288 -4.0663 -18.3188 -9.4327a7.1222 7.1222 0 0 0 -0.3147 2.0870C19.4617 48.0331 27.8012 53.2257 38.0952 53.2257S56.7288 48.0331 56.7288 41.7060a7.1222 7.1222 0 0 0 -0.3147 -2.0870C54.8240 44.9855 47.2050 49.0518 38.0952 49.0518Z"
                            />
                        </g>
                        <g transform="translate(0, 0)">
                            <path
                                fill="white"
                                d="M38.0952 49.0518c-9.1097 0.0000 -16.7288 -4.0663 -18.3188 -9.4327a7.1222 7.1222 0 0 0 -0.3147 2.0870C19.4617 48.0331 27.8012 53.2257 38.0952 53.2257S56.7288 48.0331 56.7288 41.7060a7.1222 7.1222 0 0 0 -0.3147 -2.0870C54.8240 44.9855 47.2050 49.0518 38.0952 49.0518Z"
                            />
                        </g>
                    </g>
                </>
            );
    }
};
