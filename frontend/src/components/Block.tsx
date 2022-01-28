// example of how component work

import React from "react";

const Block: React.FC = ({ children }) => {
  return (
    <div
      style={{
        width: 300,
        height: 300,
        backgroundColor: "red",
        display: "flex",
        alignItems: "center",
        alignSelf: "center",
        fontSize: "1.5rem",
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
};

export default Block;
