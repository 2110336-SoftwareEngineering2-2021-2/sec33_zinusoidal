import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { MdOutlineArrowBack } from "react-icons/md";
import { RiAlertLine } from "react-icons/ri";
import { FaRegSmileWink } from "react-icons/fa";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const EditPassword = ({ setCurrent, userData }: any) => {
  let navigate = useNavigate();

  return (
    <Layout>
      <Padding>
        <PicDiv>
          <FaRegSmileWink size={200} color={"#f66257"} />
          <p>Your account is gone forever bye bye ;)</p>
        </PicDiv>
        <Button
          onClick={() => {
            navigate(`/`);
          }}
        >
          Done
        </Button>
      </Padding>
    </Layout>
  );
};
const Layout = styled.div`
  width: 100%;
  min-height: 600px;
  font-weight: bold;
  background-color: white;
  border-radius: 0 0 20px 20px;
  overflow-y: scroll;
`;
const Padding = styled.div`
  height: 100%;
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
`;
const PicDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
`;
const Button = styled.button`
  width: 80px;
  padding: 5px;
  border: none;
  color: white;
  background-color: ${COLOR["violet/400"]};
  text-decoration: none;
  border-radius: 10000px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: ${COLOR["violet/500"]};
  }
`;
export default EditPassword;
