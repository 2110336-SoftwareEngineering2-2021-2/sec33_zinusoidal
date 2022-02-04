import styled from "styled-components";
import { COLOR } from "../CONSTANT";

import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";

const ProviderRegistrationForm = () => {
  return (
    <Layout>
      <Header>
        <Circle><InnerCircle></InnerCircle></Circle>
      </Header>
      <Form>
        <CustomerRegistration>Provider Registrarion</CustomerRegistration>
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
        <BioDiv>
            <div>
              <FormLabel>BioGraphy</FormLabel><Star>*</Star>
            </div>
            <Biotext id="fname" name="fname" style={{height : 140}}/>
        </BioDiv>
        <ButtonDiv>
          <Button><MdOutlineNavigateBefore/>Back</Button>
          <Button>Next <MdOutlineNavigateNext/></Button>
        </ButtonDiv>
      </Form>
      
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 535px;
  position: absolute;
  left: 131px;
  top: 164px;
  font-family: Baloo 2;
  font-weight: bold;
`;

const CustomerRegistration = styled.div`
  font-size: 20px;
`;

const Header = styled.div`
  height: 95;
  border-radius: 20px 20px 0px 0px;
  background-color: ${COLOR["violet/400"]};
  width: 100%;
  height: 95px;
`;

const Circle = styled.div`
  width: 70px;
  height: 70px;
  background-color: ${COLOR["violet/400"]};
  border-radius: 10000px;
  position: relative;
  left: 232.5px;
  top: -30px;
`;

const InnerCircle = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${COLOR["magenta/100"]};
  border-radius: 10000px;
  position: relative;
  left: 23px;
  top: 23px;
`;

const Star = styled.p`
  display: inline;
  color: ${COLOR["magenta/400"]};
`;
const Form = styled.div`
  height: 596px;
  display: flex;
  flex-direction: column;
  row-gap: 7px;
  padding:15px;
  width:100%;
  background-color: #ffffff;
  border-radius: 0px 0px 20px 20px;

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
    outline:solid ${COLOR["magenta/100"]} 1px;
    border:solid ${COLOR["magenta/100"]} 1px;
  }
`;

const BioDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const Biotext = styled.textarea`
  padding:5px;
  font-size: 16px;
  font-family: Baloo 2;
  font-weight: bold;
  &:focus {
    outline:solid ${COLOR["magenta/100"]} 1px;
    border:solid ${COLOR["magenta/100"]} 1px;
  }
`;

const ButtonDiv = styled.div`
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
export default ProviderRegistrationForm;
