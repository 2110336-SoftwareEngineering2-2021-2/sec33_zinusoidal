import styled from "styled-components";
import { COLOR } from "../../CONSTANT";

import { MdRemoveRedEye } from "react-icons/md";

const ProviderRegistrationForm = () => {
  return (
    <Layout>
      <Padding>
        <ProviderRegistration>
          <MdRemoveRedEye color={COLOR["violet/400"]} />
          Provider Registration
        </ProviderRegistration>
        <Flex>
          <DoubleInput>
            <InputDiv>
              <FormLabel>Name</FormLabel>
              <Star>*</Star>
              <Forminput type="text" id="fname" name="fname" />
            </InputDiv>
            <InputDiv>
              <FormLabel>Surname</FormLabel>
              <Star>*</Star>
              <Forminput type="text" id="fname" name="fname" />
            </InputDiv>
          </DoubleInput>
          <InputDiv>
            <FormLabel>Email</FormLabel>
            <Star>*</Star>
            <Forminput type="text" id="fname" name="fname" />
          </InputDiv>
          <InputDiv>
            <FormLabel>CitizenID</FormLabel>
            <Star>*</Star>
            <Forminput type="text" id="fname" name="fname" />
          </InputDiv>
          <InputDiv>
            <FormLabel>Username</FormLabel>
            <Star>*</Star>
            <Forminput type="text" id="fname" name="fname" />
          </InputDiv>
          <DoubleInput>
            <InputDiv>
              <FormLabel>Password</FormLabel>
              <Star>*</Star>
              <Forminput type="password" id="fname" name="fname" />
            </InputDiv>
            <InputDiv>
              <FormLabel>Confirm Password</FormLabel>
              <Star>*</Star>
              <Forminput type="password" id="fname" name="fname" />
            </InputDiv>
          </DoubleInput>
          <BioDiv>
            <div>
              <FormLabel>BioGraphy</FormLabel>
              <Star>*</Star>
            </div>
            <Biotext id="fname" name="fname" style={{ height: 140 }} />
          </BioDiv>
        </Flex>
      </Padding>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  font-weight: bold;
  background-color: white;
`;
const Padding = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px 15px 0px 15px;
  display: flex;
  flex-direction: column;
`;
const Flex = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const ProviderRegistration = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
  font-size: 20px;
`;

const Star = styled.p`
  display: inline;
  color: ${COLOR["magenta/400"]};
`;

const InputDiv = styled.div`
  margin: 0px;
  width: 100%;
`;

const DoubleInput = styled.div`
  display: flex;
  column-gap: 15px;
`;

const FormLabel = styled.p`
  display: inline;
  margin: 0px;
  font-size: 16px;
`;
const Forminput = styled.input`
  padding-left: 5px;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  height: 32px;
  border-radius: 8px;
  border: solid #808080 1px;

  &:focus {
    outline: solid ${COLOR["magenta/100"]} 1px;
    border: solid ${COLOR["magenta/100"]} 1px;
  }
`;

const BioDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const Biotext = styled.textarea`
  padding: 5px;
  font-size: 16px;
  font-weight: bold;
  &:focus {
    outline: solid ${COLOR["magenta/100"]} 1px;
    border: solid ${COLOR["magenta/100"]} 1px;
  }
`;

export default ProviderRegistrationForm;
