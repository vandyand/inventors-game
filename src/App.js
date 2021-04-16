import React from "react";
import { connect } from "react-redux";
import Game from "./components/game/Game.container";
import { LOAD_GAME, GET_PIECES_STRENGTH } from "./redux/actions/actionTypes";
import { useComponentWillMount } from "./helpers";
import "./app.scss";

const App = ({ onLoadGame, onGetPiecesStrength, state }) => {
  useComponentWillMount(onLoadGame, onGetPiecesStrength);

  console.log("state:", state);
  return <Game />;
};

const mapDispatchToProps = (dispatch) => ({
  onLoadGame: () => dispatch({ type: LOAD_GAME }),
  onGetPiecesStrength: () => dispatch({ type: GET_PIECES_STRENGTH }),
});

export default connect((state) => {
  return { state };
}, mapDispatchToProps)(App);
