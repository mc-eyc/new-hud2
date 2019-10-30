export default function clock(state = false, action) {
    switch (action.type) {
        case "clock.update":
            return action.value;
        default:
            return state;
    }
}
