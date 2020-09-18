import React, { useState, useEffect } from "react";

const Cursor = (props) => {
  const [cssText, setCssText] = useState("left:0;top:0;");
  const mouseAnimation = (e) => {
    setCssText("left: " + e.clientX + "px; top: " + e.clientY + "px;");
  };
  useEffect(() => {
    document.addEventListener("mousemove", mouseAnimation);
    return () => document.removeEventListener("mousemove", mouseAnimation);
  }, []);
  return (
    <>
      <div class="cursor" style={{ cssText }}></div>
      <div class="cursor2" style={{ cssText }}></div>
    </>
  );
};

export default Cursor;
