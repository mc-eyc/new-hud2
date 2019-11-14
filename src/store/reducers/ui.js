const defaultState = {
    auto: true,
    inverted: false,
    anchors: {
        x: 0.5,
        y: 0.5,
    },
    bounds: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    },
    activity: "default",
    orientation: "horizontal",
    platform: "desktop",
    skin: null,
    data: {},
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case "ui.setAuto":
            return {
                ...state,
                auto: action.auto,
            };
        case "ui.setPlatform":
            return {
                ...state,
                platform: action.platform,
            };
        case "ui.setInverted":
            return {
                ...state,
                inverted: action.inverted,
            };
        case "ui.setActivity":
            return {
                ...state,
                activity: action.activity,
            };
        case "ui.updateLayout":
            return {
                ...state,
                anchors: { ...state.anchors, ...(action.anchors || {}) },
                bounds: { ...state.bounds, ...(action.bounds || {}) },
                orientation: action.orientation || state.orientation,
            };
        case "ui.setSkin":
            return { ...state, skin: action.skin, data: action.data || {}, activity: action.activity || "default" };
        case "ui.setSkinData":
            return { ...state, data: action.data };
        case "ui.updateSkinData":
            return { ...state, data: { ...state.data, ...action.data } };
        default:
            return state;
    }
}
