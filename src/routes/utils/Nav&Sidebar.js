import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Nav } from "../../components/nav";
import { Sidebar } from "../../components/sidebar";
import { onChangeMethod } from "../../feactures/nav/navSlice";

export const NavRouterInclude = ({ children, navName }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onChangeMethod(navName));
  }, [navName]);

  return (
    <>
      <Nav></Nav>
      <Main>
        <NadbarContainer>
          <Sidebar />
        </NadbarContainer>
        <NavInvisible></NavInvisible>
        <MainCOntainer>{children}</MainCOntainer>
      </Main>
    </>
  );
};

export const NadbarRouterInclude = ({ children }) => {
  return (
    <>
      {/* <Nav /> */}
      <Main>{children}</Main>
    </>
  );
};
const MainCOntainer = styled.div`
  width: 100%;
`;
const Main = styled.div`
  max-width: var(--container-width);
  margin: 0 auto;
  display: flex;
  padding: 0.3rem 0.5rem;
`;
const NavInvisible = styled.div`
  min-width: 350px;
  @media (max-width: 788px) {
    min-width: 0px;
  }
`;
const NadbarContainer = styled.div`
  width: 350px;
  height: 100vh;
  position: fixed;
  overflow-y: auto;
  /* border-right: 1px solid var(--black-400); */
  z-index: var(--zIndex-15);
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 5px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--black-500);
    border-radius: 3px;
  }
  @media (max-width: 788px) {
    width: 0px;
    display: none;
    position: fixed;
  }
`;
