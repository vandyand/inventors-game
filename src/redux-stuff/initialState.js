const pieces = [
  {
    name: "super pawn",
    code: "sp",
    img: "",
    movement: {
      move: ["fl", "f", "ff", "fr"],
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
  pieces: pieces,
};

const initialState = {
  count: 0,
  gameBoardAndPiecesSequence: [
    {
      teamA: ["d2-sp", "e1-sp"],
      teamB: ["d7-sp", "e7-sp"],
    },
    {
      teamA: ["d3-sp", "e1-sp"],
      teamB: ["d7-sp", "e7-sp"],
    },
    {
      teamA: ["d3-sp", "e1-sp"],
      teamB: ["d7-sp", "e5-sp"],
    },
    {
      teamA: ["d3-sp", "f2-sp"],
      teamB: ["d7-sp", "e5-sp"],
    },
    {
      teamA: ["d3-sp", "f2-sp"],
      teamB: ["d6-sp", "e5-sp"],
    },
    {
      teamA: ["d3-sp", "g3-sp"],
      teamB: ["d6-sp", "e5-sp"],
    },
    {
      teamA: ["d3-sp", "g3-sp"],
      teamB: ["d6-sp", "e3-sp"],
    },
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
      settings: {
        rules: {
          winCondition: "annihilation",
        },
        moveCode: "square-directional",
      },
    },
    {
      name: "gameType2",
      id: 145,
      board: board,
      settings: {
        rules: {
          winCondition: "checkmate",
        },
        moveCode: "square-directional",
      },
    },
  ],
};

export default initialState;
