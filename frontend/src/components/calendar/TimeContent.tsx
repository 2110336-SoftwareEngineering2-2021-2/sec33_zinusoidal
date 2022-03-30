import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import TimeSlotDetail from "./TimeSlotDetail";

const list = [
  { startTime: "00:00", stopTime: "02:00", type: "free", topic: "cat" },
  { startTime: "02:00", stopTime: "04:00", type: "booked", topic: "dog" },

  { startTime: "04:00", stopTime: "05:00", type: "booked", topic: "dog" },
  { startTime: "11:00", stopTime: "15:30", type: "free", topic: "dog" },
  { startTime: "17:00", stopTime: "24:00", type: "booked", topic: "dog" },
];
const TimeContent = ({ selectedDay, providerID }: any) => {
  const [realList, setRealList] = useState([] as any);
  useEffect(() => {
    let list = [] as any;
    axios({
      method: "post",
      url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/available_time/${providerID}`,
      data: {
        date: selectedDay.date,
        month: selectedDay.month + 1,
        year: selectedDay.year,
      },
    })
      .then(function (response) {
        const wang = response.data;
        for (let i = 0; i < response.data.length; i++) {
          list.push({
            startTime: wang[i][0],
            stopTime: wang[i][1],
            type: "free",
            topic: "free",
          });
        }

        axios({
          method: "post",
          url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/my_schedule/${providerID}`,
          data: {
            date: selectedDay.date,
            month: selectedDay.month + 1,
            year: selectedDay.year,
          },
        })
          .then(function (response) {
            const notwang = response.data;
            // console.log("NOT WANG", notwang);
            for (let i = 0; i < notwang.length; i++) {
              list.push({
                startTime: notwang[i].time[0],
                stopTime: notwang[i].time[1],
                type: "booked",
                topic: notwang[i].topic,
              });
            }
            list.sort(function (a: any, b: any) {
              if (
                a.startTime < b.startTime ||
                (a.startTime == b.startTime && a.stopTime < b.stopTime)
              )
                return -1;
              return 1;
            });
            let realList = [];

            for (let i = 0; i < list.length; i++) {
              if (i == 0) {
                if (list[0].startTime != "00:00") {
                  realList.push({
                    startTime: "00:00",
                    stopTime: list[0].startTime,
                    type: "no",
                    topic: "no",
                  });
                }
              }
              realList.push(list[i]);
              if (i == list.length - 1) {
                break;
              }
              realList.push({
                startTime: list[i].stopTime,
                stopTime: list[i + 1].startTime,
                type: "no",
                topic: "no",
              });
            }
            if (list.length > 0 && list[list.length - 1].stopTime != "23:59") {
              realList.push({
                startTime: list[list.length - 1].stopTime,
                stopTime: "23:59",
                type: "no",
                topic: "no",
              });
            }

            setRealList(realList as any);
          })
          .catch(function (error) {});
      })
      .catch(function (error) {});
  }, [selectedDay, providerID]);

  return (
    <Layout>
      {realList.map((item: any, index: any) => (
        <TimeSlotDetail
          key={index}
          time={item}
          type={item.type}
          topic={item.topic}
        />
      ))}
    </Layout>
  );
};

const Layout = styled.div`
  flex: 1;
  background-color: ${COLOR["gray/300"]};
  /* margin-top: 10px; */
  /* padding-top: 10px; */
`;
export default TimeContent;
