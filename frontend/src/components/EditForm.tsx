import React from "react";
import styled from "styled-components";

const EditForm = () => {
  return (
    <Layout>
      <Input>
        <h3>Name</h3>
        <input type="text" />
      </Input>
      <Input>
        <h3>Surname</h3>
        <input type="text" />
      </Input>
      <Input>
        <h3>Email</h3>
        <input type="text" />
      </Input>
      <Input>
        <h3>Username</h3>
        <input type="text" />
      </Input>
      <Input>
        <h3>Password</h3>
        <input type="password" />
      </Input>
      <Input>
        <h3>Biography</h3>
        <textarea maxLength={256} />
      </Input>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const Input = styled.div`
  flex: 1;
  margin: 0.5rem 1rem;
  input {
    height: 32px;
    width: 100%;
    border-radius: 8px;
    outline: none;
    border: 0.5px solid black;
    padding: 0 1rem;
  }
  :nth-child(3n) {
    min-width: calc(100% - 2rem);
  }

  textarea {
    min-height: 150px;
    width: 100%;
    text-align: left;
    border-radius: 8px;
    padding: 1rem;
    outline: none;
    border: 0.5px solid black;
  }
`;

export default EditForm;
