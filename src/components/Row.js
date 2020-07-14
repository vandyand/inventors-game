import React from "react";
import Space from "./Space";
import "./Row.scss";

const Row = ({ numSpaces, colorIndent }) => {
  return (
    <div className="row">
      {[...Array(numSpaces).keys()].map((num) => {
        return (
          <Space
            color={(num + colorIndent) % 2 === 0 ? "light" : "dark"}
            key={num}
          />
        );
      })}
    </div>
  );
};

export default Row;
