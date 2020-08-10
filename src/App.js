import React, { useRef } from "react";
import { connect } from "react-redux";
import Board from "./components/Board";
import Controls from "./components/Controls";
import GameEngine from "./gameEngine/gameEngine";
// import Counter from "./components/Counter";
import "./App.scss";

const useComponentWillMount = (...funcs) => {
  const willMount = useRef(true);
  if (willMount.current) {
    funcs.forEach((func) => func());
  }
  willMount.current = false;
};

const App = ({ startUpLoadGame, getPiecesStrength, state }) => {
  useComponentWillMount(startUpLoadGame, getPiecesStrength);

  console.log(state);
  return (
    <div className="app">
      <Board />
      <Controls />
      {state.currentGame.winner && `Team ${state.currentGame.winner} wins!`}
      <br />
      <GameEngine />
    </div>
  );
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  startUpLoadGame: () => dispatch({ type: "STARTUP_LOAD_GAME" }),
  getPiecesStrength: () => dispatch({ type: "GET_PIECES_STRENGTH" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
