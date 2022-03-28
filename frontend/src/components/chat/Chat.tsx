import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { BiSend } from "react-icons/bi";
import { MdBlock } from "react-icons/md";
import Cookies from "universal-cookie";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import ChatBlock from "./ChatBlock";

const cookies = new Cookies();

const Chat = ({
  chatMessage,
  selectedRoom,
  setMessage,
  message,
  loading,
  setOpenChatRoom,
  openBlock,
  setopenBlock,
}: any) => {
  const [loadingblock, setLoadingblock] = useState(false);
  const [loadingUnblock, setLoadingUnblock] = useState(false);

  const [info, setInfo] = useState({ name: "", surname: "", profilePic: "" });
  const unblock = () => {
    const user = cookies.get("user");
    axios({
      method: "post",
      url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/unblock`,
      data: { blockedUserId: selectedRoom.userID },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(function (response) {
        setLoadingUnblock(false);
      })
      .catch(function (error) {});
  };
  const getInfo = () => {
    if (selectedRoom.userID.slice(0, 1) == "P") {
      axios({
        method: "get",
        url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/provider/${selectedRoom.userID}`,
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
    if (selectedRoom.userID.slice(0, 1) == "C") {
      axios({
        method: "get",
        url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/customer/${selectedRoom.userID}`,
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
  const user = cookies.get("user");
  const sendMessage = () => {
    if (message == "") return;
    let data = message;
    setMessage("");
    axios({
      method: "post",
      url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/send_message`,
      data: {
        receiverId: selectedRoom.userID,
        message: data,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(function (response) {})
      .catch(function (error) {});
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    (messagesEndRef as any).current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [loadingblock, loadingUnblock]);
  useEffect(() => {
    getInfo();
    scrollToBottom();
  }, [chatMessage]);
  return (
    <Layout>
      <ChatHeader>
        {loading ? (
          <p>Loading . . . </p>
        ) : (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <ReturnBackButton
                style={{ marginRight: 8 }}
                onClick={() => setOpenChatRoom(false)}
              >
                <FiArrowLeft size={25} />
                <p>back</p>
              </ReturnBackButton>
              <Name>
                {info.name} {info.surname}
              </Name>
            </div>
            {selectedRoom.isBlocked ? (
              selectedRoom.blockedBy == user.user_id ? (
                <UnblockButton
                  onClick={() => {
                    setLoadingUnblock(true);
                    unblock();
                  }}
                >
                  <MdBlock style={{ marginRight: 4 }} />
                  Unblock
                </UnblockButton>
              ) : null
            ) : (
              <BlockButton
                onClick={() => {
                  setopenBlock(true);
                }}
              >
                <MdBlock style={{ marginRight: 4 }} />
                Block
              </BlockButton>
            )}
          </div>
        )}
      </ChatHeader>
      {openBlock ? (
        <ChatBlock
          info={info}
          setopenBlock={setopenBlock}
          selectedRoom={selectedRoom}
          setLoadingblock={setLoadingblock}
        />
      ) : null}

      <ChatField>
        {loading || loadingblock || loadingUnblock ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loadingblock ? (
              <p
                style={{
                  fontSize: 40,
                  color: COLOR["gray/700"],
                }}
              >
                Blocking . . .
              </p>
            ) : loadingUnblock ? (
              <p
                style={{
                  fontSize: 40,
                  color: COLOR["gray/700"],
                }}
              >
                Unblocking . . .
              </p>
            ) : (
              <p
                style={{
                  fontSize: 40,
                  color: COLOR["gray/700"],
                }}
              >
                Loading . . .
              </p>
            )}
          </div>
        ) : (
          chatMessage.map((item: any, index: any) => (
            <MessageDiv
              key={index}
              ref={messagesEndRef}
              style={{
                justifyContent:
                  item.userID == user.user_id ? "flex-end" : "flex-start",
              }}
            >
              {item.userID == user.user_id ? null : index == 0 ||
                chatMessage[index - 1].userID != item.userID ? (
                <Image>
                  <img src={info.profilePic} alt="profle" />
                </Image>
              ) : (
                <Image />
              )}
              <ChatMessage
                style={{
                  backgroundColor:
                    item.userID == user.user_id
                      ? COLOR["violet/200"]
                      : COLOR["blue/100"],
                  borderRadius:
                    item.userID == user.user_id
                      ? "20px 25px 0px 20px"
                      : "25px 20px 20px 0px",
                }}
              >
                {item.message}
              </ChatMessage>
            </MessageDiv>
          ))
        )}
        <div ref={messagesEndRef}> </div>
        {selectedRoom.isBlocked && !loadingblock && !loadingUnblock ? (
          <Error ref={messagesEndRef}>
            ! You can no longer chat with {info.name} {info.surname} !
          </Error>
        ) : null}
      </ChatField>
      <ChatInput>
        <Chatbox
          onKeyPress={(e) => {
            if (e.key == "Enter") {
              sendMessage();
            }
          }}
          type={"text"}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
        ></Chatbox>
        <Button
          onClick={() => {
            sendMessage();
          }}
          style={{
            backgroundColor:
              loading || selectedRoom.isBlocked
                ? COLOR["gray/400"]
                : COLOR["violet/400"],
            pointerEvents: loading || selectedRoom.isBlocked ? "none" : "unset",
          }}
        >
          Send <BiSend style={{ marginLeft: 8 }} />
        </Button>
      </ChatInput>
    </Layout>
  );
};
const Layout = styled.div`
  flex: 1;
  height: 690px;
  width: 690px;
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
  flex-direction: column;
  @media screen and (max-width: 1200px) {
    width: 500px;
  }
  @media screen and (max-width: 850px) {
    width: 400px;
  }
  @media screen and (max-width: 720px) {
    z-index: 1;
    position: absolute;
    margin-left: 0px;
  }
  @media screen and (max-width: 450px) {
    width: 300px;
  }
`;
const ChatHeader = styled.div`
  width: 100%;
  height: 80px;
  border-radius: 8px 8px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.3);
`;

const ChatField = styled.div`
  width: 690px;
  flex: 1;
  background-color: ${COLOR["violet/50"]};
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  @media screen and (max-width: 1200px) {
    width: 500px;
  }
  @media screen and (max-width: 850px) {
    width: 400px;
  }
  @media screen and (max-width: 720px) {
    width: 400px;
  }
  @media screen and (max-width: 450px) {
    width: 300px;
  }
`;
const ChatInput = styled.div`
  height: 88px;
  padding: 20px;
  display: flex;
  align-items: center;
`;
const Chatbox = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  outline: none;
  border: 1px solid ${COLOR["gray/600"]};
  padding: 8px;
  :focus {
    outline: none;
    border: 1px solid ${COLOR["violet/400"]};
  }
`;
const Button = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  padding: 0px 40px;
  cursor: pointer;
  border: none;
  width: fit-content;
  height: 48px;
  background-color: ${COLOR["violet/400"]};
  text-decoration: none;
  color: #ffffff;
  border-radius: 10000px;
  font-weight: bold;
  font-size: 20px;
  &:hover {
    background-color: ${COLOR["violet/500"]} !important;
  }
  @media screen and (max-width: 850px) {
    margin-left: 10px;
    font-size: 16px;
    padding: 0px 20px;
  }
`;
const ChatMessage = styled.div`
  height: fit-content;
  overflow-wrap: break-word;
  width: fit-content;
  max-width: 70%;
  background-color: red;
  padding: 15px;
  @media screen and (max-width: 720px) {
    max-width: 90%;
  }
`;
const MessageDiv = styled.div`
  width: 100%;
  display: flex;
  margin-top: 8px;
`;
const Image = styled.div`
  align-self: flex-start;
  width: 64px;
  height: 64px;
  border-radius: 100%;
  margin-right: 20px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
  }
`;
const BlockButton = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  height: 40px;
  background-color: #f44336;
  text-decoration: none;
  color: #ffffff;
  border-radius: 10000px;
  font-weight: bold;
  font-size: 18px;
  &:hover {
    background-color: #d63b2f;
  }
`;
const UnblockButton = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  height: 40px;
  border: 2px solid #f44336;
  background-color: white;
  text-decoration: none;
  color: #f44336;
  border-radius: 10000px;
  font-weight: bold;
  font-size: 18px;
  &:hover {
    border: 2px solid #d63b2f;
    color: #d63b2f;
  }
`;
const Error = styled.div`
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  width: 100%;
  color: #f44336;
  @media screen and (max-width: 720px) {
    font-size: 14px;
  }
`;
const ReturnBackButton = styled.div`
  color: #f66257;
  font-weight: bold;
  display: flex;
  align-items: center;
  p {
    font-size: 20px;
    line-height: 31px;
    @media screen and (max-width: 720px) {
      font-size: 16px;
    }
  }

  @media screen and (min-width: 720px) {
    display: none;
  }
`;
const Name = styled.div`
  font-size: 20px;
  @media screen and (max-width: 720px) {
    font-size: 16px;
  }
`;
export default Chat;
