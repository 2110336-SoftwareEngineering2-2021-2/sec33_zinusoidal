import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import Backdrop from "./Backdrop";
import axios from "axios";
import Cookies from "universal-cookie";
import { SDK_VERSION } from "firebase/app";
import { Link } from "react-router-dom";
import CreateReviewModal from "../review/CreateReviewModal";
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

const Notification = ({ data }: any) => {
  const user = cookies.get("user");
  const [showNotification, setShowNotification] = useState(false);
  const [partner, setPartner] = useState({} as any);
  const [showReview, setShowReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const onClick = () => {
    setShowNotification(false);
  };
  let d = new Date(data.appointment_time[0].start_time.seconds * 1000);
  let g = new Date(data.appointment_time[0].end_time.seconds * 1000);

  const HandleRequest = async (accept: string) => {
    await axios({
      method: "post",
      url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/response_appointment/${data.id}/${accept}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(function (response) {
        alert("Finish");
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
            setLoading(false);
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
            </b>
            has <b>accept</b> your appointment's proposal in {d.getDate()}/
            {d.getMonth() + 1}/{d.getFullYear()} at{" "}
            {d.getHours() < 10 ? "0" : ""}
            {d.getHours()}:{d.getMinutes() < 10 ? "0" : ""}
            {d.getMinutes()} - {g.getHours() < 10 ? "0" : ""}
            {g.getHours()}:{g.getMinutes() < 10 ? "0" : ""}
            {g.getMinutes()} <Purtext>Please proceed to payment</Purtext>
          </p>
        );
      }

      if (data.status == 3 || data.status == 4) {
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
            requests you an fortune telling's appointment
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
      } else if (data.status == 2) {
        return (
          <p>
            You <b>accepted</b>{" "}
            <b>
              {partner.customer.firstName} {partner.customer.lastName}
            </b>{" "}
            an fortune telling's appointment
          </p>
        );
      } else if (data.status == 3) {
        return (
          <p>
            <b>
              {partner.customer.firstName} {partner.customer.lastName}
            </b>{" "}
            paid you an appointment's fee
          </p>
        );
      } else {
        return (
          <p>
            <b>
              {partner.customer.firstName} {partner.customer.lastName}
            </b>{" "}
            completed an appointment
          </p>
        );
      }
    }
  };

  if (loading) return null;
  return (
    <>
      <Layout>
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
        {showReview && (
          <Backdrop onClick={() => setShowReview(false)}>
            <CreateReviewModal
              providerID={partner.provider.userId}
              data={data}
              callback={() => setShowReview(false)}
            />
          </Backdrop>
        )}
      </Layout>
      {typeof user != "undefined" &&
        user.user_id.slice(0, 1) == "P" &&
        data.status == 0 && (
          <div
            style={{
              display: "flex",
              alignSelf: "flex-end",
              marginRight: 8,
              marginBottom: 8,
            }}
          >
            <PayButton
              style={{ width: 93 }}
              type="button"
              onClick={() => {
                if (
                  user.user_id.slice(0, 1) == "P" &&
                  data.status == 0 &&
                  showNotification == false
                )
                  setShowNotification(true);
              }}
            >
              View Detail
            </PayButton>
          </div>
        )}
      {typeof user != "undefined" &&
        user.user_id.slice(0, 1) == "C" &&
        data.status == 2 && (
          <div
            style={{
              display: "flex",
              alignSelf: "flex-end",
              marginRight: 8,
              marginBottom: 8,
            }}
          >
            <PayButton
              type="button"
              onClick={() => {
                HandleRequest("3");
              }}
            >
              Pay
            </PayButton>
          </div>
        )}
      {typeof user != "undefined" &&
        user.user_id.slice(0, 1) == "C" &&
        data.status == 3 && (
          <div
            style={{
              display: "flex",
              alignSelf: "flex-end",
              marginRight: 8,
              marginBottom: 8,
            }}
          >
            <PayButton type="button" onClick={() => setShowReview(true)}>
              Review
            </PayButton>
            <CancleButton type="button" onClick={() => HandleRequest("4")}>
              Cancel
            </CancleButton>
          </div>
        )}
    </>
  );
};

const AppointMent = ({ data, handleRequest, customer }: any) => {
  let detail = [];
  let services = [];
  for (let j = 0; j < data.information.length; j++) {
    detail.push({ info: data.information[j], value: data.value[j] });
  }
  for (let i = 0; i < data.service.length; i++) {
    let d = new Date(data.appointment_time[i].start_time.seconds * 1000);
    let g = new Date(data.appointment_time[i].end_time.seconds * 1000);

    services.push({
      service: data.service[i],
      Date1: d,
      Date2: g,
      seconds: (g.getTime() - d.getTime()) / 1000,
    });
  }
  console.log("GGGGO", services.length);
  const [show, setShow] = useState(false);
  console.log("DATA is", data);
  // const d = new Date(data.appointment_time[0].start_time.seconds * 1000);
  // const g = new Date(data.appointment_time[0].end_time.seconds * 1000);
  // var seconds = (g.getTime() - d.getTime()) / 1000;

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
        <div
          style={{
            flex: 1,
            padding: 20,
            overflow: "auto",
            height: 403,
          }}
        >
          {show
            ? detail.map((item, index) => (
                <p>
                  <b>{item.info}</b> : {item.value}
                </p>
              ))
            : services.map((item, index) => (
                <DetailBox>
                  <p>
                    <b>Service:</b> {item.service.service_type} <b>Customer:</b>{" "}
                    {customer.firstName} {customer.lastName}
                  </p>
                  <p>
                    <b>Date: </b>
                    {item.Date1.getDate()} {MonthName[item.Date1.getMonth()]}{" "}
                    {item.Date1.getFullYear()}
                    <b> Time: </b> {item.Date1.getHours() < 10 ? "0" : ""}
                    {item.Date1.getHours()}:
                    {item.Date1.getMinutes() < 10 ? "0" : ""}
                    {item.Date1.getMinutes()} -{" "}
                    {item.Date2.getHours() < 10 ? "0" : ""}
                    {item.Date2.getHours()}:
                    {item.Date2.getMinutes() < 10 ? "0" : ""}
                    {item.Date2.getMinutes()}
                    <b> Duration: </b>
                    {item.seconds / 3600 >= 1
                      ? `${Math.floor(item.seconds / 3600)} hour`
                      : // {Math.floor(item.seconds / 3600) > 1 ? && "s"}

                        ""}
                    {(item.seconds % 3600) / 60 != 0 && (
                      <>{(item.seconds % 3600) / 60} minutes</>
                    )}
                  </p>

                  <p>
                    <b>Price: </b>
                    {item.service.price}
                  </p>
                </DetailBox>
              ))}
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
  /* min-height: 60px; */
  margin: 2px 0px 0px;
  /* border: 1px solid black; */
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
  @media screen and (max-width: 600px) {
    margin-left: 20px;
    margin-right: 20px;
  }
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
  min-height: 117px;
  background-color: white;
  border-radius: 20px;
  padding: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const PayButton = styled.button`
  width: 68px;
  height: 28px;
  border-radius: 10000px;
  background-color: ${COLOR["violet/400"]};
  font-size: 12px;
  line-height: 19px;
  color: white;
  border: none;
  font-weight: bold;
  align-self: flex-end;
  cursor: pointer;
`;

const CancleButton = styled.button`
  width: 68px;
  height: 28px;
  border-radius: 10000px;
  font-size: 12px;
  line-height: 19px;
  color: ${COLOR["violet/400"]};
  border: 1px solid ${COLOR["violet/400"]};
  font-weight: bold;
  align-self: flex-end;
  margin-left: 20px;
  background-color: white;
  cursor: pointer;
`;

const Purtext = styled.span`
  color: ${COLOR["violet/400"]};
`;
export default Notification;
