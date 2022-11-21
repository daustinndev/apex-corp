import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

// others components
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { ButtomItem } from "./utils/utils.nav";
import Searsh from "../form/searsh";
import { Eclipsis } from "../button";

export const Nav = () => {
  const navigate = useNavigate();

  // history
  const sitoryGo = () => {
    window.history.go(-1);
  };
  const history = () => {
    window.history.go(1);
  };

  return (
    <>
      <ContainerNadbar>
        <NavBar>
          <NavigateLeft>
            <Eclipsis
              onClick={sitoryGo}
              title="Volver"
              iconSvg={
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <g>
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                  </g>
                </svg>
              }
            />
            <Eclipsis
              onClick={history}
              title="Rehacer"
              iconSvg={
                <svg
                  style={{ transform: "rotate(180deg)" }}
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <g>
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                  </g>
                </svg>
              }
            />
          </NavigateLeft>
          <LogoApex>
            <a href="/">
              <img src="/icons-custom/apex.png" alt="" />
            </a>
          </LogoApex>
          <SearshInputContainer>
            <Searsh />
          </SearshInputContainer>
          <NavContainer>
            <ULList>
              <LiItem>
                <ButtomItem
                  onClick={() => navigate("/inventory/create")}
                  iconSvg={
                    <svg viewBox="0 0 512 512" fill="currentColor">
                      <path d="M104,160a56,56,0,1,1,56-56A56.06,56.06,0,0,1,104,160Z" />
                      <path d="M256,160a56,56,0,1,1,56-56A56.06,56.06,0,0,1,256,160Z" />
                      <path d="M408,160a56,56,0,1,1,56-56A56.06,56.06,0,0,1,408,160Z" />
                      <path d="M104,312a56,56,0,1,1,56-56A56.06,56.06,0,0,1,104,312Z" />
                      <path d="M256,312a56,56,0,1,1,56-56A56.06,56.06,0,0,1,256,312Z" />
                      <path d="M408,312a56,56,0,1,1,56-56A56.06,56.06,0,0,1,408,312Z" />
                      <path d="M104,464a56,56,0,1,1,56-56A56.06,56.06,0,0,1,104,464Z" />
                      <path d="M256,464a56,56,0,1,1,56-56A56.06,56.06,0,0,1,256,464Z" />
                      <path d="M408,464a56,56,0,1,1,56-56A56.06,56.06,0,0,1,408,464Z" />
                    </svg>
                  }
                  title="Add"
                />
              </LiItem>
              <LiItem>
                <ButtomItem
                  onClick={() => navigate("/sale/create")}
                  iconSvg={
                    <svg viewBox="0 0 512.015 512.015" fill="currentColor">
                      <g transform="translate(-1)">
                        <g>
                          <path
                            d="M470.348,63.274c-20.644,0-37.852,14.644-41.809,34.116l-25.653,8.551h-17.876V71.365
			c0-16.241-13.178-29.419-29.419-29.419H232.264l-5.987-20.16c-4.592-15.566-21.04-24.477-36.629-19.8L64.579,40.16
			c-15.422,4.603-24.268,20.932-19.703,36.482l9.348,29.313c-35.061,0.319-60.5,33.354-51.344,67.338l41.587,148.965
			c6.249,23.246,27.52,39.554,51.801,39.554l267.403,0.128c0.002,0,0.004,0,0.005,0c0.002,0,0.003,0,0.005,0
			c17.679,0,32,14.321,32,32s-14.321,32-32,32h-3.654c-8.784-24.858-32.474-42.667-60.346-42.667
			c-27.872,0-51.562,17.808-60.346,42.667h-71.308c-8.784-24.858-32.474-42.667-60.346-42.667S56.12,401.082,47.336,425.94H22.344
			c-11.782,0-21.333,9.551-21.333,21.333c0,11.782,9.551,21.333,21.333,21.333h24.992c8.784,24.858,32.474,42.667,60.346,42.667
			s51.562-17.808,60.346-42.667h71.308c8.784,24.858,32.474,42.667,60.346,42.667c27.872,0,51.562-17.808,60.346-42.667h3.654
			c41.243,0,74.667-33.423,74.667-74.667c0-32.416-20.652-59.99-49.515-70.314l36.006-180.029l17.205-5.735
			c7.531,6.682,17.438,10.745,28.304,10.745c23.573,0,42.667-19.093,42.667-42.667C513.015,82.367,493.922,63.274,470.348,63.274z
			 M107.682,468.607c-11.791,0-21.333-9.542-21.333-21.333s9.542-21.333,21.333-21.333c11.292,0,20.497,8.757,21.259,19.853
			c-0.034,0.491-0.075,0.98-0.075,1.48s0.041,0.989,0.075,1.48C128.178,459.85,118.973,468.607,107.682,468.607z M299.682,468.607
			c-11.791,0-21.333-9.542-21.333-21.333s9.542-21.333,21.333-21.333s21.333,9.542,21.333,21.333S311.473,468.607,299.682,468.607z
			 M342.344,84.613v21.327h-91.07l-6.334-21.327H342.344z M206.761,105.94H99.002l-9.209-28.866l99.385-30.334L206.761,105.94z
			 M85.617,310.982l-41.59-148.976c-1.815-6.739,3.346-13.4,10.706-13.4h28.683h151.786c0.053,0,0.104,0.006,0.157,0.006h128.32
			c0.043,0,0.084-0.006,0.127-0.006h16.522l-34.132,170.658l-249.916-0.12C91.286,319.146,86.909,315.79,85.617,310.982z"
                          />
                        </g>
                      </g>
                    </svg>
                  }
                  title="Venta Nueva"
                />
              </LiItem>

              <LiItem>
                <ButtomItem
                  title="Notificaciones"
                  iconSvg={
                    <svg
                      viewBox="0 0 28 28"
                      fill="currentColor"
                      height="20"
                      width="20"
                    >
                      <path d="M7.847 23.488C9.207 23.488 11.443 23.363 14.467 22.806 13.944 24.228 12.581 25.247 10.98 25.247 9.649 25.247 8.483 24.542 7.825 23.488L7.847 23.488ZM24.923 15.73C25.17 17.002 24.278 18.127 22.27 19.076 21.17 19.595 18.724 20.583 14.684 21.369 11.568 21.974 9.285 22.113 7.848 22.113 7.421 22.113 7.068 22.101 6.79 22.085 4.574 21.958 3.324 21.248 3.077 19.976 2.702 18.049 3.295 17.305 4.278 16.073L4.537 15.748C5.2 14.907 5.459 14.081 5.035 11.902 4.086 7.022 6.284 3.687 11.064 2.753 15.846 1.83 19.134 4.096 20.083 8.977 20.506 11.156 21.056 11.824 21.986 12.355L21.986 12.356 22.348 12.561C23.72 13.335 24.548 13.802 24.923 15.73Z"></path>
                    </svg>
                  }
                />
              </LiItem>
              <LiItem>
                <ButtomItem title="Yo" urlImg={"/assets/no-profile.png"} />
              </LiItem>
            </ULList>
          </NavContainer>
        </NavBar>
      </ContainerNadbar>
    </>
  );
};

const ContainerNadbar = styled.div`
  position: sticky;
  backdrop-filter: blur(10px);
  background-color: var(--nav);
  top: 0;
  z-index: 90;
  border-bottom: 1px solid var(--black-700);
  /* box-shadow: 0 10px 40px 1px rgba(0, 0, 0, 0.1); */
  border-bottom: 1px solid var(--black-600);
`;
const NavBar = styled.div`
  max-width: var(--container-width);
  padding: 0 0.8rem;
  margin: auto;
  display: flex;
  align-items: center;
`;
const LogoApex = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  a {
    display: flex;
    img {
      height: 40px;
      min-width: 40px;
    }
  }
`;
const SearshInputContainer = styled.div`
  width: 100%;
  display: flex;
`;
const NavContainer = styled.nav`
  margin-left: auto;
`;
const ULList = styled.ul`
  display: flex;
`;
const LiItem = styled.li`
  margin-left: 0.5rem;
  position: relative;
`;
const NavigateLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
