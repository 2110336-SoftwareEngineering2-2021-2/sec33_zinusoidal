import styled from "styled-components";
import AppointmentComplete from "../components/appointment/AppointmentComplete";
import AppointmentConfirmation from "../components/appointment/AppointmentConfirmation";
import AppointmentInput from "../components/appointment/AppointmentInput";
import AppointmentOtherInfo from "../components/appointment/AppointmentOtherInfo";
interface SliderProp {
  idx: number;
}

const AppointmentSlider1 = ({
  current,
  services,
  day,
  setCurrent,
  infoList,
  setInfoList,
  appointmentList,
  setAppointmentList,
}: any) => {
  return (
    <Layout>
      <Slider idx={current}>
        <AppointmentInput
          appointmentList={appointmentList}
          setAppoinmentList={setAppointmentList}
          current={current}
          day={day}
          services={services}
          setCurrent={setCurrent}
        />
        <AppointmentOtherInfo
          current={current}
          setCurrent={setCurrent}
          infoList={infoList}
          setInfoList={setInfoList}
        />
        <AppointmentConfirmation
          current={current}
          setCurrent={setCurrent}
          infoList={infoList}
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
`;

const Slider = styled("div")<SliderProp>`
  width: 400%;
  transform: ${(props) => `translateX(-${536 * props.idx}px)`};
  display: flex;
  flex-direction: row;
`;

export default AppointmentSlider1;
