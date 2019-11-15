export default function demo(store) {
    //store.subscribe(() => console.log(JSON.stringify(store.getState(), null, 2)));
    //store.dispatch({ type: "clock.update", value: true });

    store.dispatch({ type: "balances.add", balance: { title: "Credit", value: "$999,999,999.99" } });
    store.dispatch({ type: "balances.add", balance: { title: "Win", value: "¥ 1234" } });
    store.dispatch({ type: "balances.add", balance: { title: "Bet", value: "£56.78" } });
    //store.dispatch({ type: "balances.add", balance: { title: "Free Games", value: "1" }});

    store.dispatch({ type: "buttons.update", button: "menu", value: true });
    store.dispatch({ type: "buttons.update", button: "sound", value: true });
    store.dispatch({ type: "buttons.update", button: "home", value: true });
    store.dispatch({ type: "buttons.update", button: "cashier", value: true });
    store.dispatch({ type: "buttons.update", button: "history", value: false });
    store.dispatch({ type: "buttons.update", button: "info", value: false });

    store.dispatch({ type: "ui.updateLayout", bounds: { width: 100, height: 600 }, orientation: "vertical" });
    store.dispatch({ type: "ui.setSkin", skin: "slot.standard" });

    // Some demo screens, obviously not full components but just something to
    // get an idea of how to offset them
    store.dispatch({ type: "screens.add", name: "main", elements: [], layer: 0 });
    store.dispatch({
        type: "screens.add",
        name: "menu",
        elements: [
            { type: "button", text: "Example1" },
            { type: "button", text: "Example2" },
            { type: "button", text: "Example3" },
            { type: "button", text: "Example4" },
            { type: "button", text: "Example5" },
            { type: "button", text: "Example6" },
        ],
        align: "center",
        layer: 2,
    });
    store.dispatch({
        type: "screens.add",
        name: "bet-config",
        elements: [{ type: "header", text: "Bet Config" }],
        align: "center",
        layer: 1,
    });
    store.dispatch({ type: "screens.setActiveScreen", screen: "main" });

    store.dispatch({ type: "title.update", text: "Example Game", enabled: true });
}
