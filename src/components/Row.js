import React from "react";
import { connect } from "react-redux";
import Space from "./Space";
import "./Row.scss";

const Row = ({
  colorIndent,
  numSpaces,
  rowNum,
  arrangementSequence,
  currentArrangementSeqNum,
}) => {
  return (
    <div className="row">
      {[..."abcdefghijklmnopqrstuvwxyz"]
        .slice(0, numSpaces)
        .map((letter, ind) => {
          const spaceCode = `${letter}${rowNum}`;
          const currentSetup = arrangementSequence[currentArrangementSeqNum];

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
    arrangementSequence: state.currentGame.arrangementSequence,
    currentArrangementSeqNum: state.currentGame.currentArrangementSeqNum,
  };
};

export default connect(mapStateToProps, null)(Row);
