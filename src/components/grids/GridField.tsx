import React from "react";
import SelectableGrid from "./SelectableGrid";

type Props = any;

const GridField = (props: Props) => {
  return (
    <div>
      <SelectableGrid
        type={props.gridType}
        rotation={props.rotation}
        input={props.input}
      />
    </div>
  );
};

export default GridField;
