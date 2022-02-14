import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import React, { useState } from "react";
import {
  MdRemoveRedEye,
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
} from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { AiFillMinusCircle } from "react-icons/ai";

const EditServiceType = ({ service, setService }: any) => {
  const [choice, setChoice] = useState(true);
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState(0);
  const [enableAdd, setEnableAdd] = useState(false);
  console.log(service);
  const addButtonHandler = () => {
    if (serviceName == "" || servicePrice == 0) {
      setEnableAdd(false);
    } else {
      setEnableAdd(true);
    }
  };
  const addServiceToList = (newService: any) => {
    for (var s of service) {
      if (
        s.serviceName == "" ||
        s.servicePrice == 0 ||
        (s.serviceName == newService.serviceName &&
          s.servicePrice == newService.servicePrice)
      ) {
        return;
      }
    }
    setService([...service, newService]);
    setServiceName("");
    setServicePrice(0);
    setEnableAdd(false);
  };
  const deleteServiceFromList = (deleteService: any) => {
    setService(
      service.filter(
        (service: any) =>
          service.serviceName != deleteService.serviceName ||
          service.servicePrice != deleteService.servicePrice
      )
    );
  };
  return (
    <Layout>
      <FirstLayout>
        <Padding>
          <ServiceType>Type of Service you provide</ServiceType>
          {choice ? (
            <InputLayout>
              <ChoiceDiv>
                <MdRadioButtonChecked
                  size={20}
                  onClick={() => {
                    setChoice(true);
                  }}
                />
                <p>
                  Create a <b>new</b> type of service
                </p>
              </ChoiceDiv>
              <ChoiceDiv>
                <MdRadioButtonUnchecked
                  size={20}
                  onClick={() => {
                    setChoice(false);
                  }}
                />
                <p>
                  Select an <b>existing</b> type of service
                </p>
              </ChoiceDiv>
              <ServiceAndPriceDiv>
                <FirstServiceInput
                  type="text"
                  placeholder="Service's name"
                  value={serviceName}
                  onChange={(e) => {
                    setServiceName(e.target.value);
                    addButtonHandler();
                  }}
                />
                <InputDiv>
                  <p>
                    <b>Price</b>
                  </p>
                  <input
                    type="number"
                    placeholder="0"
                    value={servicePrice == 0 ? "" : servicePrice}
                    onChange={(e) => {
                      setServicePrice(Number(e.target.value));
                      addButtonHandler();
                    }}
                  />
                  <p>
                    <b>/30 min</b>
                  </p>
                </InputDiv>
              </ServiceAndPriceDiv>
              <AddButton
                style={{
                  backgroundColor: enableAdd
                    ? COLOR["violet/400"]
                    : COLOR["gray/400"],
                  pointerEvents: enableAdd ? "unset" : "none",
                }}
                onClick={() => {
                  addServiceToList({
                    serviceName: serviceName,
                    servicePrice: servicePrice,
                  });
                }}
              >
                Add +
              </AddButton>
            </InputLayout>
          ) : (
            <InputLayout>
              <ChoiceDiv>
                <MdRadioButtonUnchecked
                  size={20}
                  onClick={() => {
                    setChoice(true);
                  }}
                />
                <p>
                  Create a <b>new</b> type of service
                </p>
              </ChoiceDiv>
              <ChoiceDiv>
                <MdRadioButtonChecked
                  size={20}
                  onClick={() => {
                    setChoice(false);
                  }}
                />
                <p>
                  Select an <b>existing</b> type of service
                </p>
              </ChoiceDiv>
              <SearchServiceDiv>
                <FiSearch style={{ marginLeft: 16 }} size={16} />
                <ServiceInput type="text" placeholder="search"></ServiceInput>
              </SearchServiceDiv>
              <SecondInputDiv>
                <p>
                  <b>Price</b>
                </p>
                <input type="number" />
                <p>
                  <b>/30 min</b>
                </p>
              </SecondInputDiv>
              <AddButton
                style={{
                  backgroundColor: enableAdd
                    ? COLOR["violet/400"]
                    : COLOR["gray/400"],
                  pointerEvents: enableAdd ? "unset" : "none",
                }}
              >
                Add +
              </AddButton>
            </InputLayout>
          )}
        </Padding>
      </FirstLayout>
      <SecondLayout>
        <Myservice>My service</Myservice>
        <Services>
          {service.map((service: any) => (
            <MyServiceDiv>
              <p>{service.serviceName}</p>
              <PriceAndMinusDiv>
                <p>฿ {service.servicePrice} /30min</p>
                <AiFillMinusCircle
                  color={COLOR["magenta/400"]}
                  size={24}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    deleteServiceFromList(service);
                  }}
                />
              </PriceAndMinusDiv>
            </MyServiceDiv>
          ))}
        </Services>
      </SecondLayout>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
