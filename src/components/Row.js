import React from "react";
import { connect } from "react-redux";
import Space from "./Space";
import "./Row.scss";

const Row = ({
  colorIndent,
  numSpaces,
  rowNum,
  gameBoardAndPiecesSequence,
  currentBoardAndPiecesSeqNum,
}) => {
  return (
    <div className="row">
      {[..."abcdefghijklmnopqrstuvwxyz"]
        .slice(0, numSpaces)
        .map((letter, ind) => {
          const spaceCode = `${letter}${rowNum}`;
          const currentSetup =
            gameBoardAndPiecesSequence[currentBoardAndPiecesSeqNum];

          const piece = currentSetup
            .map((teamPieceSpace) => {
              if (spaceCode === teamPieceSpace.split("-")[1]) {
                return teamPieceSpace.split("-")[0];
              }
              return "";
            })
            .filter((item) => item !== "")[0];

          return (
            <Space
              color={(ind + colorIndent) % 2 === 0 ? "light" : "dark"}
              key={ind}
              code={spaceCode}
              piece={piece}
            />
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    gameBoardAndPiecesSequence: state.gameBoardAndPiecesSequence,
    currentBoardAndPiecesSeqNum: state.currentBoardAndPiecesSeqNum,
  };
};

export default connect(mapStateToProps, null)(Row);
