import React, { useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { FiSearch } from "react-icons/fi";

const ChatRoom = ({
  ChatRoomList,
  setSelectedUser,
  selectedUser,
  setMessage,
  getChatMessage,
}: any) => {
  console.log(selectedUser);
  return (
    <Layout>
      <SearchChatRoom>
        <SearchDiv>
          <FiSearch />
          <SearchChatInput
            type={"text"}
            placeholder={"Search Chat"}
          ></SearchChatInput>
        </SearchDiv>
      </SearchChatRoom>
      <MyChatRoom>
        {ChatRoomList.map((item: any, index: any) => (
          <Item
            style={{
              backgroundColor:
                selectedUser == item.userID
                  ? COLOR["violet/200"]
                  : COLOR["violet/50"],
            }}
            onClick={() => {
              getChatMessage();
              setMessage("");
              setSelectedUser(item.userID);
            }}
          >
            {item.userID}
          </Item>
        ))}
      </MyChatRoom>
    </Layout>
  );
};
const Layout = styled.div`
  height: fit-content;
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
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
  font-size: 20px;
  display: flex;
  align-items: center;
  font-weight: bold;
  border-radius: 8px;
  height: 96px;
  :hover {
    background-color: ${COLOR["violet/200"]};
  }
  padding: 16px;
`;
export default ChatRoom;
