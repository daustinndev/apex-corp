import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { disableScroll, enableScroll, HitoryGo } from "../../../hooks/hooks.utils";
import { Eclipsis } from "../../button";

export const LayoutModal = ({
  closeModalHref,
  styled,
  Width,
  maxHeigth,
  title,
  children,
  footer,
  frameOnclick,
  className
}) => {
  const navigate = useNavigate();

  const closeModal = () => {
    enableScroll();
    HitoryGo()
  };

  useEffect(() => {
    disableScroll();
  }, []);

  return (
    
    <Container data-aos='fade'>
      <IframeLayout onClick={frameOnclick && closeModal} ></IframeLayout>
      <ContainerLayout className={className} Width={Width} style={styled}>
        <Header>
          <h1>{title}</h1>
          <Eclipsis className='small' onClick={closeModal} icon={faXmark} />
        </Header>
        <Body maxHeigth={maxHeigth}>{children}</Body>
        <Footer>{footer}</Footer>
      </ContainerLayout>
    </Container>
  );
};
const IframeLayout = styled.div`
  &::before {
    content: "";
    position: fixed;
    z-index: 101;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
const Container = styled.div`
  .blur-back{
    background-color: rgba(55, 55, 55, 0.4);
    backdrop-filter: blur(15px);
    box-shadow: 0 0 30px 1px rgba(0, 0, 0, 0.2);
  }
`;

const ContainerLayout = styled.div`
  width: ${(props) => (props.Width ? props.Width : "auto")};
  background-color: var(--black-400);
  border: 1px solid var(--black-600);
  position: fixed;
  z-index: 102;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  &:before {
    content: " ";
    position: absolute;
    border-radius: 12px;
    z-index: -1;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border: 1px solid var(--black-300);
  }

`;
const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 5px 5px;
  position: relative;
  h1 {
    margin: 0;
    margin-right: auto;
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
  }
  border-bottom: 1px solid var(--black-600);
  &::before{
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: var(--black-300);
  }
`;
const Body = styled.div`
  max-height: ${(props) => (props.maxHeigth ? props.maxHeigth : "100vh")};
  overflow-y: auto;
  padding: 5px;
`;
const Footer = styled.div``;
