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
  let navigate = useNavigate();

  useEffect(() => {
    if (typeof user == "undefined") {
      alert("You must be logged in");
      navigate(`/`);
    }
  }, []);
  const [ChatRoomList, setChatRoomList] = useState([
    { userID: "", roomID: "", blockedBy: "", isBlocked: false },
  ]);
  const [selectedRoom, setSelectedRoom] = useState({
    userID: "",
    roomID: "",
    blockedBy: "",
    isBlocked: false,
  });
  console.log(selectedRoom);
  const [chatMessage, setChatMessage] = useState([{ userID: "", message: "" }]);
  const [message, setMessage] = useState("");
  const [first, setFirst] = useState(true);
  const [loading, setLoading] = useState(true);
  const [openChatRoom, setOpenChatRoom] = useState(true);

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
                blockedBy: doc.data().blockedBy,
                isBlocked: doc.data().isBlocked,
              };
            })
            .sort((a: any, b: any) => {
              return b.updatedAt - a.updatedAt;
            })
        );
        setLoading(false);
      });
    };
    const run = async () => {
      await fetch();
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
        isBlocked: false,
        blockedBy: "",
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
        setLoading(false);
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
      if (providerID == undefined && ChatRoomList.length > 0) {
        setSelectedRoom({
          roomID: ChatRoomList[0].roomID,
          userID: ChatRoomList[0].userID,
          isBlocked: ChatRoomList[0].isBlocked,
          blockedBy: ChatRoomList[0].blockedBy,
        });
      } else if (ChatRoomList.length < 2 && ChatRoomList.length > 0) {
        setSelectedRoom({
          roomID: ChatRoomList[0].roomID,
          userID: ChatRoomList[0].userID,
          isBlocked: ChatRoomList[0].isBlocked,
          blockedBy: ChatRoomList[0].blockedBy,
        });
      } else if (ChatRoomList.length >= 2 && ChatRoomList.length > 0) {
        let temp = ChatRoomList.filter((e) => e.userID == providerID) as any;
        if (temp.length != 0) {
          setSelectedRoom({
            roomID: temp[0].roomID,
            userID: temp[0].userID,
            isBlocked: temp[0].isBlocked,
            blockedBy: temp[0].blockedBy,
          });
        }
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
        loading={loading}
        setFirst={setFirst}
        getChatMessage={getChatMessage}
        ChatRoomList={ChatRoomList}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        chatMessage={chatMessage}
        message={message}
        setMessage={setMessage}
        openChatRoom={openChatRoom}
        setOpenChatRoom={setOpenChatRoom}
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
