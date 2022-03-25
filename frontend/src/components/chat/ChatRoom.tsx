import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { FiSearch } from "react-icons/fi";

import ChatItem from "./ChatItem";

const ChatRoom = ({
  ChatRoomList,
  setSelectedRoom,
  selectedRoom,
  setMessage,
  getChatMessage,
  setFirst,
  loading,
  setOpenChatRoom,
}: any) => {
  const [searchRoom, setSearchRoom] = useState("");
  return (
    <Layout>
      <SearchChatRoom>
        <SearchDiv>
          <FiSearch />
          <SearchChatInput
            type={"text"}
            placeholder={"Search Chat"}
            value={searchRoom}
            onChange={(e) => {
              setSearchRoom(e.target.value);
            }}
          ></SearchChatInput>
        </SearchDiv>
      </SearchChatRoom>
      <MyChatRoom>
        {loading ? (
          <Item>Loading . . .</Item>
        ) : (
          ChatRoomList.map((item: any, index: number) => (
            <ChatItem
              style={{
                backgroundColor:
                  selectedRoom.roomID == item.roomID
                    ? COLOR["violet/200"]
                    : COLOR["violet/50"],
              }}
              searchRoom={searchRoom}
              setSearchRoom={setSearchRoom}
              setOpenChatRoom={setOpenChatRoom}
              selectedRoom={selectedRoom}
              setFirst={setFirst}
              getChatMessage={getChatMessage}
              setMessage={setMessage}
              setSelectedRoom={setSelectedRoom}
              item={item}
            ></ChatItem>
          ))
        )}
      </MyChatRoom>
    </Layout>
  );
};
const Layout = styled.div`
  margin-right: 8px;
  height: fit-content;
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
  @media screen and (max-width: 850px) {
    width: 300px;
  }
  @media screen and (max-width: 720px) {
    margin-right: 0px;
    width: 400px;
  }
  @media screen and (max-width: 450px) {
    width: 300px;
  }
`;
const SearchChatRoom = styled.div`
  z-index: 1;
  width: 100%;
  height: 80px;
  border-radius: 8px 8px 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.3);
`;
const SearchDiv = styled.div`
  font-size: 14px;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 32px;
  border-radius: 8px;
  border: 1px solid ${COLOR["gray/600"]};
  padding-left: 15px;
  :focus-within {
    border: 1px solid ${COLOR["violet/400"]};
  }
`;
const SearchChatInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding-left: 5px;
`;
const MyChatRoom = styled.div`
  max-height: 610px;
  overflow-y: auto;
  border-radius: 0px 0px 8px 8px;
  background-color: ${COLOR["violet/50"]};
`;

const Item = styled.div`
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  font-weight: bold;
  border-radius: 8px;
  height: 96px;
  padding: 16px;
`;
export default ChatRoom;
