import _set from "lodash.set";

// Default theme constant - up here for readability
const defaultTheme = {
    // Generic foreground colour - serves as the fallback for all foreground colours
    color: "white",
    // Body background colour
    background: "rgba(0, 0, 0, 0.95)",
    // Generic font family - serves as the fallback for all font families
    fontFamily: "Open Sans",
    // Game title
    gameTitle: {
        color: "white",
    },
    // Button themes
    button: {
        color: "white",
    },
    // Balance themes
    balance: {
        title: {
            color: "white",
            fontFamily: "Open Sans",
        },
        value: {
            color: "white",
            fontFamily: "Open Sans",
        },
    },
    // Clock
    clock: {
        color: "white",
        fontFamily: "Open Sans",
    },
    // Border
    border: {
        color: "black",
    },
    // UI
    ui: {
        color: "white",
        background: "rgba(0, 0, 0, 0.95)",
    },
    screen: {
        background: "black",
        title: "white",
        text: "white",
        accent: "#46bebc",
        button: {
            color: "white",
            background: "#464646",
        }
    }
};

//
export default function theme(state = defaultTheme, action) {
    switch (action.type) {
        case "theme.update":
          return Object.assign({}, _set(state, action.prop, action.value));
        default:
            return state;
    }
}
