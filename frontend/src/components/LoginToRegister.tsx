import React from "react";
import styled from "styled-components";
import { COLOR, TERMS } from "../CONSTANT";

const LoginToRegister = () => {
  return (
    <div>
      <JoinUs>Join Us !</JoinUs>
      <TextAndbuttonProvider>
        <Text style={{ color: COLOR["magenta/300"] }}>As Provider</Text>
        <Button>Register</Button>
      </TextAndbuttonProvider>
      <TextAndbuttonCustomer>
        <Text style={{ color: COLOR["blue/200"] }}>As Customer</Text>
        <Button>Register</Button>
      </TextAndbuttonCustomer>
    </div>
  );
};
const JoinUs = styled.p`
    margin:0px;
    font-family: Baloo 2;
    font-weight: bold;
    color: #ffffff;
    font-size:48px;
    position:absolute;
    left:781px;
    top:297px;
}`;

const TextAndbuttonProvider = styled.div`
    margin:0px;
    background: #ffffff;
    padding:15px;
    width:230px;
    height:143px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border-radius:20px;
    row-gap:10px;
    position:absolute;
    left:781px;
    top:382px;
    box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25);

}`;
const TextAndbuttonCustomer = styled.div`
    margin:0px;
    background: #ffffff;
    padding:15px;
    width:230px;
    height:143px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border-radius:20px;
    row-gap:10px;

    position:absolute;
    left:1083px;
    top:382px;
    box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25);

}`;
const Text = styled.p`
    margin:0px;
    font-family: Baloo 2;
    font-weight: bold;
    font-size: 28px;
}`;
const Button = styled.button`
border:none;
    margin:0px;
    font-family: Baloo 2;
    font-size: 20px;
    color: #ffffff;
    background: ${COLOR["violet/400"]};
    height:40px;
    width:133px;
    text-align:center;
    border-radius:10000px;
}`;

export default LoginToRegister;
