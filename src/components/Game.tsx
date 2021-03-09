import React from "react";
import { connect } from "react-redux";
import Board from "./Board";
import Controls from "./Controls";
import Engine from "../engine/Engine.container";

const Game = (state: any) => {
  console.log(state);
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
