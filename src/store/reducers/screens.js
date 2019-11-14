import _omit from "lodash.omit";

export default function screens(state = { screens: {}, active: null }, action) {
    switch (action.type) {
        case "screens.add":
            return {
                ...state,
                screens: {
                    ...state.screens,
                    [action.name]: _omit(action, ["type", "name"]),
                },
            };
        case "screens.toggle":
            return {
                ...state,
                active: state.active === action.screen ? null : action.screen,
            };
        case "screens.setActiveScreen":
            return {
                ...state,
                active: state.active !== action.screen ? action.screen : state.screen,
            };
        case "screens.setScreenLevel":
            return {
                ...state,
                screens: {
                    ...state.screens,
                    [action.screen]: {
                        ...state.screens[action.screen],
                        level: action.level,
                    },
                },
            };
        default:
            return state;
    }
}
