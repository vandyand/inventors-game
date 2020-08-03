export const pieces = [
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
  {
    name: "knight",
    code: "n",
    img: "",
    movement: {
      code: "square-directional",
      possibleMoves: ["ffl", "ffr", "fll", "frr", "bll", "brr", "bbl", "bbr"],
      attackMoves: ["ffl", "ffr", "fll", "frr", "bll", "brr", "bbl", "bbr"],
      attackSameAsMove: true,
      canJump: true,
    },
    promotion: {},
  },
  {
    name: "king",
    code: "k",
    img: "",
    movement: {
      code: "square-directional",
      possibleMoves: ["fl", "f", "fr", "l", "r", "bl", "b", "br"],
      attackMoves: ["fl", "f", "fr", "l", "r", "bl", "b", "br"],
      attackSameAsMove: true,
      canJump: false,
    },
    promotion: {},
  },
  {
    name: "pawn",
    code: "p",
    img: "",
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
  },
  {
    name: "first move pawn",
    code: "fmp",
    img: "",
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
  },
  {
    name: "rook",
    code: "r",
    img: "",
    movement: {
      code: "square-directional",
      possibleMoves: ["f+", "b+", "l+", "r+"],
      attackMoves: ["f+", "b+", "l+", "r+"],
      attackSameAsMove: true,
      canJump: false,
    },
    promotion: {},
  },
  {
    name: "bishop",
    code: "b",
    img: "",
    movement: {
      code: "square-directional",
      possibleMoves: ["fl+", "fr+", "bl+", "br+"],
      attackMoves: ["fl+", "fr+", "bl+", "br+"],
      attackSameAsMove: true,
      canJump: false,
    },
    promotion: {},
  },
  {
    name: "queen",
    code: "q",
    img: "",
    movement: {
      code: "square-directional",
      possibleMoves: ["fl+", "f+", "fr+", "l+", "r+", "bl+", "b+", "br+"],
      attackMoves: ["fl+", "f+", "fr+", "l+", "r+", "bl+", "b+", "br+"],
      attackSameAsMove: true,
      canJump: false,
    },
    promotion: {},
  },
  {
    name: "jumping queen",
    code: "jq",
    img: "",
    movement: {
      code: "square-directional",
      possibleMoves: ["fl+", "f+", "fr+", "l+", "r+", "bl+", "b+", "br+"],
      attackMoves: ["fl+", "f+", "fr+", "l+", "r+", "bl+", "b+", "br+"],
      attackSameAsMove: true,
      canJump: true,
    },
    promotion: {},
  },
];