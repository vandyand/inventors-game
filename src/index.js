import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routeslol";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combinedReducer,
  composeEnhancers(applyMiddleware(thunk))
  // applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
