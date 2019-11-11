export default function title(state = { text: null, enabled: false }, action) {
    switch (action.type) {
        case "title.update":
            return {
                ...state,
                text: action.text || state.text,
                enabled: typeof action.enabled === "boolean" ? action.enabled : state.enabled,
            };
        default:
            return state;
    }
}
