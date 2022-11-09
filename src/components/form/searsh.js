import {
  faArrowLeft,
  faClockRotateLeft,
  faLeftLong,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Searsh() {
  const [focus, setFocus] = useState(false);
  const [focus2, setFocus2] = useState(false);

  const [text, setText] = useState("");
  const [data, setdata] = useState([
    {
      id: "001",
      text: "Hola",
    },

    {
      id: "002",
      text: "Busqueda 2",
    },

    {
      id: "003",
      text: "Busqueda numero 3",
    },
    {
      id: "004",
      text: "Busqueda numero 4 wueihsuifeho qdqfwqfqfqw f q f q f q f q wf gg 2g 2g g4  2g4 g4",
    },
  ]);
  const [style, setStyle] = useState({
    width_btn: "0px",
    margin_left_btn: "0px",
  });

  const handleFocuInput = () => {
    setFocus(true);
    setStyle({
      width_btn: "40px",
      margin_left_btn: "-40px",
    });
  };
  const handleFocus = () => {
    if (focus2) {
      setFocus(true);
    } else {
      setFocus(false);
      setStyle({
        width_btn: "0px",
        margin_left_btn: "0px",
      });
    }
  };
  const handleFocus2 = () => {
    setFocus2(true);
  };
  const handleFocus3 = () => {
    setFocus2(false);
    setFocus(false);
    setStyle({
      width_btn: "0px",
      margin_left_btn: "0px",
    });
  };
  const handeSubmit = (e) => {
    e.preventDefault();
    console.log(text);
    setdata([{ id: data.length, text: text }, ...data]);
    setText("");
  };
  const handdelChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
    handleFocuInput();
  };

  return (
    <>
      <ContainerSearsh>
        <Content>
          <form onSubmit={handeSubmit}>
            <Input
              autoComplete="off"
              id="sers-inpt-app"
              placeholder="Buscar en el sistema"
              onFocus={handleFocuInput}
              onBlur={handleFocus}
              onChange={handdelChange}
              value={text}
            />
            <IconSearsh className="icon-searsh">
              <label htmlFor="sers-inpt-app">
                {/* <FontAwesomeIcon icon={faSearch} /> */}
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  width="1em"
                  height="1em"
                >
                  <g  transform="translate(-448 -544)">
                    <g>
                      <path
                        d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z"
                        transform="translate(448 544)"
                      ></path>
                      <path
                        d="M10.39 8.75a2.94 2.94 0 0 0-.199.432c-.155.417-.23.849-.172 1.284.055.415.232.794.54 1.103a.75.75 0 0 0 1.112-1.004l-.051-.057a.39.39 0 0 1-.114-.24c-.021-.155.014-.356.09-.563.031-.081.06-.145.08-.182l.012-.022a.75.75 0 1 0-1.299-.752z"
                        transform="translate(448 544)"
                      ></path>
                      <path
                        d="M9.557 11.659c.038-.018.09-.04.15-.064.207-.077.408-.112.562-.092.08.01.143.034.198.077l.041.036a.75.75 0 0 0 1.06-1.06 1.881 1.881 0 0 0-1.103-.54c-.435-.058-.867.018-1.284.175-.189.07-.336.143-.433.2a.75.75 0 0 0 .624 1.356l.066-.027.12-.061z"
                        transform="translate(448 544)"
                      ></path>
                      <path
                        d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182zm.617-.616.444-.444a.31.31 0 0 0-.063-.052c-.093-.055-.263-.055-.35.024l.208.232.207-.206.006.007-.22.257-.026-.024.033-.034.025.027-.257.22-.007-.007zm-.027-.415c-.078.088-.078.257-.023.35a.31.31 0 0 0 .051.063l.205-.204-.233-.209z"
                        transform="translate(448 544)"
                      ></path>
                    </g>
                  </g>
                </svg>
              </label>
            </IconSearsh>
          </form>
        </Content>
        {focus && (
          <ResultSearshContainer
            onMouseEnter={handleFocus2}
            onMouseLeave={handleFocus3}
            data-aos="fade-down"
            data-aos-duration="200"
          >
            <ListItems>
              {/* <ItemRecentDefault>
                <IconItem>
                  <FontAwesomeIcon icon={faClockRotateLeft} />
                </IconItem>
                <TextItem>No hay búsquedas recientes</TextItem>
              </ItemRecentDefault> */}
              <Title>
                <h2>Busquedas recientes</h2>
                <Link>Editar</Link>
              </Title>
              {data.slice(0, 8).map((item) => (
                <a key={item.id} href="#">
                  <ItemRecent>
                    <IconItem>
                      {/* <FontAwesomeIcon icon={faClockRotateLeft} /> */}
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        id="_24x24_On_Light_Recent"
                        data-name="24x24/On Light/Recent"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                      >
                        <rect
                          id="view-box"
                          width="24"
                          height="24"
                          fill="none"
                        />
                        <path
                          id="Shape"
                          d="M9.682,18.75a.75.75,0,0,1,.75-.75,8.25,8.25,0,1,0-6.189-2.795V12.568a.75.75,0,0,1,1.5,0v4.243a.75.75,0,0,1-.751.75H.75a.75.75,0,0,1,0-1.5H3a9.75,9.75,0,1,1,7.433,3.44A.75.75,0,0,1,9.682,18.75Zm2.875-4.814L9.9,11.281a.754.754,0,0,1-.22-.531V5.55a.75.75,0,1,1,1.5,0v4.889l2.436,2.436a.75.75,0,1,1-1.061,1.06Z"
                          transform="translate(1.568 2.25)"
                        />
                      </svg>
                    </IconItem>
                    <TextItem>{item.text.slice(0, 45)}</TextItem>
                    <IconItemDelete>
                      <FontAwesomeIcon icon={faXmark} />
                    </IconItemDelete>
                  </ItemRecent>
                </a>
              ))}
            </ListItems>
          </ResultSearshContainer>
        )}
      </ContainerSearsh>
      <BtnLeft
        style={{ width: style.width_btn, marginLeft: style.margin_left_btn }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </BtnLeft>
    </>
  );
}
const BtnLeft = styled.button`
  background-color: var(--nav);

  width: 40px;
  height: 40px;
  color: var(--write-300);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  svg {
    width: 18px;
    height: 18px;
  }
  width: 0;
`;
const ContainerSearsh = styled.div`
  background-color: var(--nav);
  border-radius: 10px;
  padding: 0.5rem 0rem;
  padding-right: 13px;
`;
const Content = styled.div`
  width: var(--width-searsh);
  position: relative;
`;
const IconSearsh = styled.div`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: var(--write-300);
  transition: 0.2s;
  width: 10px;
`;
const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  height: 40px;
  border-radius: 20px;
  background-color: var(--black-700);
  border: 0;
  outline: 0;
  color: var(--write-100);
  font-size: 15px;
  padding-left: 40px;
  transition: 0.2s;
  font-family: inherit;

  &::placeholder {
    color: #b0b3ac;
  }
  &:focus ~ .icon-searsh {
    /* display: none !important; */
    opacity: 0 !important;
    overflow: hidden;
    width: 0 !important;
  }
  &:focus {
    padding-left: 15px;
  }
`;
const ResultSearshContainer = styled.div`
  background-color: var(--nav);
  left: 0;
  position: absolute;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  width: calc(var(--width-searsh) + 60px);
  box-shadow: 10px 0 20px 1px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: -1;
`;
const ListItems = styled.div`
  a {
    text-decoration: none;
  }
  div {
    height: 50px;
    border-radius: 5px;
  }
  max-height: 600px;
  overflow-y: auto;
`;
const ItemRecentDefault = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  > div {
    background-color: transparent;
  }
`;
const IconItem = styled.div`
  width: 35px !important;
  min-width: 35px !important;
  text-align: center;
  background-color: var(--black-300);
  height: 35px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50% !important;
  svg {
    color: var(--write-500);
  }
`;
const TextItem = styled.p`
  font-size: 13px;
  color: var(--write-600);
`;
const ItemRecent = styled.div`
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0 10px;
  &:hover {
    background-color: var(--black-500);
  }
  p {
    color: var(--write-100);
  }
`;
const IconItemDelete = styled.div`
  margin-left: auto;
  width: 30px !important;
  min-width: 30px !important;
  height: 30px !important;
  text-align: center;
  svg {
    color: var(--write-500);
    width: 15px;
    height: 15px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50% !important;
  &:hover {
    background-color: var(--black-700);
  }
`;
const Title = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
  h2 {
    font-size: 16px;
    font-weight: 600;
    font-family: inherit;
  }
  a {
    margin-left: auto;
    padding-right: 5px;
    &:hover {
      text-decoration: underline;
    }
  }
`;
