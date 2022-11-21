import React, { useState } from "react";
import styled from "styled-components";

export const Popover = ({ componentButton, children }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };
  return (
    <Container>
      <ContainerButton onClick={toggleShow}>{componentButton}</ContainerButton>

      {show && (
        <>
          <IframeTransparent onClick={toggleShow} />
          <BodyPopover data-aos="fade" onClick={toggleShow}>{children}</BodyPopover>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;
const IframeTransparent = styled.div`
  &::before{
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    background-color: transparent;
    width: 100%;
    z-index: 101;
    height: 100vh;
  }
`;
const ContainerButton = styled.div``;
const BodyPopover = styled.div`
    position: absolute;
    right: 0;
    z-index: 101;

`;
