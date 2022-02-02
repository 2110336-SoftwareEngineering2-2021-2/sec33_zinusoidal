import { LayoutGroup } from "framer-motion";
import React from "react";
import styled from "styled-components";
import ProifileNavbar from "../components/ProifileNavbar";
import { COLOR } from "../CONSTANT";
const Profile = () => {
  return (
    <Layout>
      <ProifileNavbar></ProifileNavbar>
      <Content>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla facere
          facilis odio delectus. Optio fugit quam suscipit aperiam libero
          consequuntur facere expedita vero vel, dignissimos accusantium
          molestias omnis aliquam quae deserunt quidem inventore exercitationem
          nostrum cum eum? Id explicabo, quae at totam minima fugiat eius culpa
          sed consequatur magnam ut, sapiente distinctio, commodi facilis
          quaerat quas fugit nihil earum harum sint. Repudiandae rerum libero
          qui? Iure, necessitatibus suscipit vero expedita aspernatur officia
          quia sequi impedit repellendus labore optio doloremque voluptatibus
          nobis iusto dicta fugit voluptate soluta ea architecto eaque autem?
          Atque consequuntur maiores repudiandae exercitationem quas animi
          similique iusto! Ipsam.
        </p>
      </Content>
    </Layout>
  );
};

const Layout = styled.div`
  background: white;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  background: ${COLOR["magenta/100"]};
  /* background: transparent; */
  height: 100vh;
  overflow-y: scroll;
  flex: 1;
  border-radius: 20px 0 0 20px;
`;
export default Profile;
