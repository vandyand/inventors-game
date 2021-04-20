// import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import BoardOptionsSidebar from "./BoardOptionsSidebar";
import { SUBMIT_NEW_BOARD } from "../../redux/actions/actionTypes";

const mapStateToProps = (state: any) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSubmit: () => dispatch({ type: SUBMIT_NEW_BOARD }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardOptionsSidebar);
