import React from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
const ProviderDetail = () => {
  return (
    <Layout>
      <ProfileHeader>
        <Image>
          <img
            src="http://images.summitmedia-digital.com/preview/images/2020/06/09/son-ye-jin-most-beautiful-woman-nm.jpg"
            alt="profle"
          />
        </Image>
        <NameZone></NameZone>
        <Button>
          <button>Message</button>
          <button>Booking</button>
        </Button>
      </ProfileHeader>
    </Layout>
  );
};

const Layout = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;

  border-radius: 0 0 20px 20px;
  padding: 2rem 3rem;
`;

const ProfileHeader = styled.div`
  /* background-color: green; */
  display: flex;
`;

const Image = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 100%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
  }
`;

const NameZone = styled.div`
  flex: 1;
  background-color: pink;
`;

const Button = styled.div`
  margin-top: 23px;
  /* margin-left: auto; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  button {
    height: 32px;
    width: 104px;
    border-radius: 10000px;
    background-color: ${COLOR["violet/400"]};
    border: none;
    font-size: 14px;
    line-height: 22px;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
`;
export default ProviderDetail;
