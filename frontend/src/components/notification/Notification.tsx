import React, { useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import Backdrop from "./Backdrop";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
  },
};

const Notification = ({ person, content }: any) => {
  const [showNotification, setShowNotification] = useState(false);
  console.log(showNotification);
  const onClick = () => {
    console.log("call this");
    setShowNotification(false);
  };
  return (
    <Layout
      onClick={() => {
        if (showNotification == false) setShowNotification(true);
      }}
    >
      <Image src="https://www.blexar.com/avatar.png" alt="profilePic" />
      <Content>
        <p>{content}</p>
      </Content>
      {showNotification && (
        <Backdrop onClick={onClick}>
          <AppointMent />
        </Backdrop>
      )}
    </Layout>
  );
};

const AppointMent = () => {
  return (
    <AppointmentDetailBox
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h1>Appointment Detail</h1>
      <AppointmentList>
        <AppointmentListHeader>
          <div>Appointment</div>
          Information
        </AppointmentListHeader>
      </AppointmentList>
      <P>Total price : 300 baht</P>
      <HandleButton>
        <Button style={{ backgroundColor: "#F66257" }}>Reject</Button>
        <Button style={{ backgroundColor: COLOR["green/400"] }}>Accept</Button>
      </HandleButton>
    </AppointmentDetailBox>
  );
};
const Layout = styled.div`
  width: 276px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  min-height: 60px;
`;

const Image = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  object-fit: fill;
`;
const Content = styled.div`
  flex: 1;
  margin-left: 8px;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const AppointmentDetailBox = styled.div`
  width: 536px;
  height: 698px;
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const AppointmentList = styled.div`
  height: 448px;
  max-height: 448px;
  border-radius: 20px;
  background-color: white;
  margin-top: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const AppointmentListHeader = styled.div`
  width: 100%;
  height: 45px;
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: space-between;
  background-color: ${COLOR["violet/200"]};
  font-size: 16px;
  line-height: 25px;
  font-weight: bold;
  align-items: center;
  padding-right: 10px;
  div {
    align-self: stretch;
    width: 116px;
    background-color: ${COLOR["violet/400"]};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px 0 0 0;
  }
`;

const HandleButton = styled.div`
  width: 100%;
  height: 39px;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 20px;
  line-height: 31px;
  margin-top: 30px;
  text-align: center;
`;
const Button = styled.button`
  width: 104px;
  height: 39px;
  border-radius: 10000px;
  border: none;
  font-size: 18px;
  line-height: 28px;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;
export default Notification;
