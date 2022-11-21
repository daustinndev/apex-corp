import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const ModalBodyAction = ({ buttonElement, children, frameOnclick }) => {
  return (
    <>
      <Container>
        <ContainerButton>{buttonElement}</ContainerButton>
        <IframeFixed onClick={() => {if(frameOnclick){frameOnclick}}}/>
        <BodyContainer>{children}</BodyContainer>
      </Container>
    </>
  );
};

const Container = styled.div``;
const ContainerButton = styled.div``;
const IframeFixed = styled.div``;
const BodyContainer = styled.div``;
