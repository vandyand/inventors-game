// import React from "react";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";
import { Dispatch } from "redux";
import InventBoard from "./InventBoard";
import { SUBMIT_NEW_BOARD } from "../../redux/actions/actionTypes";

const mapStateToProps = (state: any) => {
  const formValues = getFormValues("invent-board-form")(state);
  return {
    cellIds: state.cellIds,
    formValues,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSubmit: () => dispatch({ type: SUBMIT_NEW_BOARD }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventBoard);
