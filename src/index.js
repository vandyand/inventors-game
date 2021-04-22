import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import {
  piecesReducer,
  boardReducer,
  gameTypesReducer,
  currentGameReducer,
} from "./redux/reducers";

const combinedReducer = combineReducers({
  pieces: piecesReducer,
  board: boardReducer,
  gameTypes: gameTypesReducer,
  currentGame: currentGameReducer,
  form: formReducer,
});

const store = createStore(combinedReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
