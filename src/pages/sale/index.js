import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

export default function Sale() {
  const [optionState, setOptionState] = useState("");
  const { option } = useParams();

  useEffect(() => {
    setOptionState(option);
  }, [option]);

  return (
    <div>
      <h1>Sale</h1>
      {optionState === "create" && (
        <Backgroun data-aos="fade">
          <h1>Create New</h1>
          <Link to="/sale">Sale</Link>
        </Backgroun>
      )}
    </div>
  );
}
const Backgroun = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
`;
