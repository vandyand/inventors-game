import React, { useEffect } from "react";
import TriangleGrid from "../grids/grids";
// import Board from "./Board.container";
// import Controls from "./Controls";
// import Engine from "../engine/Engine.container";

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
    <>
      <h1>test</h1>

      <svg width="100" height="100">
        <rect x="25" y="25" height="100" width="200" stroke="red" fill="none" />

        {/* <polygon points="0,0 50,50, 60, 30" /> */}

        {/* <div className="app">
        <Board />
        <Controls />
        {state.currentGame.winner && `Team ${state.currentGame.winner} wins!`}
        <br />
        <Engine />
      </div> */}
      </svg>

      <TriangleGrid height={20} width={20} startingOrientation={0} />
    </>
  );
};

export default Game;
