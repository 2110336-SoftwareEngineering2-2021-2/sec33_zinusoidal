import styled from "styled-components";
import { COLOR} from "../CONSTANT";
import { BsPeopleFill } from "react-icons/bs";
const CustomerRegistrationForm = () => {
  return (
    <Layout>
        <Padding>
          <CustomerRegistration>
            <BsPeopleFill color='#a44cd7'/>
            Customer Registration
          </CustomerRegistration>
          <Flex>
            <DoubleInput>
              <InputDiv>
                <FormLabel>Name</FormLabel><Star>*</Star>
                <Forminput type="text" id="fname" name="fname" />
              </InputDiv>
              <InputDiv>
                <FormLabel>Surname</FormLabel><Star>*</Star>
                <Forminput type="text" id="fname" name="fname" />
              </InputDiv>
            </DoubleInput>
            <InputDiv>
                <FormLabel>Email</FormLabel><Star>*</Star>
                <Forminput type="text" id="fname" name="fname" />
              </InputDiv>
              <InputDiv>
                <FormLabel>CitizenID</FormLabel><Star>*</Star>
                <Forminput type="text" id="fname" name="fname" />
              </InputDiv>
              <InputDiv>
                <FormLabel>Username</FormLabel><Star>*</Star>
                <Forminput type="text" id="fname" name="fname" />
              </InputDiv>
            <DoubleInput>
              <InputDiv>
                <FormLabel>Password</FormLabel><Star>*</Star>
                <Forminput type="password" id="fname" name="fname" />
              </InputDiv>
              <InputDiv>
                <FormLabel>Confirm Password</FormLabel><Star>*</Star>
                <Forminput type="password" id="fname" name="fname" />
              </InputDiv>
            </DoubleInput>
          </Flex>
        </Padding>
    </Layout>
  );
};

const Layout = styled.div`
  width:100%;
  background-color: #ffffff;
  font-weight: bold;
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
const CustomerRegistration = styled.div`
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
  padding-left:5px;
  font-size: 16px;
  font-family: Baloo 2;
  font-weight: bold;
  width: 100%;
  height: 32px;
  border-radius: 8px;
  border:solid #808080 1px;
  &:focus {
    outline:solid ${COLOR["blue/300"]} 1px;
    border:solid ${COLOR["blue/300"]} 1px;
  }
`;

const ButtonDiv = styled.div`
  padding: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.div`
  align-self: center;

  border: none;
  width: 86px;
  background-color: ${COLOR["violet/400"]};
  text-decoration: none;
  color: #ffffff;
  border-radius: 10000px;
  font-family: Baloo 2;
  font-size: 16px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default CustomerRegistrationForm;
