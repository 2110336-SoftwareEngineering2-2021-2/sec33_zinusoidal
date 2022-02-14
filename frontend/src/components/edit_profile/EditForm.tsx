import React, { useState, useRef } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri";
import { AiOutlineUpload } from "react-icons/ai";

const selectedImg = require("../../assets/zinusoidal.png");

const EditForm = ({ userData, changeUserData }: any) => {
  const [selectedImage, setSelectedImage] = useState(selectedImg);
  const [seePassword, setSeePassword] = useState(false);

  const imageInput = useRef();
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      console.log(selectedImage);
    }
  };

  return (
    <Layout>
      <Padding>
        <ImageZone>
          <Image>
            <img src={selectedImage} alt="yay" />
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
              onChange={(event) => {
                changeUserData({ ...userData, Name: event.target.value });
                console.log(userData);
              }}
            />
          </InputDiv>
          <InputDiv>
            <FormLabel>Surname</FormLabel>
            <Forminput
              type="text"
              onChange={(event) => {
                changeUserData({ ...userData, Surname: event.target.value });
              }}
            />
          </InputDiv>
        </DoubleInput>
        <InputDiv>
          <FormLabel>Email</FormLabel>
          <Forminput
            type="text"
            onChange={(event) => {
              changeUserData({ ...userData, Email: event.target.value });
            }}
          />
        </InputDiv>
        <DoubleInput>
          <InputDiv>
            <FormLabel>Username</FormLabel>
            <Forminput
              type="text"
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
            style={{ height: 140 }}
            onChange={(event) => {
              changeUserData({
                ...userData,
                Biography: event.target.value,
              });
              console.log(userData);
            }}
          />
        </BioDiv>
      </Padding>
    </Layout>
  );
};
const Layout = styled.div`
  height: 600px;
  font-weight: bold;
  width: 100%;
  background-color: white;
  box-shadow: 0px 0px rgba(0, 0, 0, 0.25);
  border-radius: 0 0 20px 20px;
`;
const Padding = styled.div`
  height: 100%;
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
`;

const Image = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  /* margin-top: 10px; */
  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
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
  @media screen and (max-width: 1300px) {
    height: 134px;
  }
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
