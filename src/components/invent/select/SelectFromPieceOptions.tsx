import React from "react";
import PieceOption from "./PieceOption";

const SelectFromPieceOptions = (props: any) => {
  return (
    <div className="SelectFromPieceOptions">
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

export default SelectFromPieceOptions;
