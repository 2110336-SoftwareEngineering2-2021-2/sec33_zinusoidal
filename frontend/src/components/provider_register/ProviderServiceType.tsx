import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import React, { useState, useEffect, useRef } from "react";
import {
  MdRemoveRedEye,
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
} from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { AiFillMinusCircle } from "react-icons/ai";
import SearchServiceDropDown from "./SearchServiceDropDown";

const ProviderServiceType = ({ service, setService }: any) => {
  const wrapperRef = useRef(null);
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setServiceDropDownOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);
  const [serviceDropDownOpen, setServiceDropDownOpen] = useState(false);
  const [choice, setChoice] = useState(true);
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState(0);
  const [enableAdd, setEnableAdd] = useState(false);

  const addServiceToList = (newService: any) => {
    console.log(newService);
    for (var s of service) {
      if (
        s.fortuneType == "" ||
        s.price == 0 ||
        (s.fortuneType == newService.fortuneType && s.price == newService.price)
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
          service.fortuneType != deleteService.fortuneType ||
          service.price != deleteService.price
      )
    );
  };

  return (
    <Layout>
      <FirstLayout>
        <Padding>
          <ProviderRegistration>
            <MdRemoveRedEye color={COLOR["violet/400"]} />
            Provider Registration
          </ProviderRegistration>
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
                    }}
                  />
                  <p>
                    <b>/30 min</b>
                  </p>
                </InputDiv>
              </ServiceAndPriceDiv>
              <AddButton
                style={{
                  backgroundColor:
                    serviceName == "" || servicePrice == 0
                      ? COLOR["gray/400"]
                      : COLOR["violet/400"],
                  pointerEvents:
                    serviceName == "" || servicePrice == 0 ? "none" : "unset",
                }}
                onClick={() => {
                  addServiceToList({
                    fortuneType: serviceName,
                    price: servicePrice,
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
              <div
                style={{
                  position: "relative",
                }}
                ref={wrapperRef}
              >
                <SearchServiceDiv>
                  <FiSearch style={{ marginLeft: 16 }} size={16} />
                  <ServiceInput
                    value={serviceName}
                    type="text"
                    placeholder="search"
                    onClick={() => setServiceDropDownOpen(true)}
                    onChange={(e) => setServiceName(e.target.value)}
                  ></ServiceInput>
                </SearchServiceDiv>
                {serviceDropDownOpen ? (
                  <SearchServiceDropDown
                    serviceName={serviceName}
                    setServiceName={setServiceName}
                    setServiceDropDownOpen={setServiceDropDownOpen}
                  />
                ) : null}
              </div>
              <SecondInputDiv>
                <p>
                  <b>Price</b>
                </p>
                <input
                  type="number"
                  placeholder="0"
                  value={servicePrice == 0 ? "" : servicePrice}
                  onChange={(e) => {
                    setServicePrice(Number(e.target.value));
                  }}
                />
                <p>
                  <b>/30 min</b>
                </p>
              </SecondInputDiv>
              <AddButton
                style={{
                  backgroundColor:
                    serviceName == "" || servicePrice == 0
                      ? COLOR["gray/400"]
                      : COLOR["violet/400"],
                  pointerEvents:
                    serviceName == "" || servicePrice == 0 ? "none" : "unset",
                }}
                onClick={() => {
                  addServiceToList({
                    fortuneType: serviceName,
                    price: servicePrice,
                  });
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
          {service.map((s: any) => (
            <MyServiceDiv>
              <p>{s.fortuneType}</p>
              <PriceAndMinusDiv>
                <p>฿ {s.price} /30min</p>
                <AiFillMinusCircle
                  color={COLOR["magenta/400"]}
                  size={24}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    deleteServiceFromList(s);
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
  height: 294px;
  background-color: white;
  border-radius: 0px 0px 8px 8px;
  margin-bottom: 6px;
`;
const SecondLayout = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 20px 20px 0px 0px;
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

const ProviderRegistration = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  column-gap: 5px;
  font-weight: bold;
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

export default ProviderServiceType;
