import React from "react";
import Grid from "../grids/Grid";

type Props = any;

const GridField = (props: Props) => {
  return (
    <div>
      <Grid
      type={"squares"}
      rotation={0}
      />
    </div>
  );
};

export default GridField;
