import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LoaderCircle } from "../loader/loaderComponets";

export const Eclipsis = ({
  type,
  disabled,
  title,
  onClick,
  styled,
  icon,
  iconSvg,
  imageUrl,
  imageLink,
  autoFocus,
  statu,
  className,
  text,
  loading,
}) => {
  const [textHover, setTextHover] = useState(false);
  return (
    <Container>
      <Button
        disabled={disabled}
        autoFocus={autoFocus}
        onClick={() => {setTextHover(false); onClick()}}
        style={styled}
        className={`${className} ${statu} ${disabled && "disabled"}`}
        onMouseEnter={() => setTextHover(true)}
        onMouseLeave={() => setTextHover(false)}
      >
        {loading ? (
          <LoaderCircle />
        ) : (
          <>
            {icon && (
              <IconContainer>
                <FontAwesomeIcon icon={icon} />
              </IconContainer>
            )}
            {iconSvg && <IconSvgContainer>{iconSvg}</IconSvgContainer>}
            {imageUrl && (
              <Link to={imageLink}>
                <ContainerImage>
                  <img src={imageUrl} />
                </ContainerImage>
              </Link>
            )}
            {text && <span>{text}</span>}
          </>
        )}
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
    </Container>
  );
};

const TextAbsolute = styled.div`
  position: absolute;
  background-color: var(--write-400);
  border-radius: 5px;
  padding: 2px 8px;
  top: 45px;
  right: -10%;
  z-index: 100;
  transform: translateX(-10%);
  span {
    font-size: 12px;
    color: var(--black-500);
  }
`;

const Container = styled.div`
  position: relative;
  .primary {
    background-color: var(--blue-400);
    color: var(--write-000);
    &:hover {
      background-color: var(--blue-500);
      color: var(--write-000);
    }
  }
  .small {
    min-width: 33px !important;
    min-height: 33px !important;
    svg {
      width: 15px;
      height: 15px;
      transition: 0.1s;
    }
  }
  .true {
    background-color: var(--ligth-blue-100);
    color: var(--blue-400);
    &:hover {
      background-color: var(--ligth-blue-100);
      color: var(--blue-400);
    }
  }
  .disabled {
    cursor: default;
    opacity: 0.7;
  }
`;
const Button = styled.button`
  background-color: var(--black-600);
  border-radius: 50%;
  min-width: 40px;
  min-height: 40px;
  color: var(--write-300);
  display: flex;
  align-items: center;
  transition: 0.1s;
  justify-content: center;
  &:hover {
    background-color: var(--black-700);
    color: var(--write-500);
  }
  &:focus {
    background-color: var(--black-800);
  }
  svg {
    width: 22px;
    height: 22px;
    transition: 0.1s;
  }
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;
const IconSvgContainer = styled.div``;
const ContainerImage = styled.div``;

export const ButtonRectangle = ({
  onClick,
  icon,
  children,
  urlImg,
  IconImg,
  iconImgHref,
  className,
  ColorText,
  loading,
  disabled,
  iconColor,
  title,
  type,
  onDoubleClick,
  href,
}) => {
  return (
    <>
      <ButonContainer ColorText={ColorText}>
        {href ? (
          <Link title={title ? title : loading ? "Cargando" : ""} to={href}>
            {IconImg && (
              <IconImgDiv>
                <a href={iconImgHref}>
                  <img src={IconImg} alt={IconImg} />
                </a>
              </IconImgDiv>
            )}
            <Button2
              iconImg={IconImg}
              onDoubleClick={onDoubleClick}
              type={type}
              disabled={disabled ? true : loading ? true : false}
              className={className}
              onClick={onClick}
            >
              {loading ? (
                <IframeLoder>
                  <LoaderCircle />
                </IframeLoder>
              ) : (
                <>
                  {icon && (
                    <IconBtn iconColor={iconColor}>
                      <FontAwesomeIcon icon={icon} />
                    </IconBtn>
                  )}
                  {children && <span>{children}</span>}
                </>
              )}
            </Button2>
          </Link>
        ) : (
          <>
            {IconImg && (
              <IconImgDiv>
                <a href={iconImgHref}>
                  <img src={IconImg} alt={IconImg} />
                </a>
              </IconImgDiv>
            )}
            <Button2
              iconImg={IconImg}
              onDoubleClick={onDoubleClick}
              title={title ? title : loading ? "Cargando" : ""}
              type={type}
              disabled={disabled ? true : loading ? true : false}
              className={className}
              onClick={onClick}
            >
              {loading ? (
                <IframeLoder>
                  <LoaderCircle />
                </IframeLoder>
              ) : (
                <>
                  {icon && (
                    <IconBtn iconColor={iconColor}>
                      <FontAwesomeIcon icon={icon} />
                    </IconBtn>
                  )}
                  {children && <span>{children}</span>}
                </>
              )}
            </Button2>
          </>
        )}
      </ButonContainer>
    </>
  );
};
const IconImgDiv = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 7px;
  width: 20px;
  height: 20px;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  a {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
const IframeLoder = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  padding: 2px 0;
  align-items: center;
`;
const ButonContainer = styled.div`
  .primary {
    background: var(--blue-600);
    border: 1px solid var(--blue-600);
    color: ${(props) =>
      props.ColorText ? props.ColorText : "var(--write-100)"};
    &:hover {
      background: var(--blue-700);
      border: 1px solid var(--blue-700);
    }
  }
  .success {
    background: var(--green-700);
    border: 1px solid var(--green-800);
    color: ${(props) =>
      props.ColorText ? props.ColorText : "var(--write-100)"};
    &:hover {
      background: var(--green-800);
    }
  }
  .default {
    background: var(--black-600);
    border: 1px solid var(--black-600);
    color: ${(props) =>
      props.ColorText ? props.ColorText : "var(--write-100)"};
    &:hover {
      background: var(--black-700);
      border: 1px solid var(--black-700);
    }
  }
  .warning {
    background: var(--yellow-500);
    border: 1px solid var(--yellow-500);
    color: ${(props) =>
      props.ColorText ? props.ColorText : "var(--write-100)"};
    &:hover {
      background: var(--yellow-600);
      border: 1px solid var(--yellow-500);
    }
  }
  .error {
    background: var(--red-400);
    border: 1px solid var(--red-500);
    color: ${(props) =>
      props.ColorText ? props.ColorText : "var(--write-100)"};
    &:hover {
      background: var(--red-500);
      border: 1px solid var(--red-500);
    }
  }
  .lg {
    padding: 0.5rem 1rem;
  }
  a {
    text-decoration: none;
  }
`;
const Button2 = styled.button`
  width: 100%;
  border: 0;
  border-radius: 0.3rem;
  cursor: pointer;
  background-color: var(--black-600);
  color: var(--write-500);
  transition: 0.1s;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  height: 35px;
  font-size: var(--size-14);
  padding-left: ${(props) => (props.iconImg ? "2rem" : ".6rem")};
  position: relative;
  &:hover {
    background-color: var(--black-800);
  }
  img {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
`;
const IconBtn = styled.div`
  width: 12px;
  height: 12px;
  overflow: hidden;
  display: flex;
  color: ${(props) => (props.iconColor ? props.iconColor : "white")};
  align-items: center;
  margin-right: 5px;
  svg {
    max-width: 100%;
    max-height: 100%;
  }
`;
