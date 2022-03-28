import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { BiSend } from "react-icons/bi";
import { MdBlock } from "react-icons/md";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

const ChatItem = ({
  item,
  getChatMessage,
  setMessage,
  setSelectedRoom,
  style,
  setFirst,
  selectedRoom,
  setOpenChatRoom,
  searchRoom,
  setSearchRoom,
}: any) => {
  const [info, setInfo] = useState({ name: "", surname: "", profilePic: "" });
  const getInfo = () => {
    if (item.userID.slice(0, 1) == "P") {
      axios({
        method: "get",
        url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/provider/${item.userID}`,
      })
        .then(function (response) {
          setInfo({
            name: response.data.firstName,
            surname: response.data.lastName,
            profilePic: response.data.profilePicUrl,
          });
        })
        .catch(function (error) {});
    }
    if (item.userID.slice(0, 1) == "C") {
      axios({
        method: "get",
        url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/customer/${item.userID}`,
      })
        .then(function (response) {
          setInfo({
            name: response.data.firstName,
            surname: response.data.lastName,
            profilePic: response.data.profilePicUrl,
          });
        })
        .catch(function (error) {});
    }
  };
  useEffect(() => {
    getInfo();
  }, [item]);
  useEffect(() => {
    if (item.roomID == selectedRoom.roomID) {
      scrollToBottom();
    }
  }, [item]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    (messagesEndRef as any).current?.scrollIntoView({ behavior: "instant" });
  };
  return (
    <div>
      {(info.name + info.surname)
        .toLowerCase()
        .includes(searchRoom.toLowerCase()) && (
        <Item
          ref={messagesEndRef}
          style={style}
          onClick={() => {
            setFirst(false);
            getChatMessage();
            setMessage("");
            setSelectedRoom({
              roomID: item.roomID,
              userID: item.userID,
              isBlocked: item.isBlocked,
              blockedBy: item.blockedBy,
            });
            setSearchRoom("");
            setOpenChatRoom(true);
          }}
        >
          <ProfileImg src={info.profilePic}></ProfileImg>
          <p>
            {info.name} {info.surname}
          </p>
          {item.isBlocked ? (
            <MdBlock style={{ marginLeft: 4, color: "#f44336" }} />
          ) : null}
        </Item>
      )}
    </div>
  );
};
const ProfileImg = styled.img`
  height: 64px;
  width: 64px;
  border-radius: 100%;
  margin-right: 16px;
  object-fit: cover;
`;
const Item = styled.div`
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  font-weight: bold;
  border-radius: 8px;
  height: 96px;
  :hover {
    background-color: ${COLOR["violet/100"]};
  }
  padding: 16px;
`;
export default ChatItem;
