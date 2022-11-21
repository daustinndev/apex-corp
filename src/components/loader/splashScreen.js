import React from "react";
import styled from "styled-components";

export default function SplashScreen() {
  return (
    <div data-aos="fade">
      <Container>
        <LogoCenter>
          <svg width="57"  height="57" viewBox="0 0 57 57" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M57 28.5C57 12.77041626 44.22958374 0 28.5 0 12.77042389 0 0 12.77041626 0 28.5S12.77042389 57 28.5 57C44.22958374 57 57 44.22958374 57 28.5zM45.5721283 10.94717407C25.33522034 8.4487915 8.222435 25.79951477 11 46c20.2879181 2.53599548 37.53599548-14.7120819 35-35l-.4278717-.05282593z"
            />
          </svg>
        </LogoCenter>
        <Fotter>
          <p>
            <span>F</span>
            <span>R</span>
            <span>O</span>
            <span>M</span>
          </p>
          <h1>
            DAUSTINN
          </h1>
        </Fotter>
      </Container>
    </div>
  );
}

const Container = styled.div`
  height: 100vh;
  position: relative;
  position: fixed;
  width: 100%;
  background-color: var(--black-200);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LogoCenter = styled.div`
  color: var(--blue-100);
  animation: rotate 2s linear infinite;
  @keyframes rotate {
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);

    }
  }
`;
const Fotter = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  p{
    color: var(--write-600);
    display: flex;
    align-items: center;
    gap: 15px;
  }
  h1{
    font-weight: 500;
  }
`;
