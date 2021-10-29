import React from "react";
import { APP_URL } from "../../config";
import InventBoardForm from "./InventBoardForm";
import { getFormValues } from "redux-form";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { createNewBoard } from "../../redux/actions/boardActions";


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
    props.onSubmit(values);
    window.location.href = `${APP_URL}/Invent`;
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


const mapStateToProps = (state: any) => {
  const formValues = getFormValues("invent-board-form")(state);
  return {
    formValues,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => {
  return {
    onSubmit: (formValues) => dispatch(createNewBoard(formValues)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventBoard);
