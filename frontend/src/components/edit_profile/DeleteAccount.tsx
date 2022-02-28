import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { MdOutlineArrowBack } from "react-icons/md";
import { RiAlertLine } from "react-icons/ri";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const EditPassword = ({ setCurrent, userData }: any) => {
  const [deleteWord, setDeleteWord] = useState("");
  const [usernameNotMatch, setUsernameNotMatch] = useState(false);
  const [deleteErrorOpen, setDeleteErrorOpen] = useState(false);
  const deleteAccount = () => {
    setUsernameNotMatch(false);
    setDeleteErrorOpen(false);
    const user = cookies.get("user");
    console.log("wait for delete API");
    setDeleteWord("");
    axios({
      method: "post",
      url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/delete_account`,
      data: {},
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(function (response) {
        setCurrent(6);
      })
      .catch(function (error) {
        setDeleteErrorOpen(true);
        console.log(error.response.data.message);
      });
  };
  return (
    <Layout>
      <Padding>
        <BackDiv
          style={{ cursor: "pointer" }}
          onClick={() => {
            setDeleteWord("");
            setCurrent(0);
          }}
        >
          <MdOutlineArrowBack />
          back
        </BackDiv>
        <ContentDiv>
          <p style={{ fontSize: 20 }}>Delete Account</p>
          <RiAlertLine size={160} color={COLOR["gray/400"]} />
          <Text>
            Deleting your account will remove all of your infotmation from our
            database. This cannot be undone
          </Text>
          <InputDiv>
            <p>Type your username to confirm </p>
            <InandButtonDiv>
              <Forminput
                value={deleteWord}
                placeholder={userData.Username}
                onChange={(e) => {
                  setUsernameNotMatch(false);
                  setDeleteErrorOpen(false);
                  setDeleteWord(e.target.value);
                }}
              ></Forminput>
              <Button
                onClick={() => {
                  userData.Username == deleteWord
                    ? deleteAccount()
                    : setUsernameNotMatch(true);
                }}
              >
                Delete Account
              </Button>
            </InandButtonDiv>
            {usernameNotMatch ? <Error>Incorrect Username</Error> : null}
            {deleteErrorOpen ? (
              <Error>You still have appointment! Don't leave us yet!</Error>
            ) : null}
          </InputDiv>
        </ContentDiv>
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
  justify-content: space-between;
  align-items: center;
`;
const BackDiv = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;
const ContentDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
`;
const Text = styled.p`
  width: 80%;
  font-weight: normal;
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const Forminput = styled.input`
  width: 65%;
  height: 38px;
  padding-left: 5px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  border: solid #808080 1px;
  &:focus {
    outline: none;
    border: solid ${COLOR["magenta/300"]} 1px;
  }
  @media screen and (max-width: 540px) {
    width: 100%;
  }
`;
const InandButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 540px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const Button = styled.button`
  width: 120px;
  padding: 5px;
  border: none;
  color: white;
  background-color: #f44336;
  text-decoration: none;
  border-radius: 10000px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  cursor: pointer;
  &:hover {
    background-color: #d63b2f;
  }
  @media screen and (max-width: 540px) {
    margin-top: 20px;
  }
`;
const Error = styled.p`
  color: ${COLOR["magenta/500"]};
`;
export default EditPassword;
