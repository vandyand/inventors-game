type winCondition = {
  type: string;
  killPiece?: string;
};

type settings = {
  winCondition: winCondition;
};

type gameType = {
  name: string;
  code: string;
  boardCode: string;
  pieceCodes: Array<string>;
  startingPiecePositions: Array<string>;
  settings: settings;
};

export const gameTypes: Array<gameType> = [
  {
    name: "gameType1",
    code: "sps",
    boardCode: "chess",
    pieceCodes: ["sp", "psp"],
    startingPiecePositions: [
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
    settings: {
      winCondition: { type: "annihilation" },
    },
  },
  {
    name: "knight and king mayhem",
    code: "kn",
    boardCode: "chess",
    pieceCodes: ["n", "k"],
    startingPiecePositions: [
      "An-c2",
      "An-d2",
      "An-e2",
      "An-f2",
      "Ak-d1",
      "Ak-e1",
      "Bn-c7",
      "Bn-d7",
      "Bn-e7",
      "Bn-f7",
      "Bk-d8",
      "Bk-e8",
    ],
    settings: {
      winCondition: { type: "annihilation" },
    },
  },
  {
    name: "king queen rook bishop fun",
    code: "kqrb",
    boardCode: "chess",
    pieceCodes: ["k", "r", "q", "b"],
    startingPiecePositions: [
      "Ab-c2",
      "Ar-d2",
      "Aq-e2",
      "Ab-f2",
      "Ak-d1",
      "Ak-e1",
      "Bb-c7",
      "Br-d7",
      "Bq-e7",
      "Bb-f7",
      "Bk-d8",
      "Bk-e8",
    ],
    settings: {
      winCondition: { type: "annihilation" },
    },
  },
  {
    name: "playing with pawns",
    code: "pwp",
    boardCode: "chess",
    pieceCodes: ["k", "p"],
    startingPiecePositions: [
      "Ap-a2",
      "Ap-b2",
      "Ap-c2",
      "Ap-d2",
      "Ap-e2",
      "Ap-f2",
      "Ap-g2",
      "Ap-h2",
      "Ak-e1",
      "Bp-a7",
      "Bp-b7",
      "Bp-c7",
      "Bp-d7",
      "Bp-e7",
      "Bp-f7",
      "Bp-g7",
      "Bp-h7",
      "Bk-d8",
    ],
    settings: {
      winCondition: { type: "annihilation" },
    },
  },
  {
    name: "chess",
    code: "chess",
    boardCode: "chess",
    pieceCodes: ["k", "q", "r", "b", "n", "p"],
    startingPiecePositions: [
      "Ar-a1",
      "An-b1",
      "Ab-c1",
      "Aq-d1",
      "Ak-e1",
      "Ab-f1",
      "An-g1",
      "Ar-h1",
      "Afmp-a2",
      "Afmp-b2",
      "Afmp-c2",
      "Afmp-d2",
      "Afmp-e2",
      "Afmp-f2",
      "Afmp-g2",
      "Afmp-h2",
      "Bfmp-a7",
      "Bfmp-b7",
      "Bfmp-c7",
      "Bfmp-d7",
      "Bfmp-e7",
      "Bfmp-f7",
      "Bfmp-g7",
      "Bfmp-h7",
      "Br-a8",
      "Bn-b8",
      "Bb-c8",
      "Bq-d8",
      "Bk-e8",
      "Bb-f8",
      "Bn-g8",
      "Br-h8",
    ],
    settings: {
      winCondition: {
        type: "kill piece",
        killPiece: "k",
      },
    },
  },
];
