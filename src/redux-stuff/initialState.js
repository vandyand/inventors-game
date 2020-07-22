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
    rowCodes: ["1", "2", "3", "4", "5", "6", "7", "8"],
    columnCodes: ["a", "b", "c", "d", "e", "f", "g", "h"],
    rowNums: [...Array(8).keys()],
    columnNums: [...Array(8).keys()],
  },
];

const initialState = {
  count: 0,
  currentWinner: "",
  gameBoardAndPiecesSequence: [
    [
      "Asp-a1",
      "Asp-b1",
      "Asp-c1",
      "Asp-d1",
      "Asp-e1",
      "Asp-f1",
      "Asp-g1",
      "Asp-h1",
      "Bsp-a8",
      "Bsp-b8",
      "Bsp-c8",
      "Bsp-d8",
      "Bsp-e8",
      "Bsp-f8",
      "Bsp-g8",
      "Bsp-h8",
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
