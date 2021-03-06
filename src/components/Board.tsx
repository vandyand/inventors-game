import React from "react";
import { connect } from "react-redux";
import { getBoardSizeByGameType } from "../redux/selectors/boardSelectors";
import Row from "./Row";
import "./Board.scss";

type OwnProps = any;

type StateProps = {
  boardSize: Array<number>;
};

export type BoardProps = StateProps & OwnProps;

// export type Board = any;

const Board: React.FC<BoardProps> = ({ boardSize }) => {
  console.log(boardSize);
  return (
    <div className="board">
      {[...Array(boardSize[0]).keys()].reverse().map((num) => (
        <Row
          key={num}
          numSpaces={boardSize[1]}
          colorIndent={(num + 1) % 2}
          rowNum={num + 1}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  boardSize: getBoardSizeByGameType(state),
});

export default connect(mapStateToProps, null)(Board);
