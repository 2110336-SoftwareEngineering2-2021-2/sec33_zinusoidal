import { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import ProfileEditContainer from "../../containers/ProfileEditContainer";
import axios from "axios";

import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { BsSave2 } from "react-icons/bs";
import { UserContext } from "../../context/UserContext";

const EditProfile = () => {
  const { user } = useContext(UserContext);
  console.log("USER", user);
  const getProfile = () => {
    axios({
      method: "get",
      url: `http://ec2-13-229-67-156.ap-southeast-1.compute.amazonaws.com:1323/api/fortune168/v1/provider/${user.user_id}`,
      data: {},
    })
      .then(function (response) {
        setUserInput({ ...userInput, Username: response.data.username });
        setUserInput({ ...userInput, Name: response.data.firstName });
        setUserInput({ ...userInput, Surname: response.data.lastName });
        setUserInput({ ...userInput, Email: response.data.email });
        setUserInput({ ...userInput, Biography: response.data.biography });
        setAvailableTime(response.data.workSchedule);
        setService(response.data.fortuneList);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  };
  const [current, setCurrent] = useState(0);
  const [userInput, setUserInput] = useState({
    Name: "",
    Surname: "",
    Email: "",
    Username: "",
    Password: "",
    Biography: "",
  });
  // const UpdateProfile = () => {
  //   axios({
  //     method: "patch",
  //     url: `http://ec2-13-229-67-156.ap-southeast-1.compute.amazonaws.com:1323/api/fortune168/v1/provider_edit`,
  //     data: {

  //     },
  //   })
  //     .then(function (response) {
  //       setUserInput({ ...userInput, Username: response.data.username });
  //       setUserInput({ ...userInput, Name: response.data.firstName });
  //       setUserInput({ ...userInput, Surname: response.data.lastName });
  //       setUserInput({ ...userInput, Email: response.data.email });
  //       setUserInput({ ...userInput, Biography: response.data.biography });
  //       setAvailableTime(response.data.workSchedule);
  //       setService(response.data.fortuneList);
  //     })
  //     .catch(function (error) {
  //       console.log(error.response.data.message);
  //     });
  // };
  const [service, setService] = useState([]);
  const [availableTime, setAvailableTime] = useState([
    { day: "Sunday", timeList: [] },
    { day: "Monday", timeList: [] },
    { day: "Tuesday", timeList: [] },
    { day: "Wednesday", timeList: [] },
    { day: "Thursday", timeList: [] },
    { day: "Friday", timeList: [] },
    { day: "Saturday", timeList: [] },
  ]);
  console.log(userInput);
  console.log(service);
  console.log(availableTime);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Layout>
      <Flex>
        <ArrowDiv>
          <MdOutlineNavigateBefore
            style={{ cursor: "pointer" }}
            visibility={current == 0 ? "hidden" : "visible"}
            color={COLOR["violet/400"]}
            size={100}
            onClick={() => {
              setCurrent(Math.max(0, current - 1));
            }}
          />
        </ArrowDiv>
        <InputSection>
          <Header>
            <Circle>
              <InnerCircle></InnerCircle>
            </Circle>
          </Header>
          <Form>
            <ProfileEditContainer
              userData={userInput}
              changeUserData={setUserInput}
              current={current}
              service={service}
              setService={setService}
              availableTime={availableTime}
              setAvailableTime={setAvailableTime}
            />
          </Form>
        </InputSection>
        <ArrowDiv>
          <MdOutlineNavigateNext
            style={{ cursor: "pointer" }}
            visibility={current == 2 ? "hidden" : "visible"}
            color={COLOR["violet/400"]}
            size={100}
            onClick={() => {
              setCurrent(Math.min(2, current + 1));
            }}
          />
        </ArrowDiv>
      </Flex>
      <ButtonDiv>
        <SmallNavigate>
          <MdOutlineNavigateBefore
            style={{ cursor: "pointer" }}
            visibility={current == 0 ? "hidden" : "visible"}
            color={COLOR["violet/400"]}
            size={50}
            onClick={() => {
              setCurrent(Math.max(0, current - 1));
            }}
          />
        </SmallNavigate>
        <Button>
          {" "}
          Save
          <BsSave2 size={16} style={{ marginLeft: 4 }} />
        </Button>
        <SmallNavigate>
          <MdOutlineNavigateNext
            style={{ cursor: "pointer" }}
            visibility={current == 2 ? "hidden" : "visible"}
            color={COLOR["violet/400"]}
            size={50}
            onClick={() => {
              setCurrent(Math.min(2, current + 1));
            }}
          />
        </SmallNavigate>
      </ButtonDiv>
    </Layout>
  );
};
const Layout = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const InputSection = styled.div`
  width: 535px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 540px) {
    width: 450px;
  }
  @media screen and (max-width: 450px) {
    width: 300px;
  } ;
`;
const Header = styled.div`
  width: 100%;
  height: 95px;
  border-radius: 20px 20px 0px 0px;
  background-color: ${COLOR["violet/400"]};
  display: flex;
  justify-content: center;
`;
const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Circle = styled.div`
  width: 70px;
  height: 70px;
  background-color: ${COLOR["violet/400"]};
  border-radius: 10000px;
  margin-top: -35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerCircle = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${COLOR["magenta/100"]};
  border-radius: 10000px;
`;
const ArrowDiv = styled.div`
  @media screen and (max-width: 750px) {
    display: none;
  }
`;
const SmallNavigate = styled.div`
  @media screen and (min-width: 751px) {
    display: none;
  }
`;
const Form = styled.div`
  width: 100%;
`;
const ButtonDiv = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  cursor: pointer;
  border: none;
  width: 86px;
  height: 40px;
  background-color: ${COLOR["violet/400"]};
  text-decoration: none;
  color: white;
  border-radius: 10000px;
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  :hover {
    background-color: ${COLOR["violet/500"]} !important ;
  }
`;
export default EditProfile;
