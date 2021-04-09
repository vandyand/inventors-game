import React from "react";
import { connect } from "react-redux";
import Board from "./Board.container";
import Controls from "./Controls";
import Engine from "../engine/Engine.container";

const Game = (state: any) => {
  return (
    <div className="app">
      <Board />
      <Controls />
      {state.currentGame.winner && `Team ${state.currentGame.winner} wins!`}
      <br />
      <Engine />
    </div>
  );
};

const mapStateToProps = (state: any) => state;

export default connect(mapStateToProps)(Game);
