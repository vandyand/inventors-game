type board = {
  name: string;
  code: string;
  shape: string;
  size: Array<number>;
  numSpaces: number;
  spaceShape: string;
  rowCodes: Array<string>;
  columnCodes: Array<string>;
  rowNums: Array<number>;
  columnNums: Array<number>;
};

export const boards: Array<board> = [
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
  {
    name: "chess board 2",
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
