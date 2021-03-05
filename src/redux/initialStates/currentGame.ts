type move = {
  from: string;
  piece: string;
  possibleMoves: Array<string>;
};

type currentGameType = {
  arrangementSequence: Array<any>;
  currentArrangementSeqNum: number;
  code: string;
  moves: Array<string>;
  whoseTurn: string;
  newMove: move;
  winner: string;
  playerA: string;
  playerB: string;
};

export const currentGame: currentGameType = {
  arrangementSequence: [],
  currentArrangementSeqNum: 0,
  code: "chess",
  moves: [],
  whoseTurn: "A",
  newMove: {
    from: "",
    piece: "",
    possibleMoves: [],
  },
  winner: "",
  playerA: "human",
  playerB: "computer",
};
