import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

export const AlertBodySimple = ({ text, icon, iconSvg, onclick }) => {
  return (
    <Container >
      <Content>
        <Icon>
          {icon && <FontAwesomeIcon icon={icon} />}
          {iconSvg && iconSvg}
        </Icon>
        <Text>{text}</Text>
        {/* <BtnClose onClick={onclick}>
          <FontAwesomeIcon icon={faXmark} />
        </BtnClose> */}
      </Content>
    </Container>
  );
};

const Container = styled.div``;
const Content = styled.div`
  background-color: var(--write-100);
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
`;
const Icon = styled.div`
  background-color: var(--blue-600);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--write-100);
  svg {
    width: 15px;
    height: 15px;
  }
`;
const Text = styled.p`
  padding: 0;
  margin: 0;
  margin: 0 10px;
  color: var(--black-100);
`;
const BtnClose = styled.div`
  min-width: 25px;
  cursor: pointer;
  min-height: 25px;
  background-color: var(--black-800);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: var(--write-100);
  }
  &:hover {
    background-color: var(--black-900);
  }
`;
