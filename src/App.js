import React, { useRef } from "react";
import { connect } from "react-redux";
import Game from "./components/Game";
import { LOAD_GAME, GET_PIECES_STRENGTH } from "./redux/actions/actionTypes";
import "./app.scss";

const useComponentWillMount = (...funcs) => {
  const willMount = useRef(true);
  if (willMount.current) {
    funcs.forEach((func) => func());
  }
  willMount.current = false;
};

const App = ({ startUpLoadGame, getPiecesStrength }) => {
  useComponentWillMount(startUpLoadGame, getPiecesStrength);

  return <Game />;
};

const mapDispatchToProps = (dispatch) => ({
  startUpLoadGame: () => dispatch({ type: LOAD_GAME }),
  getPiecesStrength: () => dispatch({ type: GET_PIECES_STRENGTH }),
});

export default connect(null, mapDispatchToProps)(App);
