import { connect } from "react-redux";
import { Dispatch } from "redux";
import Game from "./Game";
import { loadGameType } from "../redux/actions/gameTypeActions";

const mapStateToProps = (state: any) => ({
  state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLoadGameType: (id: number) => dispatch(loadGameType(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
