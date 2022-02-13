import React, { useState } from "react";

const Teach = () => {
  let list = [
    ["07.00", "08.00"],
    ["11.00", "12.00"],
  ];

  const addToList = (time: any) => {
    let newList = [...list, time];
    let newnewList = [];
    newList.sort();
    let start = newList[0][0];
    let stop = newList[0][1];
    let idx = 1;
    while (idx < newList.length) {
      if (newList[idx][0] > stop) {
        newnewList.push([start, stop]);
        start = newList[idx][0];
        stop = newList[idx][1];
      } else {
        if (newList[idx][1] > stop) {
          stop = newList[idx][1];
        }
      }
      idx++;
    }
    newnewList.push([start, stop]);
    list = [...newnewList];
  };

  addToList(["00.00", "05.00"]);

  console.log(list);
  return <></>;
};

export default Teach;
