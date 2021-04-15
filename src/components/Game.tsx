import React, { useEffect } from "react";
import Board from "./Board.container";
import Controls from "./Controls";
import Engine from "../engine/Engine.container";

type GameProps = {
  state: any;
  onLoadGameType: (id: number) => void;
  // onLoadPieces: (codes: Array<string>) => void;
};

const Game: React.FC<GameProps> = ({ state, onLoadGameType }) => {
  useEffect(() => {
    onLoadGameType(1);
  }, []);

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

export default Game;
