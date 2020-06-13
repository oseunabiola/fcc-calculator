import React from "react";

const Key = ({ id, text, bgColor, className, handleClick }) => {
  return (
    <button
      id={id}
      onClick={handleClick}
      className={className}
      style={{ backgroundColor: bgColor }}
      value={text}
    >
      {text}
    </button>
  );
};

export default Key;
