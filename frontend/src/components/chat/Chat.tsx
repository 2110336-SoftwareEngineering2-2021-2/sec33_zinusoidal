import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { BiSend } from "react-icons/bi";
const Img = require("../../assets/zinusoidal.png");

const Chat = ({ chatMessage, selectedUser, setMessage, message }: any) => {
  console.log(message);
  const sendMessage = () => {
    //send message api
    setMessage("");
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    (messagesEndRef as any).current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessage]);
  return (
    <Layout>
      <ChatHeader>{selectedUser}</ChatHeader>
      <ChatField>
        {chatMessage.map((item: any, index: any) => (
          <MessageDiv
            ref={messagesEndRef}
            style={{
              justifyContent:
                item.userID == "789101" ? "flex-end" : "flex-start",
            }}
          >
            {item.userID == "789101" ? null : index == 0 ||
              chatMessage[index - 1].userID != item.userID ? (
              <Image>
                <img src={Img} alt="profle" />
              </Image>
            ) : (
              <Image />
            )}
            <ChatMessage
              style={{
                backgroundColor:
                  item.userID == "789101"
                    ? COLOR["violet/200"]
                    : COLOR["blue/100"],
                borderRadius:
                  item.userID == "789101"
                    ? "20px 25px 0px 20px"
                    : "25px 20px 20px 0px",
              }}
            >
              {item.message}
            </ChatMessage>
          </MessageDiv>
        ))}
        <div ref={messagesEndRef}> </div>
      </ChatField>
      <ChatInput>
        <Chatbox
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
        >
          Send <BiSend style={{ marginLeft: 8 }} />
        </Button>
      </ChatInput>
    </Layout>
  );
};
const Layout = styled.div`
  height: 690px;
  width: 690px;
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
  flex-direction: column;
`;
const ChatHeader = styled.div`
  z-index: 1;
  width: 100%;
  height: 80px;
  border-radius: 8px 8px 0px 0px;
  display: flex;
  align-items: center;
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
    background-color: ${COLOR["violet/500"]};
  }
`;
const ChatMessage = styled.div`
  height: fit-content;
  overflow-wrap: break-word;
  width: fit-content;
  max-width: 70%;
  background-color: red;
  padding: 15px;
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
export default Chat;
