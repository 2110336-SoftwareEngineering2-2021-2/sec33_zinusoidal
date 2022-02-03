import React from "react";
import styled from "styled-components";

const EditForm = () => {
  return (
    <Layout>
      <ImageZone>
        <Image>
          <img
            src="data:image/jpeg;base64,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"
            alt="profilePic"
          />
        </Image>
      </ImageZone>

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
  padding-top: 1rem;
  flex-wrap: wrap;
  background-color: white;
  box-shadow: 0px 0px rgba(0, 0, 0, 0.25);
  border-radius: 0 0 20px 20px;
`;
const ImageZone = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 100%;
  /* margin-top: 10px; */
  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }
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
