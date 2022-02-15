import styled from "styled-components";
import ProviderTermAndCondition from "../components/provider_register/ProviderTermAndCondition";
import ProviderRegisterForm from "../components/provider_register/ProviderRegisterForm";
import ProviderServieType from "../components/provider_register/ProviderServiceType";
import ProviderAvailableTime from "../components/provider_register/ProviderAvailableTime";

import ProviderProfileUpload from "../components/provider_register/ProviderProfileUpload";
import ProviderRegisterComplete from "../components/customer_register/CustomerRegisterComplete";
interface SliderProp {
  idx: number;
}

interface ProviderRegisterContainer {}
const ProviderRegisterContainer = ({
  userData,
  changeUserData,
  openPasswordError,
  setOpenPasswordError,
  samePassword,
  setSamePassword,
  emailError,
  setEmailError,
  usernameError,
  setUsernameError,
  service,
  setService,
  availableTime,
  setAvailableTime,
  profilePicUrl,
  setProfilePicUrl,
  current,
  checked,
  callBack,
}: any) => {
  return (
    <Layout>
      <Slider idx={current}>
        <ProviderTermAndCondition checked={checked} callBack={callBack} />
        <ProviderRegisterForm
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
        <ProviderServieType service={service} setService={setService} />
        <ProviderAvailableTime
          availableTime={availableTime}
          setAvailableTime={setAvailableTime}
        />
        <ProviderProfileUpload
          profilePicUrl={profilePicUrl}
          setProfilePicUrl={setProfilePicUrl}
        />
        <ProviderRegisterComplete />
      </Slider>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Slider = styled("div")<SliderProp>`
  width: 600%;
  transform: ${(props) => `translateX(-${535 * props.idx}px)`};
  display: flex;
  flex-direction: row;
  height: 584px;
  overflow-y: visible;
  justify-content: center;
  @media screen and (max-width: 540px) {
    transform: ${(props) => `translateX(-${450 * props.idx}px)`};
  }
  @media screen and (max-width: 450px) {
    transform: ${(props) => `translateX(-${300 * props.idx}px)`};
  } ;
`;

export default ProviderRegisterContainer;
