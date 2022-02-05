import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import React, { useState, useRef } from "react";

import { MdRemoveRedEye } from "react-icons/md";

import { AiOutlineUpload } from "react-icons/ai";
const selectedImg = require("../../assets/zinusoidal.png");

const ProviderProfileUpload = () => {
  const imageInput = useRef();
  const [selectedImage, setSelectedImage] = useState(selectedImg);
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      console.log(selectedImage);
    }
  };

  return (
    <Layout>
      <Padding>
        <ProviderRegistration>
          <MdRemoveRedEye color={COLOR["violet/400"]} />
          Provider Registration
        </ProviderRegistration>
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

const ProviderRegistration = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

const ProfilePicture = styled.div`
  font-size: 18px;
  width: 100%;
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
`;

export default ProviderProfileUpload;
