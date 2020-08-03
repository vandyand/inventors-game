import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
// import devToolsEnhancer from "remote-redux-devtools";
import {
  piecesReducer,
  boardsReducer,
  gameTypesReducer,
  currentGameReducer,
} from "./redux/reducers";

const combinedReducer = combineReducers({
  pieces: piecesReducer,
  boards: boardsReducer,
  gameTypes: gameTypesReducer,
  currentGame: currentGameReducer,
});

// const fullStateCombinedReducer = (state = {}, action) => {
//   return {
//     pieces: piecesReducer(state.pieces, action, state),
//     boards: boardsReducer(state.boards, action, state),
//     gameTypes: gameTypesReducer(state.gameTypes, action, state),
//     currentGame: currentGameReducer(state.currentGame, action, state),
//   };
// };

const store = createStore(combinedReducer);
// const store = createStore(countReducer, devToolsEnhancer({ realtime: true }));

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
