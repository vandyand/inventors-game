

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { board, piece } from "../../types/GameComponents";
import SelectBoard from "./select/SelectBoard";
import SelectPieces from "./select/SelectPieces";
import InventGameWindow from "./InventGameWindow";


import "./InventGameStyles.scss";
import { useDispatch, connect } from "react-redux";
import { loadBoardsAndPieces } from "../../redux/actions/boardActions";

import "./InventGameStyles.scss";

type Props = {
  boards: Array<board>;
  pieces: Array<piece>;
};

const InventGame = (props: Props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBoardsAndPieces());
  }, [dispatch]);

  return (
    <>
      <Link to="/">Main Menu</Link>
      <h1>Invent a game here </h1>
      <div className="InventGame">
        <InventGameWindow />
        <div className="InventGame__Form">
          <div className="InventGame__Form__Board">
            <SelectBoard
              title="Select a board"
              boards={props.boards}
            />
            <div className="InventGame__Form__Board__Link">
              <Link to="/Invent/Board">Invent a new board</Link>
            </div>
          </div>
          <div className="InventGame__Form__Piece">
            <SelectPieces
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
    boards: state.board,
    pieces: state.pieces,
  };
};

export default connect(mapStateToProps, null)(InventGame);
