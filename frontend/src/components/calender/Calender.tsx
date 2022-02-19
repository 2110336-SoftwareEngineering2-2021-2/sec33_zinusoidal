import React from "react";
import styled from "styled-components";
import CalenderHeader from "./CalenderHeader";
import DayBar from "./DayBar";
type DatePropType = {
  inMonth: boolean;
};

const lastDay = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30];
const Calender = ({ CALENDERDATA, month }: any) => {
  let pre = [];
  let post = [];
  const idx = CALENDERDATA[0].idx;
  const last = lastDay[month];
  for (let k = last - (idx - 1); k <= last; k++) {
    pre.push({ date: k, idx: -1 });
  }
  const j = pre.concat(CALENDERDATA);

  for (let t = 1; t <= 1 + (42 - pre.length - CALENDERDATA.length - 1); t++) {
    post.push({ date: t, idx: -1 });
  }
  const jj = j.concat(post);

  console.log(j);
  return (
    <Layout>
      <CalenderHeader month={month} />
      <DayBar />
      <CalenderContainer>
        {jj.map((item, index) => (
          <Date key={index} inMonth={item.idx != -1}>
            <p>{item.date}</p>
          </Date>
        ))}
      </CalenderContainer>
    </Layout>
  );
};

const Layout = styled.div`
  background-color: white;
  border: 1px solid black;
`;

const CalenderContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  /* background-color: blue; */
`;

const Date = styled("div")<DatePropType>`
  p {
    color: ${(props) => (props.inMonth ? "black" : "grey")};
    text-align: center;
  }
`;

export default Calender;
