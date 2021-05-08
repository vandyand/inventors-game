export const getRowNum = (cellId, numCols) => Math.floor(cellId / numCols);

export const getColNum = (cellId, numRows) => cellId % numRows;

export const getBoardDimensions = (selectedCells, gridSize) => {
  if (!selectedCells) {
    return [0, 0];
  }
  const numGridRows = gridSize[1];
  const numGridCols = gridSize[0];
  const topRow = selectedCells.reduce((acc, cellId) => {
    const rowNum = getRowNum(cellId, numGridCols);
    if (rowNum < acc) {
      return rowNum;
    }
    return acc;
  }, Number.MAX_VALUE);
  const bottomRow = selectedCells.reduce((acc, cellId) => {
    const rowNum = getRowNum(cellId, numGridCols);
    if (rowNum > acc) {
      return rowNum;
    }
    return acc;
  }, Number.MIN_VALUE);
  const leftCol = selectedCells.reduce((acc, cellId) => {
    const colNum = getColNum(cellId, numGridRows);
    if (colNum < acc) {
      return colNum;
    }
    return acc;
  }, Number.MAX_VALUE);
  const rightCol = selectedCells.reduce((acc, cellId) => {
    const colNum = getColNum(cellId, numGridRows);
    if (colNum > acc) {
      return colNum;
    }
    return acc;
  }, Number.MIN_VALUE);

  return [bottomRow - topRow + 1, rightCol - leftCol + 1];
};
