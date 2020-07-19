const pieces = [
  {
    name: "super pawn",
    code: "sp",
    img: "",
    movement: {
      code: "square-directional",
      possibleMoves: ["fl", "f", "ff", "fr"],
      attackSameAsMove: true,
      canJump: false,
    },
  },
];

const board = {
  name: "chess board",
  shape: "square",
  size: [8, 8],
  numSpaces: 64,
  spaceShape: "square",
};

const initialState = {
  count: 0,
  gameBoardAndPiecesSequence: [
    ["Asp-d2", "Asp-e1", "Bsp-d7", "Bsp-e7"],
    ["Asp-d3", "Asp-e1", "Bsp-d7", "Bsp-e7"],
    ["Asp-d3", "Asp-e1", "Bsp-d7", "Bsp-e5"],
    ["Asp-d3", "Asp-f2", "Bsp-d7", "Bsp-e5"],
    ["Asp-d3", "Asp-f2", "Bsp-d6", "Bsp-e5"],
    ["Asp-d3", "Asp-g3", "Bsp-d6", "Bsp-e5"],
    ["Asp-d3", "Asp-g3", "Bsp-d6", "Bsp-e3"],
  ],
  gameBoardAndPiecesMoves: [
    "Asp-d2>d3",
    "Bsp-e7>e5",
    "Asp-e1>f2",
    "Bsp-d7>d6",
    "Asp-f2>g3",
    "Bsp-e5>e3",
  ],
  currentBoardAndPiecesSeqNum: 0,
  newMove: {
    piece: "",
    from: "",
    to: "",
  },
  currentGameType: 0,
  gameTypes: [
    {
      name: "gameType1",
      id: 143,
      board: board,
      pieces: pieces,
      settings: {
        winCondition: "annihilation",
      },
    },
    {
      name: "gameType2",
      id: 145,
      board: board,
      settings: {
        winCondition: "checkmate",
      },
    },
  ],
};

export default initialState;
