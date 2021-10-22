import React from "react";
import PieceOption from "./SelectPieceOption";

const SelectPieces = (props: any) => {
  return (
    <div className="SelectPieces">
      <h4>{props.title}</h4>
      {props.pieces ? (
        props.pieces.map((piece) => (
          <PieceOption piece={piece} key={piece.id} />
        ))
      ) : (
        <div>No pieces here. Please invent one!</div>
      )}
    </div>
  );
};

export default SelectPieces;
