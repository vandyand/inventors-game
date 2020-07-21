const pieces = [
  {
    name: "super pawn",
    code: "sp",
    img: "",
    movement: {
      code: "square-directional",
      possibleMoves: ["fl", "f", "ff", "fr"],
      attackMoves: ["fl", "f", "ff", "fr"],
      attackSameAsMove: true,
      canJump: false,
    },
    promotion: {
      to: "psp",
      condition: "last row",
      conditionCode: "lr",
    },
  },
  {
    name: "promoted super pawn",
    code: "psp",
    img: "",
    movement: {
      code: "square-directional",
      possibleMoves: ["fl", "f", "ff", "fr", "l", "r", "bl", "b", "bb", "br"],
      attackMoves: ["fl", "f", "ff", "fr", "l", "r", "bl", "b", "bb", "br"],
      attackSameAsMove: true,
      canJump: false,
    },
    promotion: {},
  },
];

const boards = [
  {
    name: "chess board",
    code: "chess",
    shape: "square",
    size: [8, 8],
    numSpaces: 64,
    spaceShape: "square",
    rows: ["1", "2", "3", "4", "5", "6", "7", "8"],
    columns: ["a", "b", "c", "d", "e", "f", "g", "h"],
  },
];

const initialState = {
  count: 0,
  gameBoardAndPiecesSequence: [
    [
      "Asp-a2",
      "Asp-b2",
      "Asp-c2",
      "Asp-d2",
      "Asp-e2",
      "Asp-f2",
      "Asp-g2",
      "Asp-h2",
      "Bsp-a7",
      "Bsp-b7",
      "Bsp-c7",
      "Bsp-d7",
      "Bsp-e7",
      "Bsp-f7",
      "Bsp-g7",
      "Bsp-h7",
    ],
  ],
  gameBoardAndPiecesMoves: [],
  currentBoardAndPiecesSeqNum: 0,
  newMove: {
    piece: "",
    from: "",
    to: "",
  },
  boards: boards,
  pieces: pieces,
  currentGameType: 0,
  gameTypes: [
    {
      name: "gameType1",
      id: 143,
      boardCode: "chess",
      pieceCodes: ["sp", "psp"],
      settings: {
        winCondition: "annihilation",
      },
    },
  ],
};

export default initialState;
