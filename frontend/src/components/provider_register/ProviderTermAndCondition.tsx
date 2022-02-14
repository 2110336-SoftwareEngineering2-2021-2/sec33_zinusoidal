import styled from "styled-components";
import { COLOR, TERMS } from "../../CONSTANT";

import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
const TermAndCondition = ({ checked, callBack }: any) => {
  return (
    <Layout>
      <Term>
        <TextDetail>
          <Header>Terms and Conditions</Header>
          <p>{TERMS}</p>
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
  height: 100%;
  padding: 15px;
  row-gap: 10px;
  background-color: white;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 320px) {
    padding: 0;
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
  @media screen and (max-width: 320px) {
    flex-direction: column;
    column-gap: 0px;
  } ;
`;
const AgreeText = styled.div`
  font-size: 16px;
  font-family: baloo 2;
  font-weight: bold;
`;

const TextDetail = styled.div`
  background-color: white;
  padding: 15px;
  margin: 0px;
  @media screen and (max-width: 320px) {
    padding: 4px;
  } ;
`;
const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export default TermAndCondition;
