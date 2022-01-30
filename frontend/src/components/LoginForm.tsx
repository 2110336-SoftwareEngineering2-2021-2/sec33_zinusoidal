
import React from "react";
import { COLOR } from "../CONSTANT";
import styled from "styled-components";



const LoginForm: React.FC = () => {
  return (
    <LoginFormLayout>
      <LoginFormHeader1>Fortune 168</LoginFormHeader1>
      <LoginFormHeader2>Login</LoginFormHeader2>

      <InputDiv>
        <FormLabel>Username</FormLabel>
        <Forminput type="text" id="fname" name="fname" />
      </InputDiv>
      <InputDiv>
        <FormLabel>Password</FormLabel>
        <Forminput type="password" id="fname" name="fname"/>
      </InputDiv>
    
      <RememberAndForgetDiv>
        <RememberDiv>
          <CheckboxStyle type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
          <p>Remember me</p>
        </RememberDiv>
        <Forget href = ''>Forget password?</Forget>
      </RememberAndForgetDiv>  

      <LoginButton>Login</LoginButton>
    </LoginFormLayout>
  );
};
const LoginFormLayout = styled.div`
    display: flex;
    flex-direction: column ;
    align-items: center;
    width:390px;
    height: 531px;
    background: #FFFFFF;
    padding:50px;
    row-gap: 30px;
    border-radius:20px;
    position:absolute;
    left:162px;
    top:210px;

    font-family: Baloo 2;
    font-weight: bold;
}`;

const InputDiv = styled.div`
    margin:0px;
    width:100%;
}`;

const LoginFormHeader1 = styled.p`
    margin: 0px;
    font-size: 64px;
    color: ${COLOR["violet/800"]};
}`;
const LoginFormHeader2 = styled.p`
    margin: 0px;
    width:100%;
    font-size: 36px;
}`;

const FormLabel = styled.p`
    margin: 0px;
    font-size: 16px;
}`;
const Forminput = styled.input`
    width:100%;
    height:32px;
    border-radius:8px;
}`;

const RememberAndForgetDiv = styled.div`
    display: flex;
    width: 100%;
    font-size: 16px;
    column-gap: 8px;
    justify-content: space-between;
    align-items: center;
}`;
const RememberDiv = styled.div`
    display:flex;
    column-gap:8px;
    align-items: center;
    text-align: center;
}`;

const CheckboxStyle = styled.input`
    width:24px;
    height:24px;
}`;

const Forget = styled.a`
    text-decoration:none;
    color: ${COLOR["magenta/300"]};
}`;

const LoginButton = styled.button`
    border:none;
    width:100%;
    height:55px;
    background-color:${COLOR["violet/400"]};
    text-decoration:none;
    color: #ffffff;
    border-radius: 10000px;
    font-family: Baloo 2;
    font-eight: bold;
    font-size: 24px;
}`;

export default LoginForm;