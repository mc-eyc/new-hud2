import { createStore, combineReducers } from "redux";
import { reducers } from "./reducers";

export default function(DevTools) {
    return createStore(
        combineReducers(reducers),
        DevTools.instrument(),
    );
}
