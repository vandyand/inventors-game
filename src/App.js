import React, { useRef } from "react";
import { connect } from "react-redux";
import Game from "./components/Game";
import "./app.scss";

const useComponentWillMount = (...funcs) => {
  const willMount = useRef(true);
  if (willMount.current) {
    funcs.forEach((func) => func());
  }
  willMount.current = false;
};

const App = ({ startUpLoadGame, getPiecesStrength, state }) => {
  useComponentWillMount(startUpLoadGame, getPiecesStrength);

  return <Game />;
};

const mapDispatchToProps = (dispatch) => ({
  startUpLoadGame: () => dispatch({ type: "STARTUP_LOAD_GAME" }),
  getPiecesStrength: () => dispatch({ type: "GET_PIECES_STRENGTH" }),
});

export default connect(null, mapDispatchToProps)(App);
