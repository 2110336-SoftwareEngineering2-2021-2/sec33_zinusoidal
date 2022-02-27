import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
const Backdrop = ({ children, onClick }: any) => {
  return (
    <BackDrop
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </BackDrop>
  );
};

const BackDrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;
export default Backdrop;
