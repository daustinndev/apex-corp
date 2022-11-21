import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

export const SidebarHeader = ({
  title,
  href,
  hrefText,
  iconBtn,
  iconBtnOnclick,
}) => {
  return (
    <>
      <Header>
        <h5>{title}</h5>
        {href && <a href={href}>{hrefText}</a>}
        {/* {iconBtn && <ButtomCircle onClick={iconBtnOnclick} icon={iconBtn} />} */}
      </Header>
    </>
  );
};
export const SidebarBody = ({ children, loading, styled }) => {
  return (
    <>
      <Body>
        <UlList style={{ styled }}>
          {loading ? (
            <LoadingBody>{/* <Loader /> */}</LoadingBody>
          ) : (
            <>{children}</>
          )}
        </UlList>
      </Body>
    </>
  );
};
export const SidebarItem = ({
  Href,
  Icon,
  IconColor,
  Text,
  NewReload,
  timeAgo,
  onClick,
  iconSvg,
  className,
  description,
}) => {
  return (
    <>
      <LiItem
        description={description}
        onClick={onClick}
        IconColor={IconColor}
        timeAgo={timeAgo}
      >
        <div className={className} to={Href}>
          <span>
            {Icon && <FontAwesomeIcon icon={Icon} />} {iconSvg && iconSvg}
          </span>
          <p>
            {Text} {timeAgo && <small> • {timeAgo}</small>}
            {description && <span>{description}</span>}
          </p>
        </div>
      </LiItem>
    </>
  );
};
export const SidebarLayout = ({ children, wSidebar }) => {
  return (
    <>
      <Container w={wSidebar}>{children}</Container>
    </>
  );
};
export const BtnSidebar = ({ children, Element }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <BtnOnclick>
        <>
          <BtnContiner onClick={() => setShow(!show)}>{Element}</BtnContiner>
        </>
        {show && (
          <>
            <IframeFixed onClick={() => setShow(false)} />
            {children}
          </>
        )}
      </BtnOnclick>
    </>
  );
};
export const SidebarSeparator = () => {
  return (
    <>
      <Separator />
    </>
  );
};

const Separator = styled.div`
  margin: 5px 0;
  height: 1px;
  width: 100%;
  background-color: var(--black-800);
`;
const BtnOnclick = styled.div`
  position: relative;
  border-radius: 50%;
`;
const BtnContiner = styled.div`
  border-radius: 50%;
`;
const IframeFixed = styled.div`
  &::before {
    content: "";
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 98;
    position: fixed;
    cursor: default !important;
  }
`;
const LoadingBody = styled.div`
  width: 100px;
  margin: 5px auto;
  display: flex;
`;
const Container = styled.div`
  margin: 0.6rem 0rem;
  min-width: ${(props) => (props.w ? props.w : "230px")};
  background-color: rgba(55, 55, 55, 0.4);
  backdrop-filter: blur(15px);
  box-shadow: 0 0 30px 1px rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  z-index: 99;
`;
const Header = styled.div`
  border-bottom: 1px solid var(--black-600);
  margin-left: 5px;
  display: flex;
  align-items: center;
  h5 {
    font-size: var(--size-18);
  }
  a {
    margin-left: auto;
    margin-right: 8px;
    color: var(--dodgerblue-400);
    font-weight: bold;
    font-size: 14px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }
`;
const Body = styled.div`
  overflow-y: auto;
  max-height: 80vh;
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--black-800);
    border-radius: 5px;
  }
`;
const UlList = styled.ul`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  padding: 5px;
`;
const LiItem = styled.li`
  .active {
    background-color: var(--black-700);
    color: var(--write-000);
    span {
      svg {
        color: var(--write-000);
      }
    }
  }
  > div {
    position: relative;
    padding: 4px 0;
    display: flex;
    font-size: 12px;
    align-items: ${(props) => (props.description ? "flex-start" : "center")};
    color: var(--write-100);
    text-decoration: none;
    border-radius: 5px;
    transition: 0.2s;
    cursor: pointer;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
    > span {
      min-width: 30px;
      min-height: 30px;
      width: 30px;
      height: 30px;
      /* background-color: var(--black-600); */
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 7px 0 0;
      svg {
        color: ${(props) =>
          props.IconColor ? props.IconColor : "var(--write-300)"};
        width: 18px;
        height: 18px;
      }
    }
    p {
      padding-right: 10px;
      margin: 0;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      gap: 1px;
      small {
        color: ${(props) =>
          props.timeAgo == "Hace un momento"
            ? "var(--green-300)"
            : "var(--write-600)"};
      }
      span {
        font-size: 12px !important;
        font-weight: normal;
        color: var(--write-400);
      }
    }
    &:hover {
      background-color: var(--black-800);
      color: var(--write-000);
      span {
        /* background-color: var(--black-800); */
      }
      svg {
        color: var(--write-000);
      }
    }
    .NewReload {
      min-width: 6px;
      min-height: 6px;
      border-radius: 50%;
      background-color: var(--dodgerblue-500);
      left: 96%;
      position: absolute;
    }
  }
`;
