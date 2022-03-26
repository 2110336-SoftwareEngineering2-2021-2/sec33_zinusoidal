import styled from "styled-components";
import AppointmentCalendar from "../components/appointment/AppointmentCalendar";
import AppointmentInfo from "../components/appointment/AppointmentInfo";

interface SliderProp {
  idx: number;
}
type PropType = {
  selected: boolean;
};

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
  availableDay,
  notAvailableDay,
  availableDayAndTime,
  setSelected,
  selected,
  getAvailableTime,
  setInfoList,
}: any) => {
  return (
    <Layout selected={selected}>
      <Slider idx={current}>
        <AppointmentCalendar
          setInfoList={setInfoList}
          getAvailableTime={getAvailableTime}
          selected={selected}
          setSelected={setSelected}
          availableDayAndTime={availableDayAndTime}
          availableDay={availableDay}
          notAvailableDay={notAvailableDay}
          setA={setA}
          availableTime={availableTime}
          userInfo={userInfo}
          profilePicUrl={profilePicUrl}
          day={day}
          setDay={setDay}
          setTotalPrice={setTotalPrice}
          setAppointmentList={setAppointmentList}
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

const Layout = styled("div")<PropType>`
  width: 536px;
  overflow-y: auto;
  overflow-x: hidden;

  p {
    margin-left: initial;
  }
  @media screen and (max-width: 1100px) {
    z-index: ${(props) => (props.selected ? -1 : 1)};
  }
  @media screen and (max-width: 540px) {
    width: 300px;
  } ;
`;

const Slider = styled("div")<SliderProp>`
  width: 200%;
  transform: ${(props) => `translateX(-${536 * props.idx}px)`};
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 540px) {
    transform: ${(props) => `translateX(-${300 * props.idx}px)`};
  } ;
`;

export default AppointmentSlider1;
