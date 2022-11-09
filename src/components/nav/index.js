import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

// others components
import { faChartSimple, faHome } from "@fortawesome/free-solid-svg-icons";
import { ButtomItem } from "./utils/utils.nav";
import Searsh from "../form/searsh";

export const Nav = () => {
  const navigate = useNavigate();

  return (
    <>
      <ContainerNadbar>
        <NavBar>
          <LogoApex>
            <Link to="/">
              <img src="/icons-custom/apex.png" alt="" />
            </Link>
          </LogoApex>
          <SearshInputContainer>
            <Searsh />
          </SearshInputContainer>
          <NavContainer>
            <ULList>
              <LiItem>
                <ButtomItem
                  onClick={() => navigate("/")}
                  icon={faHome}
                  title="Inicio"
                />
              </LiItem>
              <LiItem>
                <ButtomItem
                  title="Reporte"
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
                <ButtomItem title='Yo' urlImg={"/assets/no-profile.png"} />
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
  z-index: 100;
  border-bottom: 1px solid var(--black-700);
  box-shadow: 0 10px 20px 1px rgba(0, 0, 0, 0.2);
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
  a {
    display: flex;
    img {
      min-width: 25px;
      width: 25px;
      height: 25px;
    }
  }
`;
const SearshInputContainer = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
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
