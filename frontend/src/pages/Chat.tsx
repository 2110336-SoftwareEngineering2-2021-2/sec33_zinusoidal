import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/landing/LandingNav";
import ChatLayout from "../components/chat/ChatLayout";
const searchBg = require("../assets/searchBg.jpeg");

const Chat = () => {
  const [ChatRoomList, setChatRoomList] = useState([{ userID: "" }]);
  const [selectedUser, setSelectedUser] = useState("");
  const [chatMessage, setChatMessage] = useState([{ userID: "", message: "" }]);
  const [message, setMessage] = useState("");

  const getChatRoomList = () => {
    // create new chatroom if dont have one with the selected provider
    // select first chatroom if come from dropdown select selected provider chatroom if come from search page
    setChatRoomList([
      {
        userID: "123456",
      },
      {
        userID: "789101",
      },
      {
        userID: "111213",
      },
    ]);
  };
  const getChatMessage = () => {
    // myUserID , provideerUserID
    setChatMessage([
      { userID: "123456", message: "hello, my name is Chawin" },
      {
        userID: "123456",
        message:
          "hello my name is Chawin asdasdasdasdsdasdasdagggf dajsdhagjdgahhjdagdkjhagdhagsdsjahdgaksjhdgajskhdgasjdhgakshjdgasjhdgahsdgakjshdgaskhjdgakhsjdgakshdgaskhjdgkasjhdgakhjsgdashjdgkashjdgaskjhgdhsbcxcbcn,mzcnaidhjqdhusdfdbakjhdalkjhbdkjabcjkabfcludhfkduhkajhdlajkshdalkjshdkjacbnkjasbdjkashdjksahdakljhda",
      },
      {
        userID: "789101",
        message: "hello my name is Yongmoi ",
      },
      { userID: "123456", message: "hello, my name is Chawin" },
      { userID: "123456", message: "hello, my name is Chawin" },
      { userID: "789101", message: "hello, my name is Chawin" },
      { userID: "789101", message: "hello, my name is Chawin" },
      { userID: "789101", message: "hello, my name is Chawin" },
      { userID: "789101", message: "hello, my name is Chawin" },
      { userID: "789101", message: "hello, my name is Chawin" },
      { userID: "789101", message: "hello, my name is Chawin" },
      { userID: "789101", message: "hello, my name is Chawin" },
      { userID: "789101", message: "hello, my name is Chawin" },
      { userID: "789101", message: "hello, my name is Chawin" },
      { userID: "789101", message: "hello, my name is Chawin" },
      { userID: "789101", message: "hello, my name is Chawin" },
      {
        userID: "789101",
        message:
          "hello my name is Chawin asdasdasdasdsdasdasdagggf dajsdhagjdgahhjdagdkjhagdhagsdsjahdgaksjhdgajskhdgasjdhgakshjdgasjhdgahsdgakjshdgaskhjdgakhsjdgakshdgaskhjdgkasjhdgakhjsgdashjdgkashjdgaskjhgdhsbcxcbcn,mzcnaidhjqdhusdfdbakjhdalkjhbdkjabcjkabfcludhfkduhkajhdlajkshdalkjshdkjacbnkjasbdjkashdjksahdakljhda",
      },
      { userID: "789101", message: "hello, my name is Chawin" },
    ]);
  };
  useEffect(() => {
    getChatRoomList();
    getChatMessage();
    setSelectedUser("123456");
  }, []);
  return (
    <Layout>
      <Navbar />
      <ChatLayout
        getChatMessage={getChatMessage}
        ChatRoomList={ChatRoomList}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
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
