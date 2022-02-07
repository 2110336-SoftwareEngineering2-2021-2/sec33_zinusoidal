import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import React, { useState } from "react";
import {
  MdRemoveRedEye,
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
} from "react-icons/md";

const ProviderProfileUpload = () => {
  const [choice, setChoice] = useState(true);
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
                <ServiceInput type="text" placeholder="Service's name" />
                <InputDiv>
                  <p>
                    <b>Price</b>
                  </p>
                  <input type="number" />
                  <p>
                    <b>/30 min</b>
                  </p>
                </InputDiv>
              </ServiceAndPriceDiv>
              <AddButton>Add +</AddButton>
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
              <ServiceInput type="text" placeholder="search" />
              <SecondInputDiv>
                <p>
                  <b>Price</b>
                </p>
                <input type="number" />
                <p>
                  <b>/30 min</b>
                </p>
              </SecondInputDiv>
              <AddButton>Add +</AddButton>
            </InputLayout>
          )}
        </Padding>
      </FirstLayout>
      <SecondLayout>My service</SecondLayout>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
`;
const FirstLayout = styled.div`
  width: 100%;
  background-color: white;
  height: fit-content;
  border-radius: 0px 0px 8px 8px;
`;
const SecondLayout = styled.div`
  margin-top: 8px;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 20px 20px 0px 0px;
`;
const Padding = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
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
  flex-direction: column;
  row-gap: 16px;
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
      outline: solid ${COLOR["magenta/100"]} 1px;
      border: solid ${COLOR["magenta/100"]} 1px;
    }
  }
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
      outline: solid ${COLOR["magenta/100"]} 1px;
      border: solid ${COLOR["magenta/100"]} 1px;
    }
  }
`;
const ServiceInput = styled.input`
font-size:16px;
  padding-left: 5px;
  width: 100%;
  height: 38px;
  border-radius: 8px;
  border: solid #808080 1px;
  &:focus {
    outline: solid ${COLOR["magenta/100"]} 1px;
    border: solid ${COLOR["magenta/100"]} 1px;
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
  background-color: ${COLOR["violet/400"]};
  &:hover {
    background-color: ${COLOR["violet/500"]};
  }
`;

export default ProviderProfileUpload;
