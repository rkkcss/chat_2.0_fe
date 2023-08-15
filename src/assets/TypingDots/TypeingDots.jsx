import React from "react";
import "./TypeingDots.css";

export const TypeingDots = () => {
  return (
    <span>
      <svg className="loader h-10 w-10">
        <circle
          className="dot"
          cx="10"
          cy="20"
          r="3"
          style={{ fill: "gray" }}
        />
        <circle
          className="dot"
          cx="20"
          cy="20"
          r="3"
          style={{ fill: "gray" }}
        />
        <circle
          className="dot"
          cx="30"
          cy="20"
          r="3"
          style={{ fill: "gray" }}
        />
      </svg>
    </span>
  );
};
