import styled from "styled-components";
import AppointmentCalendar from "../components/appointment/AppointmentCalendar";
import AppointmentInfo from "../components/appointment/AppointmentInfo";

interface SliderProp {
  idx: number;
}

const AppointmentSlider1 = ({
  availableTime,
  setTotalPrice,
  totalPrice,
  current,
  userInfo,
  profilePicUrl,
  day,
  setDay,
  appointmentList,
  setAppointmentList,
  a,
  setA,
  openOneAppointmentError,
  setOpenOneAppointmentError,
}: any) => {
  return (
    <Layout>
      <Slider idx={current}>
        <AppointmentCalendar
          availableTime={availableTime}
          userInfo={userInfo}
          profilePicUrl={profilePicUrl}
          day={day}
          setDay={setDay}
        />
        <AppointmentInfo
          a={a}
          setA={setA}
          userInfo={userInfo}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          appointmentList={appointmentList}
          setAppointmentList={setAppointmentList}
          openOneAppointmentError={openOneAppointmentError}
          setOpenOneAppointmentError={setOpenOneAppointmentError}
        />
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
  width: 200%;
  transform: ${(props) => `translateX(-${536 * props.idx}px)`};
  display: flex;
  flex-direction: row;
`;

export default AppointmentSlider1;
