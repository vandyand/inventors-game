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

          // {
          //   teamA: ["d2-sp", "e1-sp"],
          //   teamB: ["d7-sp", "e7-sp"],
          // },

          let piece = "";
          const teamA = currentSetup.teamA.filter((piecePos) =>
            piecePos.includes(spaceCode)
          );
          const teamB = currentSetup.teamB.filter((piecePos) =>
            piecePos.includes(spaceCode)
          );

          if (teamA.length !== 0) {
            piece = `A${teamA[0].split("-")[1]}`;
          } else if (teamB.length !== 0) {
            piece = `B${teamB[0].split("-")[1]}`;
          }

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
