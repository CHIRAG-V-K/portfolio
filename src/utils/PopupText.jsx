import React from "react";

const PopupText = ({ children, myKey }) => {
  return (
    <span
      key={myKey}
      className="inline-block cursor-zoom-in hover:scale-y-150 hover:text-primary"
    >
      {children === " " ? <span>&nbsp;</span> : children}
    </span>
  );
};

export default PopupText;
