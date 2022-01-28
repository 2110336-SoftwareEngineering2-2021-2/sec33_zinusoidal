import React, { useState } from "react";
import Block from "../components/Block";
import { COLOR } from "../CONSTANT";
const LandingPage = () => {
  const [number, setNumber] = useState(0);

  const increment = () => {
    setNumber((prevNumber: number): number => prevNumber + 1);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR["mint/300"],
        height: "100vh",
        flexDirection: "column",
      }}
    >
      This page is rendered {number} times
      <Block>
        This is Landing Page of fortune168
        <></>
      </Block>
      <button
        style={{ width: 120, height: 20, marginTop: 20 }}
        type="button"
        onClick={increment}
      >
        Click to rerender
      </button>
    </div>
  );
};

export default LandingPage;
