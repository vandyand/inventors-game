// import React, {useState} from "react";
import React from "react";
// import { Redirect } from "react-router-dom";
// import Grid from "../grids/Grid";
import InventBoardForm from "./InventBoardForm";

const app_url = "http://localhost:3000";

export type gridType = "squares" | "triangles" | "hexagons";
type formValues = {
  gridType: gridType;
  rotation: number;
  selectedCells: Array<number>;
};

type Props = {
  onSubmit: (formValues: formValues) => void;
  formValues: formValues;
};

const InventBoard = (props: Props) => {
  const submitAndRedirect = (values) => {
    console.log("submitAndRedirect...");
    props.onSubmit(values);
    window.location.href = `${app_url}/Invent`;
    // return <Redirect to="/Invent" />;
  };

  return (
    <div className="InventBoard" style={{ display: "flex" }}>
      <InventBoardForm
        formValues={props.formValues}
        onSubmit={submitAndRedirect}
      />
    </div>
  );
};

export default InventBoard;
