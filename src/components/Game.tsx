import React from "react";
import { connect } from "react-redux";
import Board from "./Board";
import Controls from "./Controls";
import GameEngine from "../gameEngine/gameEngine.container";

const Game = () => (
  <div className="app">
    <Board />
    <Controls />
    {state.currentGame.winner && `Team ${state.currentGame.winner} wins!`}
    <br />
    <GameEngine />
  </div>
);

const mapStateToProps = (state: any) => ({
  state,
});

export default connect(mapStateToProps, null)(Game);
