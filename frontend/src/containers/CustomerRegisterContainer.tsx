import styled from "styled-components";
import CustomerTermAndCondition from "../components/customer_register/CustomerTermAndCondition";
import CustomerRegisterForm from "../components/customer_register/CustomerRegisterForm";
import CustomerProfileUpload from "../components/customer_register/CustomerProfileUpload";

interface SliderProp {
  idx: number;
}

interface CustomerRegisterContainer {}
const CustomerRegisterContainer = ({
  userData,
  changeUserData,
  current,
  checked,
  callBack,
}: any) => {
  return (
    <Layout>
      <Slider idx={current}>
        <CustomerTermAndCondition checked={checked} callBack={callBack} />
        <CustomerRegisterForm
          userData={userData}
          changeUserData={changeUserData}
        />
        <CustomerProfileUpload />
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
  width: 300%;
  transform: ${(props) => `translateX(-${535 * props.idx}px)`};
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 540px) {
    transform: ${(props) => `translateX(-${450 * props.idx}px)`};
  }
  @media screen and (max-width: 320px) {
    transform: ${(props) => `translateX(-${280 * props.idx}px)`};
  } ;
`;

export default CustomerRegisterContainer;
