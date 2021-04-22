// import React from "react";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";
import { Dispatch } from "redux";
import Board from "./Board";
import { SUBMIT_NEW_BOARD } from "../../redux/actions/actionTypes";

const mapStateToProps = (state: any) => {
  const formValues = getFormValues("invent-board-form")(state);
  window.console.log("state from invent board container:", state);
  window.console.log("formValues:", formValues);
  return {
    state,
    formValues,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSubmit: () => dispatch({ type: SUBMIT_NEW_BOARD }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
