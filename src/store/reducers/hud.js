export default function hud(state = { layout: "landscape" }, action) {
    switch (action.type) {
        case "hud.setLayout":
            return {
                ...state,
                layout: action.layout,
            };
        default:
            return state;
    }
}
