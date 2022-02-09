import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { FiCheckCircle } from "react-icons/fi";
const logo = require("../../assets/ProviderRegister.png");

const ProviderAds = () => {
  return (
    <Layout>
      <ProviderAdsDiv>
        <Ads>
          <Header>Why you should chose us</Header>
          <Bullet>
            <FiCheckCircle color={COLOR["green/600"]} size={12} />
            <Ad>Easy to manage your schedule</Ad>
          </Bullet>
          <Bullet>
            <FiCheckCircle color={COLOR["green/600"]} size={12} />
            <Ad>On-demand self accepted appointment</Ad>
          </Bullet>
          <Bullet>
            <FiCheckCircle color={COLOR["green/600"]} size={12} />
            <Ad>Create your own services and price rate</Ad>
          </Bullet>
          <Bullet>
            <FiCheckCircle color={COLOR["green/600"]} size={12} />
            <Ad>Guaruntees payment with booking fees and services fees</Ad>
          </Bullet>
        </Ads>
        <RightTriangle></RightTriangle>
      </ProviderAdsDiv>
      <CustomerRegisterImage src={logo} alt="" />
    </Layout>
  );
};

const Layout = styled.div`
  position: relative;
  margin-top: auto;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 1300px) {
    margin-top: 50px;
  }
  @media screen and (max-width: 540px) {
    display: none;
  } ;
`;

const ProviderAdsDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0px;
  @media screen and (max-width: 1300px) {
    position: relative;
  } ;
`;
const Ads = styled.div`
  background-color: #f3f4c1;
  border-radius: 20px;
  width: fit-content;
  display: flex;
  padding: 15px 15px 15px 15px;
  flex-direction: column;
  font-weight: bold;
  row-gap: 16px;
  height: 325px;
  justify-content: space-evenly;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25);
`;
const Ad = styled.p`
  font-size: 14px;
`;

const Header = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${COLOR["blue/400"]};
  text-align: center;
`;
const RightTriangle = styled.div`
  width: 0;
  height: 0;
  border-top: 50px solid #f3f4c1;
  border-left: 50px solid transparent;
  margin-left: 65%;
`;
const Bullet = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
`;

const CustomerRegisterImage = styled.img`
  padding: 0px;
  width: 736px;
  height: 918px;
  @media screen and (max-width: 1300px) {
    display: none;
  } ;
`;

export default ProviderAds;
