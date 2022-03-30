import React from "react";
import styled from "styled-components";

const ReviewBlock = ({ data }: any) => {
  return (
    <Layout>
      <Image src={data.profilePic} alt="reviewImage" />
      <Detail>
        <h1>{data.name}</h1>
        <div className="ratings">
          <div className="empty-stars"></div>
          <div
            className="full-stars"
            style={{ width: `${(data.score * 100) / 5}%` }}
          ></div>
        </div>
        <div>
          <P>{data.text}</P>
        </div>
      </Detail>
    </Layout>
  );
};

const Layout = styled.div`
  min-width: 448px;
  height: 141px;
  background-color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-right: 28px;

  @media screen and (max-width: 1050px) {
    height: 129px;
    min-width: 400px;
  }
  @media screen and (max-width: 1050px) {
    height: 129px;
    min-width: 300px;
  }
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 100%;
  object-fit: fill;
  margin-right: 29px;
`;

const Detail = styled.div`
  flex: 1;
  align-self: stretch;
  overflow: auto;
  overflow-wrap: break-word;
  /* display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; */
  /* line-height: 50%; */

  h1 {
    font-size: 16px;
    line-height: 25px;
    font-weight: bold;
  }
`;

const P = styled.h4`
  font-size: 12px;
  line-height: 19px;
  pointer-events: none;
  font-weight: normal;
`;
export default ReviewBlock;
