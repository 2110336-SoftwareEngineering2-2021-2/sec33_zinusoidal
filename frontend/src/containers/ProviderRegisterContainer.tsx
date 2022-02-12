import styled from "styled-components";
import ProviderTermAndCondition from "../components/provider_register/ProviderTermAndCondition";
import ProviderRegisterForm from "../components/provider_register/ProviderRegisterForm";
import ProviderServieType from "../components/provider_register/ProviderServiceType";
import ProviderAvailableTime from "../components/provider_register/ProviderAvailableTime";

import ProviderProfileUpload from "../components/provider_register/ProviderProfileUpload";

interface SliderProp {
  idx: number;
}

interface ProviderRegisterContainer {}
const ProviderRegisterContainer = ({
  userData,
  changeUserData,
  service,
  setService,
  availableTime,
  setAvailableTime,
  current,
  checked,
  callBack,
}: any) => {
  return (
    <Layout>
      <Slider idx={current}>
        <ProviderTermAndCondition checked={checked} callBack={callBack} />
        <ProviderRegisterForm
          userData={userData}
          changeUserData={changeUserData}
        />
        <ProviderServieType service={service} setService={setService} />
        <ProviderAvailableTime
          availableTime={availableTime}
          setAvailableTime={setAvailableTime}
        />
        <ProviderProfileUpload />
      </Slider>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Slider = styled("div")<SliderProp>`
  width: 500%;
  transform: ${(props) => `translateX(-${535 * props.idx}px)`};
  display: flex;
  flex-direction: row;
  height: 584px;
  overflow-y: visible;
  justify-content: center;
  @media screen and (max-width: 540px) {
    transform: ${(props) => `translateX(-${350 * props.idx}px)`};
  } ;
`;

export default ProviderRegisterContainer;
