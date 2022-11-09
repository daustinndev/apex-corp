import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ButtomItem = ({
  icon,
  onClick,
  text,
  urlImg,
  styled,
  title,
  iconSvg,
}) => {
  const [textHover, setTextHover] = useState(false);
  return (
    <>
      <ButonCircleContainer style={styled}>
        <Button
          // title={title}
          urlImg={urlImg}
          text={text}
          onClick={onClick && onClick}
          onMouseEnter={() => setTextHover(true)}
          onMouseLeave={() => setTextHover(false)}
        >
          {iconSvg && iconSvg}
          {icon && <FontAwesomeIcon icon={icon} />}
          {urlImg && <img src={urlImg && urlImg} />}
          {text && <span>{text}</span>}
        </Button>
        {title && textHover && (
          <TextAbsolute
          data-aos="fade"
          data-aos-delay="500"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="300"
          >
            <span>{title}</span>
          </TextAbsolute>
        )}
      </ButonCircleContainer>
    </>
  );
};
const TextAbsolute = styled.div`
  position: absolute;
  background-color: var(--write-400);
  border-radius: 5px;
  padding: 2px 8px;
  top: 45px;
  right: 0%;
  transform: translateX(-10%);
  span{
    font-size: 12px;
    color: var(--black-500);
  }
`;
const ButonCircleContainer = styled.div`
  position: relative;
  &:hover .snap {
    transform: translateY(0);
  }
`;
const Button = styled.div`
  background-color: var(--black-700);
  /* border: 1px solid var(--black-700); */
  border-radius: 20px;
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  color: #e7e9ed;
  cursor: pointer;
  transition: background-color 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: ${(props) => (props.urlImg ? "0" : "0 8px")};
  &:hover {
    background-color: var(--black-900);
    border: 1px solid var(--black-900);
  }
  svg {
    font-size: 16px;
  }
  span {
    padding: 0 0.3rem;
    font-size: var(--size-12);
    font-weight: bold;
  }
  img {
    max-width: 100%;
    height: auto;
  }
`;
