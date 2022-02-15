import styled from "styled-components";
import CustomerTermAndCondition from "../components/customer_register/CustomerTermAndCondition";
import CustomerRegisterForm from "../components/customer_register/CustomerRegisterForm";
import CustomerProfileUpload from "../components/customer_register/CustomerProfileUpload";
import CustomerRegisterComplete from "../components/customer_register/CustomerRegisterComplete";

interface SliderProp {
  idx: number;
}

interface CustomerRegisterContainer {}
const CustomerRegisterContainer = ({
  emailError,
  setEmailError,
  usernameError,
  setUsernameError,
  openPasswordError,
  setOpenPasswordError,
  samePassword,
  setSamePassword,
  userData,
  changeUserData,
  profilePicUrl,
  setProfilePicUrl,
  current,
  checked,
  callBack,
}: any) => {
  return (
    <Layout>
      <Slider idx={current}>
        <CustomerTermAndCondition checked={checked} callBack={callBack} />
        <CustomerRegisterForm
          emailError={emailError}
          setEmailError={setEmailError}
          usernameError={usernameError}
          setUsernameError={setUsernameError}
          userData={userData}
          changeUserData={changeUserData}
          samePassword={samePassword}
          setSamePassword={setSamePassword}
          openPasswordError={openPasswordError}
          setOpenPasswordError={setOpenPasswordError}
        />
        <CustomerProfileUpload
          profilePicUrl={profilePicUrl}
          setProfilePicUrl={setProfilePicUrl}
        />
        <CustomerRegisterComplete />
      </Slider>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  overflow-y: scroll;
  p {
    margin-left: initial;
  }
`;

const Slider = styled("div")<SliderProp>`
  width: 400%;
  transform: ${(props) => `translateX(-${535 * props.idx}px)`};
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 540px) {
    transform: ${(props) => `translateX(-${450 * props.idx}px)`};
  }
  @media screen and (max-width: 450px) {
    transform: ${(props) => `translateX(-${300 * props.idx}px)`};
  } ;
`;

export default CustomerRegisterContainer;
