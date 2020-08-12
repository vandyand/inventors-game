import { connect } from "react-redux";
import Space from "./Space";

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  selectPieceReducer: (code, piece) =>
    dispatch({
      type: "SELECT_PIECE",
      payload: { code, piece },
    }),
  pieceMoveReducer: (code, piece) =>
    dispatch({
      type: "PIECE_MOVE",
      payload: { code, piece },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Space);
