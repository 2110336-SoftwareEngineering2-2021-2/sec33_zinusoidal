import React, { useState } from "react";

const Teach = () => {
  const [show, setShow] = useState(false);
  return (
    <div style={{ marginTop: 300, marginLeft: 500 }}>
      <div>
        <div
          style={{ width: 300, height: 50, backgroundColor: "green" }}
          onClick={() => setShow(!show)}
        >
          hh
        </div>
        {show ? (
          <div
            style={{
              width: 300,
              height: 60,
              backgroundColor: "pink",
              position: "absolute",
            }}
          ></div>
        ) : null}
      </div>
      <div style={{ width: 300, height: 50, backgroundColor: "orange" }}></div>
    </div>
  );
};

export default Teach;
