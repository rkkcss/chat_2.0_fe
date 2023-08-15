import React from "react";

export const Tooltip = ({ tooltipMessage }) => {
  return (
    <>
      <span className="absolute opacity-0 hover:opacity-100">
        {tooltipMessage}
      </span>
    </>
  );
};
