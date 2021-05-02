// import React from "react";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";
import { Dispatch } from "redux";
import InventBoard from "./InventBoard";
import { createNewBoard } from "../../redux/actions/boardActions";

const mapStateToProps = (state: any) => {
  const formValues = getFormValues("invent-board-form")(state);
  return {
    formValues,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSubmit: (formValues) => dispatch(createNewBoard(formValues)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventBoard);
