import { connect } from "react-redux";
// import { Dispatch } from "redux";
import InventGame from "./InventGame";
// import { loadBoardsAndPieces } from "../../redux/actions/boardActions";  

const mapStateToProps = (state: any) => {
  return {
    boards: state.board,
  };
};

// const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => ({
//   loadBoardsAndPieces,
//   // onLoad: () => dispatch({ type: "TEST", payload: "test" }),
//   // onLoad: (b: any) => console.log("test: ", b)
// });

export default connect(mapStateToProps, null)(InventGame);
