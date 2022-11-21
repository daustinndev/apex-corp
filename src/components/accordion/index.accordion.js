import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const Accordion = ({ title, description, children, open }) => {
  const [show, setShow] = useState("open-angle");
  const toggleShow = (e) => {
    e.preventDefault();
    setShow(show === "open-angle" ? "close-angle" : "open-angle");
  };
  useEffect(() => {
    if (open) {
      setShow("open-angle");
    }else{
        setShow("close-angle");
    }
  }, [open]);

  return (
    <Container>
      <HeaderAccordionButton className={show === 'open-angle'? 'active':''} onClick={toggleShow}>
        <h2>{title}</h2>
        <p>{description}</p>
        <ButtonAccor className={show === "open-angle" ? "open" : "close"}>
          <FontAwesomeIcon icon={faAngleDown} />
        </ButtonAccor>
      </HeaderAccordionButton>
      <Body className={show}>
        <ContentBody>
        {children}
        </ContentBody>
      </Body>
    </Container>
  );
};

const Container = styled.div`
  .open-angle {
    height: auto;
  }
  .close-angle {
    height: 0;
  }
  .open {
    transform: rotate(180deg);
  }
  .close {
    transform: rotate(0deg);
  }
  .active{
    background-color: var(--black-700);
  }

`;
const HeaderAccordionButton = styled.button`
  display: flex;
  align-items: center;
  padding: 7px 10px;
  gap: 5px;
  width: 100%;
  border-radius: .3em;
  margin: 3px 0;
  background-color: var(--black-600);
  transition: .2s;
  &:hover {
    background-color: var(--black-700);
  }
  h2 {
    margin: 0;
    padding: 0;
    font-size: 15px;
    
 
    font-weight: bold;
  }
  p {
    margin: 0;
    padding: 0;
    color: var(--write-400);
    margin-right: auto;
    font-size: 14px;
  }
`;
const ButtonAccor = styled.div`
  color: var(--write-400);
  width: 20px;
  height: 20px;
  transition: 0.3s;
`;
const Body = styled.div`
  transition: 0.2s;
  overflow: hidden;
  height: 0;
`;
const ContentBody = styled.div`
  border-radius: 0 0 5px 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px 0;
`
