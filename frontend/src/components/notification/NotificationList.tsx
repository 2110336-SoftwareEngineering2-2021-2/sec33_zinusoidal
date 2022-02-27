import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Notification from "./Notification";
import { motion } from "framer-motion";
const li = [1, 2, 3, 4, 5];

const NotificationList = ({ setDropDown }: any) => {
  const wrapperRef = useRef(null);
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropDown(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);
  return (
    <Layout
      ref={wrapperRef}
      initial={{ opacity: 0, scale: 1, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
    >
      {li.map((item, index) => (
        <Notification
          key={index}
          content="KirkPig has request you an fortune telling 's appointmentscssdsdsdds"
        />
      ))}
    </Layout>
  );
};

const Layout = styled(motion.div)`
  position: absolute;
  width: 276px;
  background-color: white;
  top: 40px;
  right: 0;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;
export default NotificationList;
