import styled from "styled-components";
import AppointmentCalendar from "../components/appointment/AppointmentCalendar";
import AppointmentInfo from "../components/appointment/AppointmentInfo";

interface SliderProp {
  idx: number;
}

const AppointmentSlider1 = ({
  totalPrice,
  current,
  userInfo,
  profilePicUrl,
  day,
  setDay,
  appointmentList,
}: any) => {
  return (
    <Layout>
      <Slider idx={current}>
        <AppointmentCalendar
          userInfo={userInfo}
          profilePicUrl={profilePicUrl}
          day={day}
          setDay={setDay}
        />
        <AppointmentInfo
          totalPrice={totalPrice}
          appointmentList={appointmentList}
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
