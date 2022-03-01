import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RiPencilFill } from "react-icons/ri";
import { AiOutlineLogout, AiOutlineClose } from "react-icons/ai";
import { BsCalendarCheck } from "react-icons/bs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const LandingDropDownWideScreen = ({ setDropDown }: any) => {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const user = cookies.get("user");
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropDown(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);
  const logoutHandle = () => {
    console.log("ddd");
    setDropDown(false);
    cookies.remove("user", { path: "/" });
    navigate("/");
  };
  return (
    <Layout
      ref={wrapperRef}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {user.user_id.charAt(0) == "P" && (
        <div>
          <Link to="/editProfile" style={{ textDecoration: "none" }}>
            <DropArrow />
            <Item>
              <RiPencilFill /> <p>Edit your profile</p>
            </Item>
          </Link>
          <Link to="/calendar" style={{ textDecoration: "none" }}>
            <DropArrow />
            <Item>
              <BsCalendarCheck /> <p>See my appointment</p>
            </Item>
          </Link>
        </div>
      )}
      {user.user_id.charAt(0) == "C" && (
        <div>
          <Link to="/customerChangePassword" style={{ textDecoration: "none" }}>
            <DropArrow />
            <Item>
              <RiPencilFill /> <p>Change Password</p>
            </Item>
          </Link>

          <Link to="/customerDeleteAccount" style={{ textDecoration: "none" }}>
            <DropArrow />
            <Item>
              <AiOutlineClose /> <p>Delete Account</p>
            </Item>
          </Link>
        </div>
      )}

      <Item
        onClick={() => {
          logoutHandle();
        }}
      >
        <AiOutlineLogout />
        <p>Logout</p>
      </Item>
    </Layout>
  );
};

const Layout = styled(motion.div)`
  width: 240px;
  background-color: white;
  position: absolute;
  top: 40px;
  right: 0;
  border-radius: 4px;
  z-index: 1;
`;
const Item = styled.div`
  width: 100%;
  height: 51px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  color: black;
  cursor: pointer;
  p {
    font-size: 20px;
    line-height: 31px;
    margin-left: 8px;
  }
`;

const DropArrow = styled.div`
  border-right: 5px solid transparent;

  border-left: 5px solid transparent;
  border-bottom: 10px solid white;
  position: absolute;
  right: 10px;
  top: -10px;
`;

export default LandingDropDownWideScreen;
