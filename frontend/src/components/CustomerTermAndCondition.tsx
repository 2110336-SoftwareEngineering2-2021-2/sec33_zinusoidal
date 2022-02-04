import styled from "styled-components";
import { COLOR, TERMS } from "../CONSTANT";

const TermAndCondition = () => {
  return (
    <Layout>
      <Term>
        <TextDetail>
          <Header style={{ fontSize: "1.5vw"}}>Terms and Conditions</Header>
          <p style={{ fontSize: "0.9vw" }}>{TERMS}</p>
        </TextDetail>
        <TermFooter>
          <AgreeDiv>
            <CheckboxStyle type="checkbox" id="" name="" value="" />
            <AgreeText>I agree to the terms and conditions</AgreeText>
          </AgreeDiv>
        </TermFooter>
      </Term>
    </Layout>
  );
};
const Layout = styled.div`
  width: 100%;
  
`;
const Term = styled.div`
  width: 100%;
  height: 370px;
  padding: 15px;
  row-gap: 10px;
  background-color: white;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TermFooter = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    justify-content: center;
    align-content: center;
`;

const AgreeDiv = styled.div`
  align-self: center;
  display: flex;
  column-gap: 8px;
  align-items: center;
  text-align: center;
`;
const AgreeText = styled.div`

  font-size: 16px;
  font-family: baloo 2;
  font-weight: bold;
`;

const CheckboxStyle = styled.input`
  width: 24px;
  height: 24px;
`;

const TextDetail = styled.div`
  background-color: white;
  padding: 15px;
  margin: 0px;
`;
const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;
const NextButton = styled.button`
  align-self: center;

  border: none;
  width: 86px;
  height: 40px;
  background-color: ${COLOR["violet/400"]};
  text-decoration: none;
  color: #ffffff;
  border-radius: 10000px;
  font-family: Baloo 2;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  `;
export default TermAndCondition;
