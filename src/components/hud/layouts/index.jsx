import React, { useRef } from "react";
import PropTypes from "prop-types";

import Landscape from "./landscape";
import Portrait from "./portrait";
import Mini from "./mini";

/**
 * The Layouts component choose which layout to display based upon the provided properties for geometry.
 * It uses the "game" geometry to determine an aspect ratio and potential orientation. It then uses
 * the width and height properties to determine how to fill what the HUD is telling it to fill, ie. its
 * own width and height regardless of the game.
 */
export default function Layouts(props) {
    const { parent, updateZone, setHUDLayout, title, autoUI } = props;
    const Layout = chooseLayout(parent.width, parent.height);

    React.useEffect(() => {
        if (updateZone) {
            const stageBounds = Layout.stageBounds(parent, title.enabled);
            // TODO: Interesting - I think there should be separate UI and stage bounds as the screen in portrait
            // is not actually correct.
            updateZone("stage", stageBounds);
            if (autoUI) {
                updateZone("ui", Layout.uiBounds ? Layout.uiBounds(parent, title.enabled) : stageBounds);
            }
            updateZone("screenLayer2", { ...stageBounds, x: 0, y: 0 });
        }
    }, [parent, title, Layout, updateZone, autoUI]);

    React.useEffect(() => {
        setHUDLayout(Layout.name.toLowerCase());
    }, [Layout, setHUDLayout]);

    return (
        <>
            <Layout {...props} />
        </>
    );
}

// Determine the orientation of the HUD
const orientation = (w, h) => (h / w > 1.3 && h >= 400 ? "portrait" : "landscape");

// Determine which HUD to display
const chooseLayout = (w, h) => {
    // Limits / cutoffs for certain ranges
    const miniLimit = 365;
    const portraitLimit = 800;
    const ori = orientation(w, h);

    // First, if any dimension can be considered "mini" then we choose that layout. This can occur even when the other
    // dimension is quite large. It can also easily occur with a narrow phone.
    if ((w <= miniLimit && h <= w * 1.5) || h <= miniLimit || w <= miniLimit * 0.75 || (w <= 500 && h <= 500)) {
        return Mini;
    }
    // If we are in portrait orientation and within the bounds that determine the game can render the landscape HUD
    else if (ori === "portrait" && w <= portraitLimit) {
        return Portrait;
    }
    // By default we return the landscape orientation
    else {
        return Landscape;
    }
};

Layouts.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    parent: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }).isRequired,
    updateZone: PropTypes.func,
};

Layouts.defaultProps = {
    width: 0,
    height: 0,
    parent: {
        width: 0,
        height: 0,
    },
};
