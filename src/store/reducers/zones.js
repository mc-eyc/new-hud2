import _omit from "lodash.omit";

const defaultZone = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
};

const defaultState = {
    viewport: defaultZone,
    stage: defaultZone,
    ui: defaultZone,
    screen: defaultZone,
};

export default function zones(state = defaultState, action) {
    switch (action.type) {
        case "zones.updateZone":
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
