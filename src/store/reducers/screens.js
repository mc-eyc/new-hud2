import _omit from "lodash.omit";

export default function screens(state = { screens: [], active: null }, action) {
    switch (action.type) {
        case "screens.add":
            return {
                ...state,
                screens: [...state.screens, _omit(action, ["type"])],
            };
        case "screens.toggle":
          return {
            ...state,
            active: state.active === action.screen ? null : action.screen,
          };
        default:
            return state;
    }
}
