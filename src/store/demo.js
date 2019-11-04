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
}