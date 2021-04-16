import { connect } from "react-redux";
import { Dispatch } from "redux";
import Board from "./Board";
import { loadBoard } from "../../redux/actions/boardActions";
import { loadPiecesByCodes } from "../../redux/actions/piecesActions";

const mapStateToProps = (state: any) => ({
  board: state.board,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLoadBoard: (id: number) => dispatch(loadBoard(id)),
  onLoadPieces: (codes: Array<string>) => dispatch(loadPiecesByCodes(codes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
