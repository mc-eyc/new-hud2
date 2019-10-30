export default function buttons(state = {}, action) {
    switch (action.type) {
        case "buttons.update":
            return {
                ...state,
                [action.button]: action.value,
            };
        default:
            return state;
    }
}
