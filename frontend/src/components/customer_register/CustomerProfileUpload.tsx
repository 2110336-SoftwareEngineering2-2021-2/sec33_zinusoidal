import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import React, { useState, useRef } from "react";

import { BsPeopleFill } from "react-icons/bs";
import { AiOutlineUpload } from "react-icons/ai";
const selectedImg = require("../../assets/zinusoidal.png");

const CustomerProfileUpload = () => {
  const imageInput = useRef();
  const [selectedImage, setSelectedImage] = useState(selectedImg);
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Layout>
      <Padding>
        <CustomerRegistration>
          <BsPeopleFill color={COLOR["violet/400"]} />
          Customer Registration
        </CustomerRegistration>
        <ProfilePicture>Profile Picture</ProfilePicture>
        <Flex>
          <img src={selectedImage} alt="yay" />
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
        </Flex>
      </Padding>
    </Layout>
  );
};
const Layout = styled.div`
  width: 100%;
  background-color: white;
  font-weight: bold;
`;
const Padding = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;
const Flex = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 25px;
  img {
    width: 160px;
    height: 160px;
    border-radius: 10000px;
  }
`;

const CustomerRegistration = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

const ProfilePicture = styled.div`
  width: 100%;
  font-size: 18px;
`;

const Button = styled.button`
  cursor: pointer;
  width: 97px;
  text-decoration: none;
  border: none;
  color: white;
  background-color: ${COLOR["violet/400"]};
  padding: 5px;
  border-radius: 10000px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  &:hover {
    background-color: ${COLOR["violet/500"]};
  }
`;

export default CustomerProfileUpload;
