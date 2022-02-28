import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { useNavigate } from "react-router-dom";
import { FaRegSmileWink } from "react-icons/fa";
import { RiAlertLine } from "react-icons/ri";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const EditPassword = ({}: any) => {
  const user = cookies.get("user");
  const [success, setSuccess] = useState(false);
  console.log(user);
  const [deleteWord, setDeleteWord] = useState("");
  const [usernameNotMatch, setUsernameNotMatch] = useState(false);
  const [deleteErrorOpen, setDeleteErrorOpen] = useState(false);

  let navigate = useNavigate();
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
        setSuccess(true);
      })
      .catch(function (error) {
        setDeleteErrorOpen(true);
        console.log(error.response.data.message);
      });
  };
  return (
    <Layout>
      <Header>
        <Circle>
          <InnerCircle></InnerCircle>
        </Circle>
      </Header>
      {success ? (
        <Padding>
          <PicDiv>
            <FaRegSmileWink size={200} color={"#f66257"} />
            <p>Your account is gone forever bye bye ;)</p>
            <GreenButton
              onClick={() => {
                navigate(`/`);
              }}
            >
              Done
            </GreenButton>
          </PicDiv>
        </Padding>
      ) : (
        <Padding>
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
                  placeholder={user.username}
                  onChange={(e) => {
                    setUsernameNotMatch(false);
                    setDeleteWord(e.target.value);
                  }}
                ></Forminput>
                <Button
                  onClick={() => {
                    user.username == deleteWord
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
      )}
    </Layout>
  );
};
const Layout = styled.div`
  width: 500px;
  font-weight: bold;
  background-color: white;
  border-radius: 20px 20px 20px 20px;
  @media screen and (max-width: 500px) {
    width: 400px;
  }
  @media screen and (max-width: 400px) {
    width: 300px;
  } ;
`;
const Padding = styled.div`
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PicDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
`;
const ContentDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const Error = styled.p`
  color: ${COLOR["magenta/500"]};
`;
const Header = styled.div`
  width: 100%;
  height: 95px;
  border-radius: 20px 20px 0px 0px;
  background-color: ${COLOR["violet/400"]};
  display: flex;
  justify-content: center;
`;
const Circle = styled.div`
  width: 70px;
  height: 70px;
  background-color: ${COLOR["violet/400"]};
  border-radius: 10000px;
  margin-top: -35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerCircle = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${COLOR["blue/100"]};
  border-radius: 10000px;
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
const GreenButton = styled.button`
  cursor: pointer;
  border: none;
  width: 100px;
  height: 40px;
  background-color: ${COLOR["green/400"]};
  text-decoration: none;
  color: white;
  border-radius: 10000px;
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  :hover {
    background-color: ${COLOR["green/500"]} !important ;
  }
`;
export default EditPassword;
