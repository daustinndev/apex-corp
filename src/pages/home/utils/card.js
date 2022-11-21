import React from "react";
import styled from "styled-components";

export default function CardHome() {
  return (
    <Container>
        
    </Container>
  );
}

const Container = styled.div`
    height: 200px;
    width: 350px;
    border: 1px solid var(--black-500);
    background-color: var(--black-500);
    border-radius: 10px;
    &:hover{
        border: 1px solid var(--black-700);
    }
`;
