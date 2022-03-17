import React, { useState } from "react";
import styled from "styled-components";
import ChatRoom from "./ChatRoom";
import Chat from "./Chat";
const ChatLayout = ({
  ChatRoomList,
  selectedUser,
  setSelectedUser,
  chatMessage,
  message,
  setMessage,
  getChatMessage,
}: any) => {
  return (
    <Layout>
      <ChatRoom
        getChatMessag={getChatMessage}
        ChatRoomList={ChatRoomList}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setMessage={setMessage}
        getChatMessage={getChatMessage}
      />
      <Chat
        chatMessage={chatMessage}
        selectedUser={selectedUser}
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
