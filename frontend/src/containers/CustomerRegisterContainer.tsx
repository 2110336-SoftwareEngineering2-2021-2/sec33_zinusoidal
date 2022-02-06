import styled from "styled-components";
import CustomerTermAndCondition from "../components/customer_register/CustomerTermAndCondition";
import CustomerRegisterForm from "../components/customer_register/CustomerRegisterForm";
import CustomerProfileUpload from "../components/customer_register/CustomerProfileUpload";

interface SliderProp {
  idx: number;
}

interface CustomerRegisterContainer {}
const CustomerRegisterContainer = ({ current, checked, callBack }: any) => {
  return (
    <Layout>
      <Slider idx={current}>
        <CustomerTermAndCondition checked={checked} callBack={callBack} />
        <CustomerRegisterForm />
        <CustomerProfileUpload />
      </Slider>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Slider = styled("div")<SliderProp>`
  width: 300%;
  transform: ${(props) => `translateX(-${535 * props.idx}px)`};
  display: flex;
  flex-direction: row;
`;

export default CustomerRegisterContainer;