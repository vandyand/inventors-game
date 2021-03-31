type board = {
  id: string;
  name: string;
  code: string;
  shape: string;
  size: number;
  // numSpaces: number;
  spaceShape: string;
  // rowCodes: Array<string>;
  // columnCodes: Array<string>;
};

export const boards: Array<board> = [
  {
    id: "uuid_boards_1",
    name: "chess board",
    code: "chess",
    shape: "square",
    size: 8,
    // numSpaces: 64,
    spaceShape: "square",
    // rowCodes: ["1", "2", "3", "4", "5", "6", "7", "8"],
    // columnCodes: ["a", "b", "c", "d", "e", "f", "g", "h"],
  },
];
