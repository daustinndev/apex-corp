import { useState } from "react";

import styled from "styled-components";
import { ButtomItem } from "./utils/buttonItem";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const [shownav, setShownav] = useState(true);
  const navData = useSelector((state) => state.nav);

  const [styles, setStyles] = useState({
    asidebarNav: "350px",
  });

  const handleNavHeigth = () => {
    if (shownav) {
      setStyles({ asidebarNav: "initial" });
    } else {
      setStyles({ asidebarNav: "350px" });
    }
    setShownav(!shownav);
  };
  return (
    <>
      <Container>
        <ScrollNav>
          {/* <h2>Navegacion</h2> */}
          <UlList style={{ height: styles.asidebarNav }} shownav={shownav}>
            <LiItem>
              <ButtomItem
                UrlImgProfile="/assets/7da95901639f310cc8397f195ba1382d.jpg"
                Text="Mi cuenta"
                title="Yo"
                Active={navData.value === "userProfile" && true}
                to="/user/298492842928429824"
              />
            </LiItem>
            {/* <LiSeparation /> */}

            <LiItem>
              <ButtomItem
                UrlImg="home"
                Text="Inicio"
                title="Inicio"
                to="/"
                Active={navData.value === "home" && true}
              />
            </LiItem>
            <LiItem>
              <ButtomItem
                UrlImg="history"
                Text="Recientes"
                title="Recientes"
                to="/recent"
                Active={navData.value === "recent" && true}
              />
            </LiItem>
            <LiItem>
              <ButtomItem
                UrlImg="product"
                Text="Inventario"
                title="Gestion de inventario"
                to="/inventory"
                Active={navData.value === "inventory" && true}
              />
            </LiItem>
            <LiItem>
              <ButtomItem
                UrlImg="carrito-de-compras (1)"
                Text="Venta & servicio"
                to="/sale"
                Active={navData.value === "sale" && true}
              />
            </LiItem>
            <LiItem>
              <ButtomItem
                UrlImg="ofert"
                Text="Oferta"
                title="Ofertas"
                to="/ofert"
                Active={navData.value === "ofert" && true}
              />
            </LiItem>
            <LiItem>
              <ButtomItem
                UrlImg="report"
                Text="Reporte"
                title="Reportes"
                to="/report"
                Active={navData.value === "report" && true}
              />
            </LiItem>
            <LiItem>
              <ButtomItem
                UrlImg="supplier"
                Text="Proveedores"
                title="Proveedores"
                to="/supplier"
                Active={navData.value === "supplier" && true}
              />
            </LiItem>
            <LiItem>
              <ButtomItem
                UrlImg="user"
                Text="Usuarios (Empleados)"
                to="/user"
                Active={navData.value === "user" && true}
              />
            </LiItem>
          </UlList>
          <UlList2>
            <LiItem>
              <ButtomItem
                title={shownav ? "Mostrar mas" : "Mostrar menos"}
                onClick={handleNavHeigth}
                UrlImg={shownav ? "moreBottom" : "moreTop"}
                Text={shownav ? "Ver mas" : "Ver menos"}
              />
            </LiItem>
          </UlList2>
          {/* <h2>Acceso confidencial</h2> */}
          <LiSeparation />
          <UlList>
            <LiItem>
              <ButtomItem
                UrlImg="wallet"
                Text="Billetera"
                title="Mi billetera digital"
                to="/wallet"
                Active={navData.value === "wallet" && true}
              />
            </LiItem>
            <LiItem>
              <ButtomItem
                UrlImg="help"
                Text="Ayuda"
                title="Soporte tecnico"
                to="/help"
                Active={navData.value === "help" && true}
              />
            </LiItem>
            <LiItem>
              <FooterList>
                <LiItemFooter>
                  <span>Apex © 2022</span>
                </LiItemFooter>
                <LiItemFooter>·</LiItemFooter>
                <LiItemFooter>
                  <a href="">Español</a>
                </LiItemFooter>
                <LiItemFooter>·</LiItemFooter>
                <LiItemFooter>
                  <a href="">Terminos</a>
                </LiItemFooter>
                <LiItemFooter>·</LiItemFooter>
                <LiItemFooter>
                  <a href="">Mi empresa</a>
                </LiItemFooter>
                <LiItemFooter>·</LiItemFooter>
                <LiItemFooter>
                  <a href="">Privacidad</a>
                </LiItemFooter>
                <LiItemFooter>·</LiItemFooter>
                <LiItemFooter>
                  <a href="">Seguridad</a>
                </LiItemFooter>
              </FooterList>
            </LiItem>
            <LiItem>
              <ButtomItem disabled />
            </LiItem>
          </UlList>
        </ScrollNav>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 10px;
  h2 {
    text-align: left;
    font-size: var(--size-14);
    padding: 0.4rem 0;
  }
`;
const ScrollNav = styled.div`
  overflow-y: auto;
`;
const UlList = styled.ul`
  padding-right: 10px;
  overflow: hidden;
`;
const UlList2 = styled.ul`
  padding-right: 10px;
  margin-top: 0.2rem;
`;
const LiItem = styled.li`
  margin-bottom: 5px;
  > ul {
    padding: 0;
    margin-bottom: 20px;
  }
  a {
    text-decoration: none !important;
  }
`;
const FooterList = styled.ul`
  flex-wrap: wrap;
  display: flex;
  align-items: center;

  padding: 0 10px !important;
`;
const LiItemFooter = styled.li`
  font-size: var(--size-12);
  color: var(--write-400);
  line-height: 1rem;
  margin-right: 3px;
  a {
    color: var(--write-400);
    transition: 0.1s;
    &:hover {
      text-decoration: underline !important;
    }
  }
`;
const LiSeparation = styled.div`
  background-color: var(--black-400);
  height: 1px;
  margin-bottom: 0.3rem;
`;
