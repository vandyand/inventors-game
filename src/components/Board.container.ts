import { connect } from "react-redux";
import { Dispatch } from "redux";
import Board from "./Board";
import { loadBoard } from "../redux/actions/boardActions";

const mapStateToProps = (state: any) => ({
  boardSize: state.board && state.board.size,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLoadBoard: (id: number) => dispatch(loadBoard(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
