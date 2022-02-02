import React, { useState } from "react";
import Block from "../components/Block";
import { COLOR } from "../CONSTANT";
import styled from "styled-components";
import { AiOutlineArrowRight } from "react-icons/ai";
const Bg1 = require("../assets/landingBg.png");
const Bg2 = require("../assets/landingBg2.png");
const Bg3 = require("../assets/landingBg3.png");

const LandingPage = () => {
  const [number, setNumber] = useState(0);

  const increment = () => {
    setNumber((prevNumber: number): number => prevNumber + 1);
  };
  return (
    <>
      <Layout>
        <img
          src={Bg1}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        />
        <AboutInfo>
          <HeaderText>
            <span>FORTUNE</span> 168
          </HeaderText>
          <HeaderDescription>
            sfsdfksdjfskdfsdfsdfsdfsfdsfsdfsdfsdsdsdfsdfsdfssdsdsdsfsdfsdffffffadasdsadasdas
          </HeaderDescription>
          <Button>
            Button
            <AiOutlineArrowRight />
          </Button>
        </AboutInfo>
        <div style={{ flex: 1, background: "transparent" }}></div>
      </Layout>
      <Layout2>
        <img
          src={Bg2}
          style={{
            position: "absolute",
            left: "7rem",
            top: 0,
            width: "100%",
            height: "100%",
          }}
          alt="img2"
        />
        <MiddleDescription>
          <MiddleText>
            ajasdhkashdjahsdjadasdasdashjkdajdhkasjdhkadsadasbdkajdhjadkadasd
            asdashdkajsdjaksjdadadadsadalsdajsdlaskdjadsa
          </MiddleText>
        </MiddleDescription>
      </Layout2>
      <Layout3>
        <EndDescription>
          <EndText>
            dasjdghasgdjagdhagjdshgdajdsd sadasmdhasdjkagsdhgajsdhagsdjhadsada
            sdasjdhajsdkasjdhakdhjskahdjakdjasdad
            asdjahsdkjaskdjahskdjahsdkjasdhkjadsad
            asdaksdjhasdjkasdhjadkajshdkasd
            asdasjdhajshdkajhsdkjasdhkjashdjkdhads
          </EndText>
        </EndDescription>
        <div
          style={{
            flex: 1,
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={Bg3}
            style={{
              position: "absolute",
              width: "100%",
              top: -200,
              bottom: 0,
              right: 0,
              left: 0,
            }}
          />
        </div>
      </Layout3>
    </>
  );
};

const Layout = styled.div`
  background: ${COLOR["violet/100"]};
  flex: 1;
  width: auto;
  height: 600px;
  margin: 4rem 10rem 0rem 10rem;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const AboutInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  margin-left: 40px;
  flex: 1;
  z-index: 1;
`;

const HeaderText = styled.h1`
  font-size: 64px;
  line-height: 101px;
  font-weight: bold;
  color: white;

  span {
    color: ${COLOR["violet/500"]};
  }
`;

const HeaderDescription = styled.p`
  font-size: 28px;
  line-height: 44px;
  width: 100%;
  word-break: break-all;
`;

const Button = styled.button`
  text-align: center;
  background: ${COLOR["violet/400"]};
  border-radius: 10000px;
  font-size: 20px;
  line-height: 100%;
  color: white;
  height: 40px;
  width: 120px;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 10px;
`;

const Layout2 = styled.div`
  width: auto;
  overflow-x: hidden;
  height: 700px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const MiddleDescription = styled.div`
  width: 387px;
  height: 387px;
  background: ${COLOR["aqua/50"]};
  margin-right: 10rem;
  margin-bottom: 10rem;
  box-shadow: 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  padding: 4rem 4rem;
  z-index: 1;
`;

const MiddleText = styled.p`
  font-size: 24px;
  line-height: 38px;
  word-break: break-all;
`;
const Layout3 = styled.div`
  flex: 1;
  width: auto;
  height: 600px;
  margin: 4rem 10rem 0rem 10rem;
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: flex-start;
`;

const EndDescription = styled.div`
  flex: 1;
  max-width: 50%;
`;

const EndText = styled.p`
  font-size: 24px;
  line-height: 38px;
  text-align: center;
`;
export default LandingPage;
