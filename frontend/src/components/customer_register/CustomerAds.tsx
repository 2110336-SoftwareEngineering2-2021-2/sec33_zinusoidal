import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { FiCheckCircle } from "react-icons/fi";
const logo = require("../../assets/CustomerRegister.png");

const CustomerAds = () => {
  return (
    <Layout>
      <div>
        <Ads>
          <Header>Why you should chose us</Header>
          <Bullet>
            <FiCheckCircle color={COLOR["green/600"]} size={12} />
            <Ad>Easy to use and match your styles</Ad>
          </Bullet>
          <Bullet>
            <FiCheckCircle color={COLOR["green/600"]} size={12} />
            <Ad>Match your freetime to book your appointment</Ad>
          </Bullet>
          <Bullet>
            <FiCheckCircle color={COLOR["green/600"]} size={12} />
            <Ad>Find match your budget fortune-teller</Ad>
          </Bullet>
          <Bullet>
            <FiCheckCircle color={COLOR["green/600"]} size={12} />
            <Ad>Guaruntees payment with transparent transaction</Ad>
          </Bullet>
        </Ads>
        <RightTriangle></RightTriangle>
      </div>
      <CustomerRegisterImage src={logo} alt="" />
    </Layout>
  );
};

const Layout = styled.div`
  margin-top: 108px;
  display: flex;
  flex-direction: row;
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
  width: 523px;
  height: 829px;
`;

export default CustomerAds;
