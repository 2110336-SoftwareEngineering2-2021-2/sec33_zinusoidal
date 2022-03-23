import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/landing/LandingNav";
import ChatLayout from "../components/chat/ChatLayout";
import db from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();
const searchBg = require("../assets/searchBg.jpeg");

const Chat = () => {
  let { providerID } = useParams();
  const user = cookies.get("user");
  const [ChatRoomList, setChatRoomList] = useState([
    { userID: "", roomID: "" },
  ]);
  const [selectedRoom, setSelectedRoom] = useState({ userID: "", roomID: "" });
  const [chatMessage, setChatMessage] = useState([{ userID: "", message: "" }]);
  const [message, setMessage] = useState("");
  const [first, setFirst] = useState(true);
  const getChatRoomList = () => {
    // create new chatroom if dont have one with the selected provider
    // select first chatroom if come from dropdown select selected provider chatroom if come from search page
    const fetch = async () => {
      let collectionRef = collection(db, "userChat", user.user_id, "room");

      onSnapshot(collectionRef, (querySnapshot) => {
        setChatRoomList(
          querySnapshot.docs
            .map((doc) => {
              return {
                userID: doc.data().otherUserId,
                roomID: doc.id,
                updatedAt: doc.data().updatedAt,
              };
            })
            .sort((a: any, b: any) => {
              return b.updatedAt - a.updatedAt;
            })
        );
      });
    };
    const run = async () => {
      await fetch().then(() => {});
    };

    run();
    if (
      providerID != undefined &&
      !ChatRoomList.some((ele: any) => ele.userID == "providerID")
    ) {
      axios({
        method: "post",
        url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/send_message`,
        data: {
          receiverId: providerID,
          message: "",
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then(function (response) {
          setMessage("");
        })
        .catch(function (error) {});
    } else {
      setSelectedRoom({
        userID: "",
        roomID: "",
      });
    }
  };

  const getChatMessage = () => {
    // myUserID , provideerUserID
    const fetch = async () => {
      let collectionRef = collection(
        db,
        "chatRoom",
        //user.use_id,
        selectedRoom.roomID,
        "message"
      );
      onSnapshot(collectionRef, (querySnapshot) => {
        setChatMessage(
          querySnapshot.docs
            .map((doc) => {
              return {
                userID: doc.data().messageSentBy,
                time: doc.data().messageSentTime,
                message: doc.data().messageText,
              };
            })
            .sort((a: any, b: any) => {
              return a.time - b.time;
            })
        );
      });
    };
    const run = async () => {
      if (
        ChatRoomList.length == 1 &&
        ChatRoomList[0].userID == "" &&
        ChatRoomList[0].roomID == ""
      ) {
        return;
      }
      await fetch();
    };

    run();
  };
  useEffect(() => {
    if (first) {
      console.log(providerID);
      if (providerID == undefined) {
        setSelectedRoom({
          roomID: ChatRoomList[0].roomID,
          userID: ChatRoomList[0].userID,
        });
      } else if (ChatRoomList.length >= 2) {
        let temp = ChatRoomList.filter((e) => e.userID == providerID) as any;
        setSelectedRoom({
          roomID: temp[0].roomID,
          userID: temp[0].userID,
        });
      }
    }
  }, [ChatRoomList]);
  useEffect(() => {
    getChatRoomList();
  }, []);
  useEffect(() => {
    getChatMessage();
  }, [selectedRoom]);
  return (
    <Layout>
      <Navbar />
      <ChatLayout
        setFirst={setFirst}
        getChatMessage={getChatMessage}
        ChatRoomList={ChatRoomList}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        chatMessage={chatMessage}
        message={message}
        setMessage={setMessage}
      />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url(${searchBg});
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Chat;
