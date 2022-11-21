import { useState } from "react";

import styled from "styled-components";
import { ButtomItem } from "./utils/buttonItem";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const [shownav, setShownav] = useState(true);
  const navData = useSelector((state) => state.nav);

  const [styles, setStyles] = useState({
    asidebarNav: "450px",
  });

  const handleNavHeigth = () => {
    if (shownav) {
      setStyles({ asidebarNav: "initial" });
    } else {
      setStyles({ asidebarNav: "450px" });
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
            <LiSeparation />
            <LiItem>
              <ButtomItem
                UrlImg="https://firebasestorage.googleapis.com/v0/b/apexcorp-74590.appspot.com/o/icons%2Fhome.png?alt=media&token=6524fef5-aead-4977-bcda-8bbcab4f0e40"
                Text="Inicio"
                title="Inicio"
                to="/"
                Active={navData.value === "home" && true}
              />
            </LiItem>
            <LiItem>
              <ButtomItem
                UrlImg="https://firebasestorage.googleapis.com/v0/b/apexcorp-74590.appspot.com/o/icons%2Fhistory.png?alt=media&token=d603728a-30eb-4771-914a-359230e0ae87"
                Text="Recientes"
                title="Recientes"
                to="/recent"
                Active={navData.value === "recent" && true}
              />
            </LiItem>
            <LiItem>
              <ButtomItem
                UrlImg="https://firebasestorage.googleapis.com/v0/b/apexcorp-74590.appspot.com/o/icons%2Fproduct.png?alt=media&token=1695e712-de29-47a2-84b6-983db3e62663"
                Text="Inventario"
                title="Gestion de inventario"
                to="/inventory"
                Active={navData.value === "inventory" && true}
              />
            </LiItem>
            <LiItem>
              <ButtomItem
                UrlImg="https://firebasestorage.googleapis.com/v0/b/apexcorp-74590.appspot.com/o/icons%2Fcarrito-de-compras%20(1).png?alt=media&token=7bb45792-2f2f-4cae-b97a-8a2961a4d7fa"
                Text="Venta & servicio"
                to="/sale"
                Active={navData.value === "sale" && true}
              />
            </LiItem>
            <LiItem>
              <ButtomItem
                UrlImg="https://firebasestorage.googleapis.com/v0/b/apexcorp-74590.appspot.com/o/icons%2Fwallet.png?alt=media&token=bcf9188c-5b80-47ac-8444-a3763f76029b"
                Text="Billetera"
                title="Mi billetera digital"
                to="/wallet"
                Active={navData.value === "wallet" && true}
              />
            </LiItem>
            <LiItem>
              <ButtomItem
                UrlImg="https://firebasestorage.googleapis.com/v0/b/apexcorp-74590.appspot.com/o/icons%2Fofert.png?alt=media&token=5d484ce4-b362-48f1-951b-778fa4a837b5"
                Text="Oferta"
                title="Ofertas"
                to="/ofert"
                Active={navData.value === "ofert" && true}
              />
            </LiItem>
            <LiItem>
              <ButtomItem
                UrlImg="https://firebasestorage.googleapis.com/v0/b/apexcorp-74590.appspot.com/o/icons%2Freport.png?alt=media&token=23f89189-8660-4ec0-92b5-931f90c310d1"
                Text="Reporte"
                title="Reportes"
                to="/report"
                Active={navData.value === "report" && true}
              />
            </LiItem>
            <LiItem>
              <ButtomItem
                UrlImg="https://firebasestorage.googleapis.com/v0/b/apexcorp-74590.appspot.com/o/icons%2Fsupplier.png?alt=media&token=e7682fbd-0820-48f4-9fb2-6a8368187a50"
                Text="Proveedores"
                title="Proveedores"
                to="/supplier"
                Active={navData.value === "supplier" && true}
              />
            </LiItem>
            <LiItem>
              <ButtomItem
                UrlImg="https://firebasestorage.googleapis.com/v0/b/apexcorp-74590.appspot.com/o/icons%2Fuser.png?alt=media&token=c1298da4-a263-4397-b6eb-a1ef897f8406"
                Text="Usuarios (Empleados)"
                to="/users"
                Active={navData.value === "user" && true}
              />
            </LiItem>
            <LiItem>
              <ButtomItem
                UrlImg="https://firebasestorage.googleapis.com/v0/b/apexcorp-74590.appspot.com/o/icons%2Ffavorite.png?alt=media&token=0b3705a2-bbc2-4cdc-a5cd-49298bdb6070"
                Text="Favoritos"
                to="/favorites"
                Active={navData.value === "favorite" && true}
              />
            </LiItem>
          </UlList>
          <UlList2>
            <LiItem>
              <ButtomItem
                title={shownav ? "Mostrar mas" : "Mostrar menos"}
                onClick={handleNavHeigth}
                UrlImg={
                  shownav
                    ? "https://firebasestorage.googleapis.com/v0/b/apexcorp-74590.appspot.com/o/icons%2FmoreBottom.png?alt=media&token=07638091-0906-4994-9aee-bd427eba6dc9"
                    : "https://firebasestorage.googleapis.com/v0/b/apexcorp-74590.appspot.com/o/icons%2FmoreTop.png?alt=media&token=2e172d25-0ec2-419f-8f1a-15c1b4dd822c"
                }
                Text={shownav ? "Ver mas" : "Ver menos"}
              />
            </LiItem>
          </UlList2>
          {/* <h2>Acceso confidencial</h2> */}
          <LiSeparation />
          <UlList>
            <LiItem>
              <ButtomItem
                UrlImg="https://firebasestorage.googleapis.com/v0/b/apexcorp-74590.appspot.com/o/icons%2Fhelp.png?alt=media&token=98d95e26-df3d-415b-8277-f1e73471464f"
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
                <LiItemFooter>·</LiItemFooter>
                <LiItemFooter>
                  <span>
                    Design inspired by{" "}
                    <a target="__blank" href="https://www.facebook.com">
                      Facebook
                    </a>
                  </span>
                </LiItemFooter>
              </FooterList>
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
  overflow: hidden;
`;
const UlList2 = styled.ul`
  padding-right: 10px;
`;
const LiItem = styled.li`
  margin: 1px 0;
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
  margin-top: 10px;
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
  margin: 0.3rem 0;
`;
