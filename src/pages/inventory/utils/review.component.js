import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LoaderCircle } from "../../../components/loader/loaderComponets";
import { db } from "../../../firebase/config";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import {
  FormatLineBreak,
  formatNumberMoney,
  HitoryGo,
  TimeAgoHourFormat,
} from "../../../hooks/hooks.utils";
import { Link } from "react-router-dom";
import { ColumnGrid, RowGrid } from "../../../components/grid";
import { ButtonRectangle, Eclipsis } from "../../../components/button";
import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";

export const ReviewComponent = ({ uid }) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});

  const [category, setCategory] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [unit_of_measurement, setUnit_of_measurement] = useState(null);

  async function getProduct() {
    let productTemp = {};

    const unsub = onSnapshot(doc(db, "inventory", uid), (doc) => {
      if (doc.exists) {
        productTemp = doc.data();
        setProduct({ ...productTemp });
        setLoading(false);
        getCategory(doc.data().category_uid);
        getSupplier(doc.data().supplier_uid);
        getUnit_of_measurement(doc.data().pricing.unit_of_measurement);
      }
    });
    return () => unsub();
  }
  async function getCategory(uid) {
    const docRef = doc(db, "categories", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCategory({
        ...docSnap.data(),
        uid: docSnap.id,
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  async function getSupplier(uid) {
    const docRef = doc(db, "suppliers", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setSupplier({
        ...docSnap.data(),
        uid: docSnap.id,
      });
    } else {
      console.log("No such document! supplier");
    }
  }
  async function getUnit_of_measurement(uid) {
    const docRef = doc(db, "unit_of_measurement", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUnit_of_measurement({
        ...docSnap.data(),
        uid: docSnap.id,
      });
    } else {
      console.log("No such document! getUnit_of_measurement");
    }
  }

  useEffect(() => {
    return () => {
      getProduct();
    };
  }, []);

  return (
    <>
      {loading ? (
        <LoaderCircle />
      ) : (
        <>
          <Container>
            <LeftContainer>
              {product.files.length > 0 ? (
                <Files>
                  <Splide
                    aria-label="My Favorite Images"
                    options={{
                      rewind: true,
                      width: 200,
                      gap: "0",
                    }}
                  >
                    {product.files.map((item, index) => (
                      <SplideSlide key={index}>
                        <FileSplite>
                          <div className="ContainerImage">
                            <img src={item.fileUri} alt="Image 1" />
                          </div>
                        </FileSplite>
                      </SplideSlide>
                    ))}
                  </Splide>
                </Files>
              ) : (
                <ContainerImageFound>
                  <span>Sin imagen</span>
                  <Link className="link-btn" to={"/inventory/u/" + uid}>
                    Agregar
                  </Link>
                </ContainerImageFound>
              )}
              {product.files.length > 0 && (
                <span
                  style={{
                    color: "var(--write-400)",
                    fontSize: "14px",
                    marginLeft: "5px",
                  }}
                >
                  {product.files.length} Imagenes
                </span>
              )}
            </LeftContainer>
            <RigthContainer>
              <ListItems>
                <ItemList>
                  <span>Marca: </span>
                  <p>{product.brand}</p>
                </ItemList>
                <ItemList>
                  <span>Modelo: </span>
                  <p>{product.model}</p>
                </ItemList>
                <ItemList>
                  <span>Qr: </span>
                  <p>{product.code_qr}</p>
                </ItemList>
                <ItemList>
                  <span>Ingreso: </span>
                  <p>{TimeAgoHourFormat(product.created_at)}</p>
                </ItemList>
                <ItemList>
                  <span>Autor: </span>
                  <Link className="link-btn">
                    <div className="container-img-prof">
                      <img
                        src="/assets/a83be8178f6be0095f506d3f94495f92.jpg"
                        alt=""
                      />
                    </div>
                    David Bendezu
                  </Link>
                </ItemList>
                <ItemList>
                  <span>Categoria: </span>
                  {category ? (
                    <p>{category.name}</p>
                  ) : (
                    <div
                      className="load"
                      style={{ height: "10px", width: "40px" }}
                    >
                      <LoaderCircle />
                    </div>
                  )}
                </ItemList>
                <ItemList>
                  <span>Proveedor: </span>
                  {supplier ? (
                    <Link
                      className="link-btn"
                      to={"/supplier/v/" + supplier.uid}
                    >
                      {supplier.business_name}
                    </Link>
                  ) : (
                    <div
                      className="load"
                      style={{ height: "10px", width: "40px" }}
                    >
                      <LoaderCircle />
                    </div>
                  )}
                </ItemList>
                <ItemSeparator />
                <ItemList>
                  <span>Unidad de Medida: </span>
                  {unit_of_measurement ? (
                    <p>{unit_of_measurement.name}</p>
                  ) : (
                    <div
                      className="load"
                      style={{ height: "10px", width: "40px" }}
                    >
                      <LoaderCircle />
                    </div>
                  )}
                </ItemList>
                <ItemList>
                  <span>Precio Unidad: </span>
                  <p>{formatNumberMoney(product.pricing.price_unity)}</p>
                </ItemList>
                <ItemList>
                  <span>Cantidad: </span>
                  <p>{product.pricing.cuantity}</p>
                </ItemList>
                <ItemList>
                  <span>Precio total: </span>
                  <p>
                    {formatNumberMoney(
                      product.pricing.cuantity * product.pricing.price_unity
                    )}
                  </p>
                </ItemList>
                <ItemList>
                  <span>Igv Total: </span>
                  <p>{formatNumberMoney(product.pricing.igv)}</p>
                </ItemList>
                <ItemSeparator />
                <ItemList style={{ alignItems: "flex-start" }}>
                  <div className="p_descrip">
                    {FormatLineBreak(product.description)}
                  </div>
                </ItemList>
              </ListItems>
            </RigthContainer>
          </Container>
          <Footer>
            <div className="btns">
              <Eclipsis onClick={() => HitoryGo()} icon={faArrowLeft} />
              <Eclipsis icon={faEdit} />
            </div>
          </Footer>
        </>
      )}
    </>
  );
};

const Footer = styled.div`
  margin-top: -40px;
  .btns {
    display: flex;
    gap: 5px;
  }
`;
const ItemSeparator = styled.div`
  height: 0px;
  width: 100%;
  border-bottom: 1px solid var(--black-700);
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: var(--black-300);
  }
`;
const Container = styled.div`
  display: flex;
`;
const LeftContainer = styled.div``;
const RigthContainer = styled.div`
  padding: 0 10px 10px 10px;

  width: 100%;
`;
const Files = styled.div`
  > div {
    border-radius: 7px;
    overflow: hidden;
    border: 1px solid var(--black-500);
    cursor: grab;
    padding: 0;
    .splide__arrow--prev {
      display: none;
    }
    .splide__arrow--next {
      display: none;
    }
    &:hover {
      border: 1px solid var(--black-600);
    }
    .splide__pagination__page {
      opacity: 0;
      transition: 0.2s;
    }
    &:hover .splide__pagination__page {
      opacity: 1;
    }
  }
`;
const FileSplite = styled.div`
  width: 200px;
  height: 200px;
  .ContainerImage {
    background-color: var(--black-100);
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      border-radius: 5px;

      height: auto;
      transition: 0.5s;
    }
  }
`;
const ListItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  position: relative;
`;
const ItemList = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  span {
    color: var(--write-500);
    font-size: 14px;
    width: 120px;
  }
  .p_descrip {
    display: block;
    list-style: none;
    color: var(--write-100);
    max-height: 150px;
    overflow-y: auto;
    li {
      padding: 4px 0;
      font-size: 15px;
      color: var(--write-300);
    }
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border: 0;
    }
    &:hover::-webkit-scrollbar-thumb {
      background-color: var(--black-900);
    }
  }
  p {
    color: var(--write-000);
    font-size: 14px;
    margin: 0;
  }
  a {
    display: flex;
    align-items: center;
    font-size: 14px;
    .container-img-prof {
      background-color: var(--black-200);
      width: 20px;
      height: 20px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin-right: 4px;
      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
    span {
      text-align: left;
    }
  }
`;

const ContainerImageFound = styled.div`
  width: 200px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--black-500);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  span {
    color: var(--write-100);
  }
`;
