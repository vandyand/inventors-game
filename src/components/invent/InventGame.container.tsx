// import React from "react";
import { connect } from "react-redux";
// import { getFormValues } from "redux-form";
// import { Dispatch } from "redux";
import InventGame from "./InventGame";
import { loadBoards } from "../../redux/actions/boardActions";

const mapStateToProps = (state: any) => {
  loadBoards();
  return {
    boards: state.board,
  };
};

// const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => {
//   return {
//     onSubmit: (formValues) => dispatch(createNewBoard(formValues)),
//   };
// };

export default connect(mapStateToProps, null)(InventGame);
