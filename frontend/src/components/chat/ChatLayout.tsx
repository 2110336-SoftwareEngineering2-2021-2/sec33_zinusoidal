import React, { useState } from "react";
import styled from "styled-components";
import ChatRoom from "./ChatRoom";
import Chat from "./Chat";
import ChatBlock from "./ChatBlock";
const ChatLayout = ({
  ChatRoomList,
  selectedRoom,
  setSelectedRoom,
  chatMessage,
  message,
  setMessage,
  getChatMessage,
  setFirst,
  loading,
  openChatRoom,
  setOpenChatRoom,
}: any) => {
  return (
    <Layout>
      <ChatRoom
        loading={loading}
        setFirst={setFirst}
        getChatMessag={getChatMessage}
        ChatRoomList={ChatRoomList}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        setMessage={setMessage}
        getChatMessage={getChatMessage}
        setOpenChatRoom={setOpenChatRoom}
      />
      {openChatRoom && (loading || ChatRoomList.length != 0) ? (
        <Chat
          setOpenChatRoom={setOpenChatRoom}
          loading={loading}
          chatMessage={chatMessage}
          selectedRoom={selectedRoom}
          message={message}
          setMessage={setMessage}
        />
      ) : null}
    </Layout>
  );
};
const Layout = styled.div`
  width: 1150px;
  display: flex;
  margin: auto;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    width: 800px;
  }
  @media screen and (max-width: 850px) {
    width: 700px;
  }
  @media screen and (max-width: 720px) {
    justify-content: center;
    align-items: center;
    width: 400px;
  }
  @media screen and (max-width: 450px) {
    width: 300px;
  }
`;
export default ChatLayout;