`;
const FirstLayout = styled.div`
  width: 100%;
  height: 264px;
  background-color: white;
  border-radius: 0px 0px 8px 8px;
  margin-bottom: 6px;
`;
const SecondLayout = styled.div`
  width: 100%;
  height: 330px;
  border-radius: 20px 20px 20px 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
const Padding = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;
const Services = styled.div`
  flex: 1;
  overflow-y: scroll;
`;
const ServiceType = styled.div`
  font-size: 18px;
  width: 100%;
  font-weight: bold;
`;

const InputLayout = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
`;
const ChoiceDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  column-gap: 8px;
`;
const ServiceAndPriceDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 8px;
  justify-content: space-evenly;
  @media screen and (max-width: 540px) {
    flex-direction: column;
  } ;
`;
const InputDiv = styled.div`
  padding: 0px;
  width: 100%;
  display: flex;
  column-gap: 8px;
  font-size: 16px;
  align-items: center;
  input {
    padding-left: 5px;
    width: 50%;
    height: 38px;
    border-radius: 8px;
    border: solid #808080 1px;
    &:focus {
      outline: none;
      border: solid ${COLOR["magenta/200"]} 1px;
    }
  }
  @media screen and (max-width: 540px) {
    margin-top: 8px;
  }
`;

const Myservice = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${COLOR["blue/900"]};
  padding: 20px 50px 0px 80px;
`;

const SecondInputDiv = styled.div`
  align-self: flex-end;
  margin: 0px;
  width: 41%;
  display: flex;
  column-gap: 8px;
  font-size: 16px;
  align-items: center;
  input {
    padding-left: 5px;
    width: 50%;
    height: 38px;
    border-radius: 8px;
    border: solid #808080 1px;
    &:focus {
      outline: none;
      border: solid ${COLOR["magenta/200"]} 1px;
    }
  }
  @media screen and (max-width: 540px) {
    width: 70%;
  } ;
`;
const SearchServiceDiv = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  font-weight: bold;
  border-radius: 8px;
  border: solid #808080 1px;
  :focus-within {
    outline: none;
    border: solid ${COLOR["magenta/100"]} 2px;
  }
`;

const FirstServiceInput = styled.input`
  font-size: 16px;
  padding-left: 5px;
  width: 100%;
  height: 38px;
  border-radius: 8px;
  border: solid #808080 1px;
  &:focus {
    outline: none;
    border: solid ${COLOR["magenta/200"]} 1px;
  }
`;
const ServiceInput = styled.input`
  font-size: 16px;
  padding-left: 5px;
  width: 100%;
  height: 38px;
  border: none;
  &:focus {
    outline: none;
    border: none;
  }
`;
const AddButton = styled.button`
  cursor: pointer;
  border: none;
  align-self: flex-end;
  height: 28px;
  width: 70px;
  text-align: center;
  font-weight: bold;
  border-radius: 10000px;
  color: white;
  :hover {
    background-color: ${COLOR["violet/500"]} !important;
  }
`;

const MyServiceDiv = styled.div`
  padding: 0px 15px 15px 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
`;

const PriceAndMinusDiv = styled.div`
  display: flex;
  column-gap: 8px;
`;

export default EditServiceType;
