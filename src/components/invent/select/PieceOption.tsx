import React from "react";
import { piece } from "../../../types/GameComponents";

type Props = {
  piece: piece;
}

const PieceOption = ({ piece }: Props) => {
  return (
    <div className="PieceOption">
      <img alt={`${piece.name}`} src={piece.pic} />
    </div>
  );
};

export default PieceOption;
