import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Notification from "./Notification";
import { motion } from "framer-motion";
import db from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const NotificationList = ({ setDropDown }: any) => {
  const user = cookies.get("user");
  const [loading, setLoading] = useState(true);
  const [li, setLi] = useState([]);
  console.log(loading);
  useEffect(() => {
    const fetch = async () => {
      let q;
      //provider
      // if (typeof user == "undefined") return;
      if (typeof user != "undefined" && user.user_id.slice(0, 1) == "P") {
        q = query(
          collection(db, "appointments"),
          where("providerID", "==", user.user_id)
        );
      } else {
        //user.user_id
        console.log("cone here");
        q = query(
          collection(db, "appointments"),
          where("customerID", "==", "ddd")
        );
      }

      onSnapshot(q, (snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
        setLi(snapshot.docs.map((doc) => doc.data()) as never);
        setLoading(false);
      });
    };
    const run = async () => {
      await fetch();
    };

    run();
  }, []);
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
          data={item}
        />
      ))}
      {li.length == 0 && (
        <p>{loading ? "Loading" : "There is no notification"}</p>
      )}
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
