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
        <MainCOntainer>{children}</MainCOntainer>
      </Main>
    </>
  );
};


const MainCOntainer = styled.div`
  width: 100%;
  margin: 15px 10px;
  padding-left: 21rem;
`;
const Main = styled.div`
  max-width: var(--container-home);
  margin: 0 auto;
  display: flex;
  padding: 0.2rem 0.4rem;
`;
const NadbarContainer = styled.div`
  width: 21rem;
  top: 57px;
  bottom: 0;
  position: fixed;
  overflow-y: auto;
  /* border-right: 1px solid var(--black-400); */
  z-index: var(--zIndex-15);
  &::-webkit-scrollbar-thumb{
    background-color: transparent;
  }
  &:hover::-webkit-scrollbar-thumb{
    background: var(--black-800);
  }
  @media (max-width: 788px) {
    width: 0px;
    display: none;
    position: fixed;
  }
`;
