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
    const { game } = props;
    const Layout = chooseLayout(game.width, game.height);
    return (
        <>
            <Layout {...props} />
        </>
    );
}

// Determine the orientation of the HUD
const orientation = (w, h) => h > w && h >= 400 ? "portrait" : "landscape";

// Determine which HUD to display
const chooseLayout = (w, h) => {
    // Limits / cutoffs for certain ranges
    const miniLimit = 365;
    const portraitLimit = 800;
    const ori = orientation(w, h);

    // First, if any dimension can be considered "mini" then we choose that layout. This can occur even when the other
    // dimension is quite large. It can also easily occur with a narrow phone.
    if (w <= miniLimit || h <= miniLimit) {
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
    game: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }).isRequired,
};

Layouts.defaultProps = {
    width: 0,
    height: 0,
    game: {
        width: 0,
        height: 0,
    },
};