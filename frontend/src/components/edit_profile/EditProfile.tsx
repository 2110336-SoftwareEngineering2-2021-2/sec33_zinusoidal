import { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import ProfileEditContainer from "../../containers/ProfileEditContainer";
import axios from "axios";

import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { BsSave2 } from "react-icons/bs";
import { UserContext } from "../../context/UserContext";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const bgImg = require("../../assets/edit.png");
const bgImg2 = require("../../assets/edit2.png");
const bgImg3 = require("../../assets/edit3.png");

const cookies = new Cookies();
//prettier-ignore
const workTime = (availableTime: any) => {
  let workTime = [];
  workTime.push({day:"Sunday",timeList:availableTime.filter((date:any)=>date.day=="Sunday")[0].timeList});
  workTime.push({day:"Monday",timeList:availableTime.filter((date:any)=>date.day=="Monday")[0].timeList});
  workTime.push({day:"Tuesday",timeList:availableTime.filter((date:any)=>date.day=="Tuesday")[0].timeList});
  workTime.push({day:"Wednesday",timeList:availableTime.filter((date:any)=>date.day=="Wednesday")[0].timeList});
  workTime.push({day:"Thursday",timeList:availableTime.filter((date:any)=>date.day=="Thursday")[0].timeList});
  workTime.push({day:"Friday",timeList:availableTime.filter((date:any)=>date.day=="Friday")[0].timeList});
  workTime.push({day:"Saturday",timeList:availableTime.filter((date:any)=>date.day=="Saturday")[0].timeList});
  return workTime;
};
const EditProfile = () => {
  const user = cookies.get("user");
  let navigate = useNavigate();
  let responseInput = {
    Name: "",
    Surname: "",
    Email: "",
    Username: "",
    Password: "",
    Biography: "",
  };
  const getProfile = () => {
    axios({
      method: "get",
      url: `https://ec2-13-229-67-156.ap-southeast-1.compute.amazonaws.com/api/fortune168/v1/provider/${user?.user_id}`,
      data: {},
    })
      .then(function (response) {
        console.log("DATA", response.data);
        responseInput.Name = response.data.firstName;
        responseInput.Surname = response.data.lastName;
        responseInput.Email = response.data.email;
        responseInput.Username = response.data.username;
        responseInput.Biography = response.data.biography;
        setUserInput(responseInput);
        setAvailableTime(response.data.workSchedule);
        setService(response.data.fortuneList);
        setGetProfilePicUrl(response.data.profilePicUrl);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  };

  useEffect(() => {
    if (typeof user == "undefined") {
      navigate(`/`);
      alert("You must be logged in");
    }
  }, []);

  const [current, setCurrent] = useState(0);
  const [userInput, setUserInput] = useState({
    Name: "",
    Surname: "",
    Email: "",
    Username: "",
    Password: "",
    Biography: "",
  });

  const [getProfilePicUrl, setGetProfilePicUrl] = useState(null as any);
  const [profilePicUrl, setProfilePicUrl] = useState(null as any);

  const updateProfile = () => {
    var providerInput = new FormData();
    if (profilePicUrl != null) {
      providerInput.append("profilePic", profilePicUrl);
    }
    providerInput.append("username", userInput.Username);
    providerInput.append("firstName", userInput.Name);
    providerInput.append("lastName", userInput.Surname);
    providerInput.append("biography", userInput.Biography);
    providerInput.append("fortuneList", JSON.stringify(service));
    providerInput.append(
      "workSchedule",
      JSON.stringify(workTime(availableTime))
    );
    providerInput.append("schedule", JSON.stringify(workTime(availableTime)));
    axios({
      method: "patch",
      url: `https://ec2-13-229-67-156.ap-southeast-1.compute.amazonaws.com/api/fortune168/v1/provider_edit`,
      data: providerInput,
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(function (response) {
        responseInput.Name = response.data.firstName;
        responseInput.Surname = response.data.lastName;
        responseInput.Username = response.data.username;
        responseInput.Biography = response.data.biography;

        setUserInput(responseInput);
        setGetProfilePicUrl(response.data.profilePicUrl);
        setProfilePicUrl(null);
        setAvailableTime(response.data.workSchedule);
        setService(response.data.fortuneList);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

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
              profilePicUrl={profilePicUrl}
              setProfilePicUrl={setProfilePicUrl}
              getProfilePicUrl={getProfilePicUrl}
              setGetProfilePicUrl={setGetProfilePicUrl}
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
        <Button
          onClick={() => {
            updateProfile();
          }}
        >
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
      <BGImg
        src={current == 0 ? bgImg : current == 1 ? bgImg2 : bgImg3}
        alt="yay"
      />
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
const BGImg = styled.img`
  width: 293px;
  height: 283px;
  align-self: flex-end;
  position: absolute;
  top: 72%;
  left: 70%;
  @media screen and (max-width: 1300px) {
    display: none;
  }
`;
export default EditProfile;
