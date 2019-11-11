import _omit from "lodash.omit";

const defaultZone = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
};

const defaultState = {
    viewport: defaultZone,
    stage: defaultZone,
    ui: defaultZone,
    screenLayer0: defaultZone,
    screenLayer1: defaultZone,
    screenLayer2: defaultZone,
};

export default function zones(state = defaultState, action) {
    switch (action.type) {
        case "zones.update":
            return {
                ...state,
                [action.name]: {
                    ...state[action.name],
                    ..._omit(action, ["type", "name"]),
                },
            };
        default:
            return state;
    }
}
