import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./styles.scss";
import createStore from "./store";
import Menu from "./components/menu";
import Window from "./components/window";
import demo from "./store/demo";

// Create the store and setup some initial values
const store = createStore();

// Setup the demo data
demo(store);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Menu />
        <Window />
      </div>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
