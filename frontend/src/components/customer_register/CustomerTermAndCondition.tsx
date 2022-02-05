import styled from "styled-components";
import { COLOR, TERMS } from "../../CONSTANT";

import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
const TermAndCondition = ({ checked, callBack }: any) => {
  return (
    <Layout>
      <Term>
        <TextDetail>
          <Header style={{ fontSize: "1.5vw" }}>Terms and Conditions</Header>
          <p style={{ fontSize: "0.9vw" }}>{TERMS}</p>
        </TextDetail>
        <TermFooter>
          <AgreeDiv>
            {checked ? (
              <ImCheckboxChecked size={24} onClick={callBack} />
            ) : (
              <ImCheckboxUnchecked size={24} onClick={callBack} />
            )}
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
  justify-content: center;
  align-content: center;
  row-gap: 10px;
`;

const AgreeDiv = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  text-align: center;
  column-gap: 8px;
`;
const AgreeText = styled.div`
  font-size: 16px;
  font-weight: bold;
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
export default TermAndCondition;
