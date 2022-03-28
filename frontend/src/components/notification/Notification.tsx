import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import Backdrop from "./Backdrop";
import axios from "axios";
import Cookies from "universal-cookie";
import { SDK_VERSION } from "firebase/app";
const cookies = new Cookies();
const MonthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
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

const Notification = ({ person, content, data }: any) => {
  const user = cookies.get("user");
  const [showNotification, setShowNotification] = useState(false);
  const [partner, setPartner] = useState({} as any);
  const onClick = () => {
    console.log("call this");
    setShowNotification(false);
  };

  // console.log(partner);

  const HandleRequest = async (accept: string) => {
    await axios({
      method: "post",
      url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/response_appointment/${data.id}/${accept}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(function (response) {
        console.log("FINIsh");
        setShowNotification(false);
      })
      .catch(function (error) {
        console.log("error");
      });
  };

  useEffect(() => {
    let customer: any;
    let provider: any;

    axios({
      method: "get",
      url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/customer/${data.customerID}`,
    })
      .then(function (response) {
        customer = response.data;
        axios({
          method: "get",
          url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/provider/${data.providerID}`,
        })
          .then(function (response) {
            provider = response.data;
            setPartner({ customer: customer, provider: provider } as any);
          })
          .catch(function (error) {
            console.log("error");
          });
      })
      .catch(function (error) {
        console.log("error");
      });
  }, []);
  const Detail = () => {
    if (typeof partner.provider == "undefined") return null;
    if (typeof user != "undefined" && user.user_id.slice(0, 1) == "C") {
      //cust send req to provider
      if (data.status == 0) {
        return (
          <p>
            You sent{" "}
            <b>
              {partner.provider.firstName} {partner.provider.lastName}
            </b>{" "}
            an fortune telling's appointment
          </p>
        );
      }
      //provider reject
      if (data.status == 1) {
        return (
          <p>
            <b>
              {partner.provider.firstName} {partner.provider.lastName}
            </b>{" "}
            has <b>reject</b> your appointment
          </p>
        );
      }
      // provider accept
      if (data.status == 2) {
        return (
          <p>
            <b>
              {partner.provider.firstName} {partner.provider.lastName}
            </b>{" "}
            has <b>accept</b> your appointment
          </p>
        );
      }
      if (data.status == 3) {
        return (
          <p>
            <b>
              {partner.provider.firstName} {partner.provider.lastName}
            </b>
            has <b>accepted</b> your appointment's proposal in 24/02/2022 in
            12.00 - 13.00 Please proceed to payment
          </p>
        );
      }

      if (data.status == 4) {
        return (
          <p>
            Your appointment with{" "}
            <b>
              {partner.provider.firstName} {partner.provider.lastName}
            </b>{" "}
            is completed !
          </p>
        );
      }

      return null;
    } else {
      if (data.status == 0) {
        return (
          <p>
            <b>
              {partner.customer.firstName} {partner.customer.lastName}
            </b>{" "}
            has request you an fortune telling's appointment
          </p>
        );
      } else if (data.status == 1) {
        return (
          <p>
            You <b>rejected</b>{" "}
            <b>
              {partner.customer.firstName} {partner.customer.lastName}
            </b>{" "}
            an fortune telling's appointment
          </p>
        );
      } else {
        return (
          <p>
            You <b>accepted</b>{" "}
            <b>
              {partner.customer.firstName} {partner.customer.lastName}
            </b>{" "}
            an fortune telling's appointment
          </p>
        );
      }
    }
  };
  return (
    <Layout
      onClick={() => {
        if (
          user.user_id.slice(0, 1) == "P" &&
          data.status == 0 &&
          showNotification == false
        )
          setShowNotification(true);
      }}
    >
      <Image
        src={
          typeof user != "undefined" && user.user_id.slice(0, 1) == "C"
            ? partner.provider?.profilePicUrl
            : partner.customer?.profilePicUrl
        }
        alt="profilePic"
      />
      <Content>
        <Detail />
      </Content>
      {showNotification && (
        <Backdrop onClick={onClick}>
          <AppointMent
            customer={partner.customer}
            data={data}
            handleRequest={HandleRequest}
          />
        </Backdrop>
      )}
    </Layout>
  );
};

const AppointMent = ({ data, handleRequest, customer }: any) => {
  console.log("DATA is ", data);
  let detail = [];
  for (let i = 0; i < data.information.length; i++) {
    detail.push({ info: data.information[i], value: data.value[i] });
  }
  const [show, setShow] = useState(false);

  const d = new Date(data.appointment_time[0].start_time.seconds * 1000);
  const g = new Date(data.appointment_time[0].end_time.seconds * 1000);
  var seconds = (g.getTime() - d.getTime()) / 1000;
  console.log("second", seconds);
  console.log("pp", d, g);
  return (
    <AppointmentDetailBox
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h1>Appointment Detail</h1>
      <AppointmentList>
        <AppointmentListHeader>
          <div
            style={{
              backgroundColor: show ? COLOR["violet/200"] : COLOR["violet/400"],
            }}
            onClick={() => {
              setShow(false);
            }}
          >
            Appointment
          </div>
          <div
            style={{
              backgroundColor: show ? COLOR["violet/400"] : COLOR["violet/200"],
              borderRadius: "0 20px 0 0 ",
            }}
            onClick={() => {
              setShow(true);
            }}
          >
            Information
          </div>
        </AppointmentListHeader>
        <div style={{ flex: 1, padding: 20 }}>
          {show ? (
            detail.map((item, index) => (
              <p>
                <b>{item.info}</b> : {item.value}
              </p>
            ))
          ) : (
            <DetailBox>
              <p>
                <b>Service:</b> <b>Customer:</b> {customer.firstName}{" "}
                {customer.lastName}
              </p>
              <p>
                <b>Date: </b>
                {d.getDate()} {MonthName[d.getMonth()]} {d.getFullYear()}
                <b> Time: </b> {d.getHours() < 10 ? "0" : ""}
                {d.getHours()}:{d.getMinutes() < 10 ? "0" : ""}
                {d.getMinutes()} - {g.getHours() < 10 ? "0" : ""}
                {g.getHours()}:{g.getMinutes() < 10 ? "0" : ""}
                {g.getMinutes()}
                <b> Duration: </b>
                {seconds / 3600 >= 1 ? `${seconds / 3600} hours` : ""}
                {(seconds % 3600) / 60} minutes
              </p>

              <p>
                <b>Price: </b>
                {data.total_price}
              </p>
            </DetailBox>
          )}
        </div>
      </AppointmentList>
      <P>Total price : {data.total_price} baht</P>
      <HandleButton>
        <Button
          style={{ backgroundColor: "#F66257" }}
          onClick={() => {
            handleRequest("1");
          }}
        >
          Reject
        </Button>
        <Button
          style={{ backgroundColor: COLOR["green/400"] }}
          onClick={() => {
            handleRequest("2");
          }}
        >
          Accept
        </Button>
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
  margin: 2px 0;
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
  padding-right: 0px;
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

const DetailBox = styled.div`
  height: 117px;
  background-color: white;
  border-radius: 20px;
  padding: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export default Notification;
