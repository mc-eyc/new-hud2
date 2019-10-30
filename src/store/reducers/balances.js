export default function balances(state = [], action) {
    switch (action.type) {
        case "balances.add":
            return [...state, action.balance];
        case "balances.remove":
            return state.filter(b => b.title !== action.title);
        case "balances.update":
            return state.map(b => (b.title === action.balance.title ? { ...b, value: action.balance.value } : b));
        default:
            return state;
    }
}
