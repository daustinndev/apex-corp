import React from "react";
import styled from "styled-components";

export const LoaderCircle = () => {
  return (
    <>
      <LoaderCirclecontainer>
        <div className="showbox">
          <div className="loader">
            <svg className="circular" viewBox="25 25 50 50">
              <circle className="path" cx="50" cy="50" r="20" fill="none" />
            </svg>
          </div>
        </div>
      </LoaderCirclecontainer>
    </>
  );
};
export const LoaderTable = () => {
  return (
    <>
      <LoaderCirclecontainerTable>
        <div className="loader"></div>
      </LoaderCirclecontainerTable>
    </>
  );
};

export const LoaderRelative = () => {
  return (
      <>
          <LoaderRelativeContainer>
              <div className="showbox">
                  <div className="loader">
                      <svg className="circular" viewBox="25 25 50 50">
                          <circle className="path" cx="50" cy="50" r="20" fill="none" />
                      </svg>
                  </div>
              </div>
          </LoaderRelativeContainer>
      </>
  )
}
const LoaderRelativeContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(122, 122, 122,0.5);
    border-radius: 5px;
    .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0 auto;
        width: 50px;
        height: 50px;
        z-index: 100;
        &:before {
        content: '';
        display: block;
        }
    }

    .circular {
    animation: rotate 2s linear infinite;
    transform-origin: center center;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    }

    .path {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
        stroke-linecap: round;
        stroke-width: 5;
    }

    @keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
    }

    @keyframes dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
    }
    }

    @keyframes color {
    100%,
    0% {
        stroke: #fff;
    }
    40% {
        stroke: #fff;
    }
    66% {
        stroke:  #fff;
    }
    80%,
    90% {
        stroke:   #fff;
    }
    }
`
const LoaderCirclecontainerTable = styled.div`
    .loader{
       height: 30px;
       background-color: var(--black-300);
       border-radius: 5px;
       animation: loader 1s linear infinite alternate-reverse;
    }
    @keyframes loader{
        0% {
            background-color: var(--black-500);
        }
        100% {
            background-color: var(--black-300);
        }
    }
`;
const LoaderCirclecontainer = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .loader {
    width: 20px;
    height: 20px;
    svg{
      width: 100%;
      height: 100%;
    }
  }

  .circular {
    animation: rotate 2s linear infinite;
    transform-origin: center center;
  }

  .path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
    stroke-width: 6;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }

  @keyframes color {
    100%,
    0% {
      stroke: var(--write-400); // #d62d20;
    }
    40% {
      stroke: var(--write-400); // #0057e7;
    }
    66% {
      stroke: var(--write-400); //#008744;
    }
    80%,
    90% {
      stroke: var(--write-400); //#ffa700;
    }
  }
`;
