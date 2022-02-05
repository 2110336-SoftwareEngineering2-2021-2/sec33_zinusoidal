import styled from "styled-components";
import CustomerTermAndCondition from "../components/CustomerTermAndCondition";
import CustomerRegisterForm from "../components/CustomerRegisterForm";
import CustomerProfileUpload from "../components/CustomerProfileUpload";

interface SliderProp {
  idx: number;
}

interface ProfileEditContainer {}
const CustomerRegisterContainer = ({  current }: any) => {
  return (
    <Layout>
      <Slider idx={current}>
        <CustomerTermAndCondition />
        <CustomerRegisterForm />
        <CustomerProfileUpload />
      </Slider>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  overflow: hidden;

  /* background-color: red; */
`;

const Slider = styled("div")<SliderProp>`
  width: 300%;
  /* background-color: green; */
  transform: ${(props) => `translateX(-${535 * props.idx}px)`};
  display: flex;
  flex-direction: row;
  transition: transform none 0.3s;
`;

export default CustomerRegisterContainer;