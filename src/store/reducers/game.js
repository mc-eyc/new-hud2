const defaultState = {
    bounds: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    },
};

export default function game(state = defaultState, action) {
    switch (action.type) {
        case "game.updateBounds":
            return {
                ...state,
                bounds: {
                    ...state.bounds,
                    ...action.bounds,
                },
            };
        default:
            return state;
    }
}
