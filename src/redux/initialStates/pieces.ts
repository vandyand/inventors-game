interface movement {
  code: string;
  possibleMoves: Array<string>;
  attackMoves: Array<string>;
  attackSameAsMove: boolean;
  canJump: boolean;
}

export interface promotion {
  to: string;
  condition: string;
  conditionCode: string;
}

interface piece {
  name: string;
  code: string;
  img: string;
  movement: movement;
  promotion: promotion;
  strength: number;
}

export const pieces: Array<piece> = [
  {
    name: "super pawn",
    code: "sp",
    img: "pawn",
    movement: {
      code: "square-directional",
      possibleMoves: ["fl", "f", "ff", "fr"],
      attackMoves: [],
      attackSameAsMove: true,
      canJump: false,
    },
    promotion: {
      to: "psp",
      condition: "last row",
      conditionCode: "lr",
    },
    strength: 0,
  },
  {
    name: "promoted super pawn",
    code: "psp",
    img: "pawn",
    movement: {
      code: "square-directional",
      possibleMoves: ["fl", "f", "ff", "fr", "l", "r", "bl", "b", "bb", "br"],
      attackMoves: [],
      attackSameAsMove: true,
      canJump: false,
    },
    promotion: {
      to: "",
      condition: "",
      conditionCode: "",
    },
    strength: 0,
  },
  {
    name: "knight",
    code: "n",
    img: "knight",
    movement: {
      code: "square-directional",
      possibleMoves: ["ffl", "ffr", "fll", "frr", "bll", "brr", "bbl", "bbr"],
      attackMoves: [],
      attackSameAsMove: true,
      canJump: false,
    },
    promotion: {
      to: "",
      condition: "",
      conditionCode: "",
    },
    strength: 0,
  },
  {
    name: "king",
    code: "k",
    img: "king",
    movement: {
      code: "square-directional",
      possibleMoves: ["fl", "f", "fr", "l", "r", "bl", "b", "br"],
      attackMoves: [],
      attackSameAsMove: true,
      canJump: false,
    },
    promotion: {
      to: "",
      condition: "",
      conditionCode: "",
    },
    strength: 0,
  },
  {
    name: "pawn",
    code: "p",
    img: "pawn",
    movement: {
      code: "square-directional",
      possibleMoves: ["f"],
      attackMoves: ["fl", "fr"],
      attackSameAsMove: false,
      canJump: false,
    },
    promotion: {
      to: "q",
      condition: "last row",
      conditionCode: "lr",
    },
    strength: 0,
  },
  {
    name: "first move pawn",
    code: "fmp",
    img: "pawn",
    movement: {
      code: "square-directional",
      possibleMoves: ["f", "ff"],
      attackMoves: ["fl", "fr"],
      attackSameAsMove: false,
      canJump: false,
    },
    promotion: {
      to: "p",
      condition: "not first move",
      conditionCode: "nfm",
    },
    strength: 0,
  },
  {
    name: "rook",
    code: "r",
    img: "rook",
    movement: {
      code: "square-directional",
      possibleMoves: ["f+", "b+", "l+", "r+"],
      attackMoves: [],
      attackSameAsMove: true,
      canJump: false,
    },
    promotion: {
      to: "",
      condition: "",
      conditionCode: "",
    },
    strength: 0,
  },
  {
    name: "bishop",
    code: "b",
    img: "bishop",
    movement: {
      code: "square-directional",
      possibleMoves: ["fl+", "fr+", "bl+", "br+"],
      attackMoves: [],
      attackSameAsMove: true,
      canJump: false,
    },
    promotion: {
      to: "",
      condition: "",
      conditionCode: "",
    },
    strength: 0,
  },
  {
    name: "queen",
    code: "q",
    img: "queen",
    movement: {
      code: "square-directional",
      possibleMoves: ["fl+", "f+", "fr+", "l+", "r+", "bl+", "b+", "br+"],
      attackMoves: [],
      attackSameAsMove: true,
      canJump: false,
    },
    promotion: {
      to: "",
      condition: "",
      conditionCode: "",
    },
    strength: 0,
  },
  {
    name: "jumping queen",
    code: "jq",
    img: "queen",
    movement: {
      code: "square-directional",
      possibleMoves: ["fl+", "f+", "fr+", "l+", "r+", "bl+", "b+", "br+"],
      attackMoves: [],
      attackSameAsMove: true,
      canJump: true,
    },
    promotion: {
      to: "",
      condition: "",
      conditionCode: "",
    },
    strength: 0,
  },
];
