import React, { useState } from "react";
import styled from "styled-components";
import ChatRoom from "./ChatRoom";
import Chat from "./Chat";
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
      />
      <Chat
        loading={loading}
        chatMessage={chatMessage}
        selectedRoom={selectedRoom}
        message={message}
        setMessage={setMessage}
      />
    </Layout>
  );
};
const Layout = styled.div`
  width: 1150px;
  display: flex;
  margin: auto;
  justify-content: space-between;
`;
export default ChatLayout;
