import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import BookedSlot from "./BookedSlot";
import { BsCalendarCheck } from "react-icons/bs";
import axios from "axios";
import Cookies from "universal-cookie";

const bagImg = require("../../assets/bag.png");
const cookies = new Cookies();

//prettier-ignore
const li = [
{ time : ["08:00" , "17:00"] , topic : 'Cat' , FirstName : 'Chawin Gowanit' },    
{ time : ["08:00" , "17:00"] , topic : 'Cat' , FirstName : 'Chawin Gowanit' },
{ time : ["08:00" , "17:00"] , topic : 'Cat' , FirstName : 'Chawin Gowanit' },
{ time : ["08:00" , "17:00"] , topic : 'Cat' , FirstName : 'Chawin Gowanit' },

]

const monthList = [
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

const Schedule = ({ day, setPressed }: any) => {
  const [Schedulelist, setScheduleList] = useState([]);
  const user = cookies.get("user");

  useEffect(() => {
    axios({
      method: "post",
      url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/my_schedule/${user?.user_id}`,
      data: { date: day.date, month: day.month + 1, year: day.year },
    })
      .then(function (response) {
        console.log(response.data);
        setScheduleList(response.data);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  }, [day]);
  return (
    <Layout>
      <Clip>
        <Circle>
          <SmallCircle />
        </Circle>
      </Clip>
      <Padding>
        <BackButton onClick={() => setPressed(false)}>← back</BackButton>

        <Header>
          <p>My Schedule</p>
          <DateBlock>
            <BsCalendarCheck style={{ marginRight: 7 }} />
            {day.date} {monthList[day.month]} {day.year}
          </DateBlock>
        </Header>
        <Content>
          {Schedulelist.map((item, index) => (
            <BookedSlot key={index} data={item} idx={index} />
          ))}
          {Schedulelist.length == 0 && (
            <img
              src={bagImg}
              alt=""
              style={{ width: 226, height: 226, marginTop: 80 }}
            />
          )}
        </Content>
      </Padding>
    </Layout>
  );
};

const Layout = styled.div`
  width: 536px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  margin-left: 31px;
  margin-top: 129px;
  margin-bottom: 129px;

  @media screen and (max-width: 1150px) {
    margin-left: 0px;
  }
  @media screen and (max-width: 600px) {
    width: 500px;
  }
  @media screen and (max-width: 500px) {
    width: 400px;
  }
  @media screen and (max-width: 420px) {
    width: 320px;
    margin-top: 100px;
  }

  @media screen and (max-width: 330px) {
    width: 300px;
    margin-top: 100px;
  }
`;

const Clip = styled.div`
  width: 100%;
  height: 95px;
  background-color: ${COLOR["violet/400"]};
  position: relative;
  text-align: center;
  border-radius: 20px 20px 0 0;
`;

const Circle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-color: ${COLOR["violet/400"]};
  position: absolute;
  top: -35px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SmallCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-color: ${COLOR["magenta/100"]};
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 410px;
  overflow-y: auto;
  align-items: center;
  /* ::-webkit-scrollbar {
    display: none;
  } */
`;

const Padding = styled.div`
  padding: 30px;
`;

const Header = styled.div`
  height: 35px;
  display: flex;
  align-items: center;
  margin-bottom: 18px;

  p {
    font-size: 20px;
    line-height: 31px;
    font-weight: bold;

    @media screen and (max-width: 500px) {
      font-size: 16px;
      line-height: 22px;
    }
    @media screen and (max-width: 350px) {
      font-size: 12px;
      line-height: 18px;
    }
  }
`;

const DateBlock = styled.div`
  min-width: 150px;
  background-color: ${COLOR["violet/100"]};
  display: flex;
  align-items: center;
  border-radius: 10px;
  height: 100%;
  margin-left: 18px;

  font-size: 16px;
  line-height: 25px;
  padding: 0 5px;
`;

const BackButton = styled.div`
  color: #f44336;
  font-size: 20px;
  line-height: 31px;
  font-weight: bold;
  display: flex;
  align-items: center;

  @media screen and (min-width: 1151px) {
    display: none;
  }
`;
export default Schedule;
