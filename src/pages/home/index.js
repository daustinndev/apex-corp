import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CardHome from "./utils/card";

export default function Home() {
  const [optionn, setOption] = useState("");
  const {option } = useParams();

  useEffect(()=>{
    setOption(option)
  }, [option])
  return (
      <Container data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay="100"
      data-aos-duration="500">
        <Content>
          <h1>{optionn}</h1>
          <Cards>
            <CardHome/>
            <CardHome/>
            <CardHome/>
            <CardHome/>
            <CardHome/>
          </Cards>
        </Content>
      </Container>
  );
}
const Container = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
`;
const Content = styled.div`
  h1{
    text-align: center;
  }
`;
const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;
