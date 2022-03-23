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
}: any) => {
  return (
    <Layout>
      <ChatRoom
        setFirst={setFirst}
        getChatMessag={getChatMessage}
        ChatRoomList={ChatRoomList}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        setMessage={setMessage}
        getChatMessage={getChatMessage}
      />
      <Chat
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
