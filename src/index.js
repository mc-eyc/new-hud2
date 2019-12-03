import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createDevTools } from "redux-devtools";
import Inspector from "redux-devtools-inspector";
import LogMonitor from "redux-devtools-log-monitor";

import "./styles.scss";
import createStore from "./store";
import Menu from "./components/menu";
import Window from "./components/window";
import demo from "./store/demo";

// Create the devtools
const DevTools = createDevTools(<LogMonitor />);

// Create the store and setup some initial values
const store = createStore(DevTools);

// Setup the demo data
demo(store);

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <div style={{ position: "absolute", left: "16px", top: "225px", height: "80%" }}>
                    <DevTools />
                </div>
                <Menu />
                <Window />
            </div>
        </Provider>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
