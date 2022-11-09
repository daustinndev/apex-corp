import react, { useState } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

export const ButtomItem = ({
  to,
  onClick,
  UrlImgProfile,
  UrlImg,
  Text,
  ClasName,
  Active,
  title,
  disabled,
}) => {
  const [textHover, setTextHover] = useState(false);
  return (
    <>
      <div style={{ position: "relative" }}>
        {to ? (
          <Link to={to}>
            <ButtonBtn
              onMouseEnter={() => setTextHover(true)}
              onMouseLeave={() => setTextHover(false)}
              // title={title}
              Active={Active}
              ClasName={ClasName}
              onClick={onClick}
              disabled={disabled && true}
              Disabled={disabled}
            >
              <Icon UrlImgProfile={UrlImgProfile}>
                {UrlImg && (
                  <img src={"/icons-custom/" + UrlImg + ".png"} alt={Text} />
                )}
                {UrlImgProfile && <img src={UrlImgProfile} alt={Text} />}
              </Icon>
              <SpanText>{Text}</SpanText>
            </ButtonBtn>
          </Link>
        ) : (
          <ButtonBtn
            // title={title}
            Active={Active}
            ClasName={ClasName}
            onClick={onClick}
            disabled={disabled && true}
            Disabled={disabled}
            onMouseEnter={() => setTextHover(true)}
            onMouseLeave={() => setTextHover(false)}
          >
            <Icon UrlImgProfile={UrlImgProfile}>
              {UrlImg && (
                <img src={"/icons-custom/" + UrlImg + ".png"} alt={Text} />
              )}
              {UrlImgProfile && <img src={UrlImgProfile} alt={Text} />}
            </Icon>
            <SpanText>{Text}</SpanText>
          </ButtonBtn>
        )}
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
      </div>
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
  span {
    font-size: 12px;
    color: var(--black-500);
  }
`;
const ButtonBtn = styled.button`
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.Active ? "var(--black-500)" : "transparent"};
  border-radius: 8px;
  width: 100%;
  border: transparent;
  cursor: ${(props) => (props.Disabled ? "default" : "pointer")};
  padding: 6px 7px;
  transition: 0.2s;
  &:hover {
    background-color: ${(props) =>
      props.Disabled ? "transparent" : "var(--black-500)"};
  }
`;
const Icon = styled.div`
  min-width: 34px;
  max-width: 34px;
  height: 34px;
  overflow: hidden;
  border-radius: ${(props) => (props.UrlImgProfile ? "50%" : "0")};
  border: ${(props) =>
    props.UrlImgProfile ? "1px  solid var(--black-600)" : "0"};
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: auto;
  }
`;
const SpanText = styled.span`
  color: var(--write-200);
  font-size: 15px;
  margin-left: 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 500;
`;
