import React, { useState, useRef } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri";
import { AiOutlineUpload } from "react-icons/ai";

const selectedImg = require("../../assets/zinusoidal.png");

const EditForm = ({
  userData,
  changeUserData,
  setGetProfilePicUrl,
  getProfilePicUrl,
  profilePicUrl,
  setProfilePicUrl,
}: any) => {
  console.log(userData.Name);
  const [selectedImage, setSelectedImage] = useState(selectedImg);
  const [seePassword, setSeePassword] = useState(false);

  const imageInput = useRef();
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePicUrl(e.target.files[0]);
    }
  };

  return (
    <Layout>
      <Padding>
        <ImageZone>
          <Image>
            {profilePicUrl == null ? (
              <img src={getProfilePicUrl} />
            ) : (
              <img src={URL.createObjectURL(profilePicUrl)} />
            )}
          </Image>
          <input
            type="file"
            onChange={imageChange}
            style={{ display: "none" }}
            ref={imageInput as any}
          />
          <Button
            onClick={() => {
              (imageInput as any).current.click();
            }}
          >
            Upload
            <AiOutlineUpload />
          </Button>
        </ImageZone>
        <DoubleInput>
          <InputDiv>
            <FormLabel>Name</FormLabel>
            <Forminput
              type="text"
              value={userData.Name}
              onChange={(event) => {
                changeUserData({ ...userData, Name: event.target.value });
              }}
            />
          </InputDiv>
          <InputDiv>
            <FormLabel>Surname</FormLabel>
            <Forminput
              type="text"
              value={userData.Surname}
              onChange={(event) => {
                changeUserData({ ...userData, Surname: event.target.value });
              }}
            />
          </InputDiv>
        </DoubleInput>
        {/* <InputDiv>
          <FormLabel>Email</FormLabel>
          <Forminput
            type="text"
            value={userData.Email}
            onChange={(event) => {
              changeUserData({ ...userData, Email: event.target.value });
            }}
          />
        </InputDiv> */}
        <DoubleInput>
          <InputDiv>
            <FormLabel>Username</FormLabel>
            <Forminput
              type="text"
              value={userData.Username}
              onChange={(event) => {
                changeUserData({ ...userData, Username: event.target.value });
              }}
            />
          </InputDiv>
          <InputDiv>
            <FormLabel>Password</FormLabel>
            {seePassword ? (
              <PasswordDiv>
                <Forminput
                  disabled={true}
                  type="text"
                  onChange={(event) => {
                    changeUserData({
                      ...userData,
                      Password: event.target.value,
                    });
                  }}
                />
                <RiEyeFill
                  size={16}
                  style={{ marginRight: 4 }}
                  onMouseUpCapture={() => {
                    setSeePassword(false);
                  }}
                />
              </PasswordDiv>
            ) : (
              <PasswordDiv>
                <Forminput
                  type="password"
                  onChange={(event) => {
                    changeUserData({
                      ...userData,
                      Password: event.target.value,
                    });
                  }}
                />
                <RiEyeCloseLine
                  size={16}
                  style={{ marginRight: 4 }}
                  onMouseDownCapture={() => {
                    setSeePassword(true);
                  }}
                />
              </PasswordDiv>
            )}{" "}
          </InputDiv>
        </DoubleInput>
        <BioDiv>
          <div>
            <FormLabel>Biography</FormLabel>
          </div>
          <Biotext
            value={userData.Biography}
            style={{ height: 140 }}
            onChange={(event) => {
              changeUserData({
                ...userData,
                Biography: event.target.value,
              });
            }}
          />
        </BioDiv>
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
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const ImageZone = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 8px;
`;

const Image = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  /* margin-top: 10px; */
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
`;
const FormLabel = styled.p`
  display: inline;
  font-size: 16px;
`;
const InputDiv = styled.div`
  width: 100%;
`;

const DoubleInput = styled.div`
  width: 100%;
  display: flex;
  column-gap: 15px;
  @media screen and (max-width: 540px) {
    flex-direction: column;
  }
`;

const Forminput = styled.input`
  width: 100%;
  height: 32px;
  padding-left: 5px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  border: solid #808080 1px;
  &:focus {
    outline: none;
    border: solid ${COLOR["magenta/300"]} 1px;
  }
`;
const PasswordDiv = styled.div`
  display: flex;
  align-items: center;
  border: solid #808080 1px;
  border-radius: 8px;
  :focus-within {
    outline: none;
    border: solid ${COLOR["magenta/300"]} 1px;
  }
  input {
    border: none;
    &:focus {
      border: none;
      outline: none;
    }
  }
`;
const BioDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;
const Biotext = styled.textarea`
  padding: 5px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  &:focus {
    outline: none;
    border: solid ${COLOR["magenta/200"]} 1px;
  }
`;
const Button = styled.button`
  width: 97px;

  padding: 5px;
  border: none;
  color: white;
  background-color: ${COLOR["violet/400"]};
  text-decoration: none;
  border-radius: 10000px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${COLOR["violet/500"]};
  }
`;

export default EditForm;
