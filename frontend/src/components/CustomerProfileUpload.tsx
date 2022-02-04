import styled from "styled-components";
import { COLOR } from "../CONSTANT";

import { BsPeopleFill } from "react-icons/bs";
import { AiOutlineUpload } from "react-icons/ai";

// const wrapperref = useref(null);

const CustomerProfileUpload = () => {
  return (
    <Layout>
        <Padding>
          <CustomerRegistration>
            <BsPeopleFill color='#a44cd7'/>
            Customer Registration
          </CustomerRegistration>
          <ProfilePicture>Profile Picture</ProfilePicture>
          <Flex>
            <img src="???" alt="" style={{width:96,height:96,borderRadius:10000}}/>
            {/* <input type="file" style={{display:"none"}} ref={}/> */}
            <Button>Upload<AiOutlineUpload/></Button>
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
  padding: 15px;
  display: flex;
  flex-direction: column;
`;
const Flex = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  row-gap: 25px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CustomerRegistration = styled.div`
display: flex;
align-items: center;
column-gap: 5px;
  font-size: 20px;
`;

const ProfilePicture = styled.div`
  font-size: 18px;
  width: 100%;

`;

const Button = styled.div`
  align-self: center;

  border: none;
  width: 97px;
  background-color: ${COLOR["violet/400"]};
  text-decoration: none;
  color: #ffffff;
  border-radius: 10000px;
  font-family: Baloo 2;
  font-size: 16px;
  font-weight: normal;
  display: flex;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
`;



export default CustomerProfileUpload;
