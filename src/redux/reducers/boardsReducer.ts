import { boards } from "../initialStates/boards";

// interface boardType {
//   name: string;
//   code: string;
//   size: Array<number>;
//   numSpaces: number;
//   spaceShape: string;
//   rowCodes: Array<string>;
//   columnCodes: Array<string>;
//   rowNums: Array<number>;
//   columnNums: Array<number>;
// }

export const boardsReducer = (state = boards, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
