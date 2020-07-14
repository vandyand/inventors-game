import React from "react";
import "./Space.scss";

const Space = ({ color, num }) => {
  return <div className={`space ${color}-space`}></div>;
};

export default Space;
