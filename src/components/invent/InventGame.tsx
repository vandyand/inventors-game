

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { board, piece } from "../../types/GameComponents";
import SelectFromBoardOptions from "./select/SelectFromBoardOptions";
import SelectFromPieceOptions from "./select/SelectFromPieceOptions";
import InventGameWindow from "./InventGameWindow";
import { useDispatch, connect } from "react-redux";
import { loadBoards } from "../../redux/actions/boardsActions";

import "./InventGameStyles.scss";

type Props = {
  boards: Array<board>;
  pieces: Array<piece>;
};

const InventGame = (props: Props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBoards());
  }, [dispatch]);

  return (
    <>
      <Link to="/">Main Menu</Link>
      <h1>Invent a game here </h1>
      <div className="InventGame">
        <InventGameWindow />
        <div className="InventGame__Form">
          <div className="InventGame__Form__Board">
            <SelectFromBoardOptions
              title="Select a board"
              boards={props.boards}
            />
            <div className="InventGame__Form__Board__Link">
              <Link to="/Invent/Board">Invent a new board</Link>
            </div>
          </div>
          <div className="InventGame__Form__Piece">
            <SelectFromPieceOptions
              title="Select your pieces"
              pieces={props.pieces}
            />
            <div className="InventGame__Form__Piece__Link">
              <Link to="/Invent/Pieces">Invent new pieces</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


const mapStateToProps = (state: any) => {
  return {
    boards: state.boards,
    pieces: state.pieces,
  };
};

export default connect(mapStateToProps, null)(InventGame);
