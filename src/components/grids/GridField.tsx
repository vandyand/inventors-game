import React from "react";
import Grid from "./Grid";

type Props = any;

const GridField = (props: Props) => {
  return (
    <div>
      <Grid
        type={props.gridType}
        rotation={props.rotation}
        input={props.input}
      />
    </div>
  );
};

export default GridField;
