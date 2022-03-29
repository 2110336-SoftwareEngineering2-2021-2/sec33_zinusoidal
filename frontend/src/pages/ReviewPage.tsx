import React from "react";
import styled from "styled-components";
import CreateReviewModal from "../components/review/CreateReviewModal";
import { useLocation, useParams } from "react-router-dom";
const ReviewPage = () => {
  let { appointmentID, providerID } = useParams();
  // const location = useLocation();
  // const { appointmentID, providerID }: any = location.state;
  console.log("ROP", appointmentID);
  return (
    <Layout>
      <CreateReviewModal
        appointmentID={appointmentID}
        providerID={providerID}
      />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(
    to left top,
    #d898fd,
    #dca5fc,
    #e0b2fb,
    #e3bffa,
    #e7cbf8,
    #e7cbf8,
    #e7cbf8,
    #e7cbf8,
    #e3bffa,
    #e0b2fb,
    #dca5fc,
    #d898fd
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default ReviewPage;
