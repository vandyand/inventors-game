// import React from "react";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";
import { Dispatch } from "redux";
import PlayForm from "./PlayForm";
// import { createNewBoard } from "../../redux/actions/boardActions";
import { startNewGame } from "../../redux/actions/playGameActions";

const mapStateToProps = (state: any) => {
  const formValues = getFormValues("play_game")(state);
  return {
    formValues,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSubmit: (formValues) => dispatch(startNewGame(formValues)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayForm);
