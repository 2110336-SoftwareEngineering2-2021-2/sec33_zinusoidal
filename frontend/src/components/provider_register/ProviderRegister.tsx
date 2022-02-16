import { useState } from "react";
import axios from "axios";

import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import ProviderRegisterContainer from "../../containers/ProviderRegisterContainer";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
interface Current {
  currentPage: any;
}
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

const ProviderRegister = () => {
  const register = () => {
    var providerInput = new FormData();
    if (profilePicUrl != null) {
      providerInput.append("profilePic", profilePicUrl);
    }
    providerInput.append("username", userInput.Username);
    providerInput.append("password", userInput.Password);
    providerInput.append("email", userInput.Email);
    providerInput.append("firstName", userInput.Name);
    providerInput.append("lastName", userInput.Surname);
    providerInput.append("citizenId", userInput.CitizenID);
    providerInput.append("biography", userInput.Biography);
    providerInput.append("fortuneList", JSON.stringify(service));
    providerInput.append(
      "workSchedule",
      JSON.stringify(workTime(availableTime))
    );

    axios({
      method: "post",
      url: "https://ec2-13-229-67-156.ap-southeast-1.compute.amazonaws.com/api/fortune168/v1/provider_register",
      data: providerInput,
      headers: { "Content-type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log("register success");
        setCurrent(5);
      })
      .catch(function (error) {
        console.log(error.response);
        console.log(error.response.data.log);
        if (error.response.data.log.includes("email")) {
          setCurrent(1);
          setEmailError(true);
        }
        if (error.response.data.log.includes("username")) {
          setCurrent(1);
          setUsernameError(true);
        }
      });
  };
  const [current, setCurrent] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [userInput, setUserInput] = useState({
    Name: "",
    Surname: "",
    Email: "",
    CitizenID: "",
    Username: "",
    Password: "",
    ConfirmPassword: "",
    Biography: "",
  });
  const [profilePicUrl, setProfilePicUrl] = useState(null as any);

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
  const clickToggle = () => {
    setClicked(!clicked);
  };
  const NextHandler = () => {
    setCurrent(Math.min(2, current + 1));
    setOpenPasswordError(false);
  };
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  console.log(userInput);
  console.log(service);
  console.log(availableTime);

  const conditionZeroPass = current == 0 && clicked;
  const conditionOnePass =
    current == 1 &&
    userInput.Name != "" &&
    userInput.Surname != "" &&
    userInput.CitizenID != "" &&
    userInput.Email != "" &&
    userInput.Username != "" &&
    userInput.Password != "" &&
    userInput.ConfirmPassword != "" &&
    userInput.Biography != "";
  const conditionTwoPass = current == 2 && service.length != 0;
  const conditionThreePass =
    (current == 3 && availableTime[0].timeList.length != 0) ||
    availableTime[1].timeList.length != 0 ||
    availableTime[2].timeList.length != 0 ||
    availableTime[3].timeList.length != 0 ||
    availableTime[4].timeList.length != 0 ||
    availableTime[5].timeList.length != 0 ||
    availableTime[6].timeList.length != 0;

  const [samePassword, setSamePassword] = useState(
    userInput.Password == userInput.ConfirmPassword
  );
  const [openPasswordError, setOpenPasswordError] = useState(false);

  console.log(current);
  return (
    <Layout>
      <Header>
        <Circle>
          <InnerCircle></InnerCircle>
        </Circle>
      </Header>
      <Form>
        <ProviderRegisterContainer
          usernameError={usernameError}
          setUsernameError={setUsernameError}
          emailError={emailError}
          setEmailError={setEmailError}
          samePassword={samePassword}
          setSamePassword={setSamePassword}
          openPasswordError={openPasswordError}
          setOpenPasswordError={setOpenPasswordError}
          userData={userInput}
          changeUserData={setUserInput}
          service={service}
          setService={setService}
          availableTime={availableTime}
          setAvailableTime={setAvailableTime}
          profilePicUrl={profilePicUrl}
          setProfilePicUrl={setProfilePicUrl}
          current={current}
          checked={clicked}
          callBack={clickToggle}
        />
      </Form>
      <ButtonDiv
        style={{ justifyContent: current == 0 ? "center" : "space-between" }}
      >
        <PrevButton
          onClick={() => {
            setCurrent(Math.max(0, current - 1));
          }}
          style={{
            display: current == 0 ? "none" : "flex",
            visibility: current == 5 ? "hidden" : "visible",
          }}
        >
          <MdOutlineNavigateBefore />
          Back
        </PrevButton>
        <Button
          currentPage={current}
          disabled={!clicked}
          style={{
            visibility: current == 5 ? "hidden" : "visible",

            backgroundColor:
              current == 4
                ? COLOR["green/400"]
                : conditionZeroPass ||
                  conditionOnePass ||
                  conditionTwoPass ||
                  conditionThreePass
                ? COLOR["violet/400"]
                : COLOR["gray/400"],

            pointerEvents:
              conditionZeroPass ||
              conditionOnePass ||
              conditionTwoPass ||
              conditionThreePass ||
              current == 4
                ? "unset"
                : "none",
          }}
          onClick={() => {
            current == 0 || current == 2 || current == 3
              ? setCurrent(Math.min(4, current + 1))
              : current == 4
              ? register()
              : current == 1 && samePassword
              ? NextHandler()
              : setOpenPasswordError(true);
          }}
        >
          {current == 4 ? (
            <>
              Done
              <AiOutlineCheck />{" "}
            </>
          ) : (
            <>
              Next
              <MdOutlineNavigateNext />
            </>
          )}
        </Button>
      </ButtonDiv>
    </Layout>
  );
};
const Layout = styled.div`
  width: 535px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1300px) {
    margin-top: 50px;
  }
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

const Form = styled.div`
  width: 100%;
`;

const ButtonDiv = styled.div`
  width: 100%;
  background-color: white;
  padding: 15px 15px 15px 15px;
  border-radius: 0px 0px 20px 20px;
  display: flex;
  justify-content: space-between;
`;
const PrevButton = styled.button`
  cursor: pointer;
  border: ${COLOR["violet/400"]} solid 1px;
  width: 86px;
  height: 40px;
  background-color: white;
  text-decoration: none;
  color: ${COLOR["violet/400"]};
  border-radius: 10000px;
  font-size: 16px;
  font-weight: bold;

  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  &:hover {
    border: ${COLOR["violet/500"]} solid 1px;
    color: ${COLOR["violet/500"]};
  }
`;
const Button = styled("button")<Current>`
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
    background-color: ${(prop) =>
      prop.currentPage == 4
        ? COLOR["green/500"]
        : COLOR["violet/500"]} !important ;
  }
`;
export default ProviderRegister;
