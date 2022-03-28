import styled from "styled-components";
import AppointmentComplete from "../components/appointment/AppointmentComplete";
import AppointmentConfirmation from "../components/appointment/AppointmentConfirmation";
import AppointmentInput from "../components/appointment/AppointmentInput";
import AppointmentOtherInfo from "../components/appointment/AppointmentOtherInfo";
interface SliderProp {
  idx: number;
}

const AppointmentSlider1 = ({
  a,
  setA,
  current,
  services,
  day,
  setCurrent,
  infoList,
  setInfoList,
  appointmentList,
  setAppointmentList,
  totalPrice,
  setTotalPrice,
  userInfo,
  setOpenOneAppointmentError,
  providerID,
  selected,
  setSelected,
}: any) => {
  return (
    <Layout>
      <Slider idx={current}>
        <AppointmentInput
          setSelected={setSelected}
          selected={selected}
          userInfo={userInfo}
          a={a}
          setA={setA}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          appointmentList={appointmentList}
          setAppointmentList={setAppointmentList}
          current={current}
          day={day}
          services={services}
          setCurrent={setCurrent}
        />
        <AppointmentOtherInfo
          setOpenOneAppointmentError={setOpenOneAppointmentError}
          current={current}
          setCurrent={setCurrent}
          infoList={infoList}
          setInfoList={setInfoList}
        />
        <AppointmentConfirmation
          day={day}
          providerID={providerID}
          userInfo={userInfo}
          current={current}
          setCurrent={setCurrent}
          infoList={infoList}
          appointmentList={appointmentList}
          totalPrice={totalPrice}
        />
        <AppointmentComplete />
      </Slider>
    </Layout>
  );
};

const Layout = styled.div`
  width: 536px;
  overflow-y: auto;
  overflow-x: hidden;
  p {
    margin-left: initial;
  }
  @media screen and (max-width: 1100px) {
    position: absolute;
  }
  @media screen and (max-width: 540px) {
    width: 300px;
  } ;
`;

const Slider = styled("div")<SliderProp>`
  width: 400%;
  transform: ${(props) => `translateX(-${536 * props.idx}px)`};
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 540px) {
    transform: ${(props) => `translateX(-${300 * props.idx}px)`};
  } ;
`;

export default AppointmentSlider1;
