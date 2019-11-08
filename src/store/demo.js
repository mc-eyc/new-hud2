export default function demo(store) {
  //store.subscribe(() => console.log(JSON.stringify(store.getState(), null, 2)));
  //store.dispatch({ type: "clock.update", value: true });

  store.dispatch({ type: "balances.add", balance: { title: "Credit", value: "$999,999,999.99" }});
  store.dispatch({ type: "balances.add", balance: { title: "Win", value: "¥ 1234" }});
  store.dispatch({ type: "balances.add", balance: { title: "Bet", value: "£56.78" }});
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
  store.dispatch({ type: "screens.add", name: "menu", components: ["Menu"] });
  store.dispatch({ type: "screens.add", name: "bet-config", components: ["Bet Config"], uiOverlay: true });
}
