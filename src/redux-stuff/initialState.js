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
  startingPlacement: {
    teamA: ["d2-sp", "e1-sp"],
    teamB: ["d7-sp", "e7-sp"],
  },
};

const initialState = {
  count: 0,
  games: [
    {
      name: "game1",
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
      name: "game2",
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
