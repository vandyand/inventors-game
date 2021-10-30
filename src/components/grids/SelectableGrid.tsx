import React from "react";
import Grid, { GridProps } from "./Grid";


type input = {
  onChange: (newSelectedCells: Array<number>) => void;
  value: Array<number>;
};

type SelectableGridProps = GridProps & {
  input?: input;
};

const SelectableGrid = ({ input, ...otherProps }: SelectableGridProps) => {

  const selectedCells = input.value;

  const updateSelectedCells = (newSelectedCells) => {
    input.onChange(newSelectedCells);
  };

  const toggleCell = (targetId) => {
    if (selectedCells.includes(targetId)) {
      updateSelectedCells(selectedCells.filter((x) => x !== targetId));
      return;
    }
    updateSelectedCells([...selectedCells, targetId]);
  };

  const handleClick = (id) => {
    toggleCell(id);
  };

  return <Grid
    selectedCells={selectedCells}
    updateSelectedCells={handleClick}
    {...otherProps}
  />

}

export default SelectableGrid;
