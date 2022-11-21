import {
  faEdit,
  faImage,
  faKey,
  faPercent,
  faQrcode,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { v4 } from "uuid";

import { Accordion } from "../../../components/accordion/index.accordion";
import { ButtonRectangle, Eclipsis } from "../../../components/button";
import {
  Combobox,
  FormControl,
  TextArea,
} from "../../../components/form/formControl";
import { ColumnGrid, RowGrid } from "../../../components/grid";
import { LoaderRelative } from "../../../components/loader/loaderComponets";
import { db, storage } from "../../../firebase/config";
import { FormatDate, formatNumberMoney } from "../../../hooks/hooks.utils";

export const NewComponent = ({ productData }) => {
  // datas
  const [getProduct, setProduct] = useState({
    uid: "",
    brand: "",
    category_uid: "K7CWzSVQLF3LlLdk4AoL",
    code_qr: "",
    description: "",
    files: [],
    model: "",
    pricing: {
      unit_of_measurement: "PRWD6FUdQ7o83MaxQbMp",
      cuantity: 0,
      igv: 0,
      igv_total: 0,
      price_unity: "0",
      total: "0.00",
    },
    supplier_uid: "jKem1spQjV3lQOWto6gW",
    title: "",
    user_uid: "38595937y9287g942g49",
    statu: true,
  });
  const [supplierData, setSupplierData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [unit_of_measurement, setUnit_of_measurement] = useState([]);
  // loading
  const [loading, setLoading] = useState(true);
  const [loadingSaved, setLoadingSaved] = useState(false);

  // files use states

  const [filesObj, setFilesObj] = useState([]);
  const [files, setFiles] = useState([]);
  const [fileSelected, setFileSelected] = useState([]);
  const [filesDelete, setfilesDelete] = useState([]);

  const navigate = useNavigate();
  const [autoFocous, setAutoFocous] = useState({
    codeQr: true,
    brand: false,
    model: false,
    title: false,
    category: false,
    supplier: false,
    description: false,
  });
  const [requiredactive, setRequiredactive] = useState({
    codeQr: false,
    brand: false,
    model: false,
    title: false,
    category: false,
    supplier: false,
    description: false,
  });

  // handles
  const handleChange = (e) => {
    setProduct({
      ...getProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handlePricing = (e) => {
    setProduct({
      ...getProduct,
      pricing: {
        ...getProduct.pricing,
        igv: getProduct.pricing.price_unity * 0.18,
        total: getProduct.pricing.price_unity * getProduct.pricing.cuantity,
        igv_total: getProduct.pricing.total * 0.18,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addFiles();
  };

  //files
  const handleFile = (e) => {
    const filesTemp = Object.values(e.target.files);
    const filesNew = [];
    const filesNewObj = [];

    filesTemp.forEach((file) => {
      filesNew.push({ fileName: "", fileUri: URL.createObjectURL(file) });
      filesNewObj.push(file);
      setFiles(filesNew.concat(files));
      setFilesObj(filesNewObj.concat(filesObj));
      setFileSelected(filesNew.concat(files));
    });
    // setModal({ ...modal, valide: true })
  };

  function deleteFiles(file) {
    let index = files.indexOf(file);
    const elementNew = [
      ...files.slice(0, index),
      ...files.slice((index += 1), files.length),
    ];
    setFiles(elementNew);
    setFileSelected([elementNew[0]]);
  }

  const deleteFile = (file) => {
    let index = files.indexOf(file);
    const elementNewObj = [
      ...filesObj.slice(0, index),
      ...filesObj.slice((index += 1), filesObj.length),
    ];
    setFilesObj(elementNewObj);
    deleteFiles(file);

    // if (productData) {
    //     setfilesDelete([...filesDelete, file])
    // }
  };

  //GET /api/
  async function getSupplier() {
    const q = query(collection(db, "suppliers"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];

      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), uid: doc.id });
      });

      setSupplierData(docs);
    });
    return () => unsubscribe();
  }
  async function getCategories() {
    const q = query(collection(db, "categories"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), uid: doc.id });
      });

      setCategoriesData(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }
  async function getUnit_of_measurement() {
    const q = query(collection(db, "unit_of_measurement"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), uid: doc.id });
      });

      setUnit_of_measurement(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }
  async function setProductDb(productTemp) {
    try {
      await addDoc(collection(db, "inventory"), {
        ...productTemp,
        created_at: FormatDate(),
      });
      setLoadingSaved(false);
      navigate("/inventory/");

      console.log("add product");
    } catch (error) {
      console.log(error.message);
    }
  }
  async function addFiles() {
    setLoadingSaved(true);
    let filesNames = [];
    let productTemp = {};
    // Si hay Archivos
    if (filesObj.length > 0) {
      let index = 0;
      try {
        filesObj.forEach(async (file) => {
          const name = v4();
          const storageRef = ref(storage, "/inventory/" + name);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          filesNames.push({ fileName: name, fileUri: url });
          index = index + 1;
          if (index >= filesObj.length) {
            productTemp = { ...getProduct, files: filesNames };
            setProduct(productTemp);
            await setProductDb(productTemp);
            console.log("Upload files");
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    // si no hay archivos
    else {
      setProductDb(getProduct);
    }
  }

  async function updateProduct(productTemp) {
    // try {
    //     const washingtonRef = doc(db, "products", productTemp.id);
    //     await updateDoc(washingtonRef, productTemp);
    //     setLoadingCreate(false)
    //     setModal(false)
    //     alertDefault(faSave, `Producto "${productTemp.id}" guardado actualizado `)
    // } catch (error) {
    //     console.log(error)
    //     setError({ title: "Error", header: "Error al guardar", description: "Ops, Ocurrio un problema al guardar el producto \n\n Comunicate con el Administrador", type: "error" })
    // }
  }
  // use effect
  useEffect(() => {
    const unsucribe = async () => {
      await getSupplier();
      await getCategories();
      await getUnit_of_measurement();
    };
    return () => unsucribe();
  }, [getProduct]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container>
          <Accordion title="Metadatos" description="">
            <RowGrid>
              <ColumnGrid w={"5"}>
                <FormControl
                  iconImg="/assets/Group.png"
                  onValue="David Austinn"
                  disabled
                  placeholder="Usuario"
                />
              </ColumnGrid>
              <ColumnGrid w={"7"}>
                <FormControl
                  iconSvg={faKey}
                  onValue={getProduct.uid}
                  disabled
                  placeholder="Codigo generado"
                />
              </ColumnGrid>
            </RowGrid>
          </Accordion>
          <Accordion title="Producto" description="" open>
            <RowGrid>
              <ColumnGrid w={"4"}>
                <FormControl
                  onValue={getProduct.code_qr}
                  name="code_qr"
                  autoFocus
                  placeholderLabel="Codigo Qr"
                  onChange={handleChange}
                  automplete="off"
                />
              </ColumnGrid>
              <ColumnGrid w={"4"}>
                <FormControl
                  onValue={getProduct.brand}
                  name="brand"
                  required
                  placeholderLabel="Marca"
                  onChange={handleChange}
                  automplete="off"
                />
              </ColumnGrid>
              <ColumnGrid w={"4"}>
                <FormControl
                  onValue={getProduct.model}
                  name="model"
                  placeholderLabel="Modelo"
                  onChange={handleChange}
                  automplete="off"
                />
              </ColumnGrid>
            </RowGrid>
            <RowGrid>
              <ColumnGrid w={"5"}>
                <Combobox
                  onValue={getProduct.category_uid}
                  name="category_uid"
                  placeholderLabel="Categoria"
                  onChange={handleChange}
                >
                  {loading ? (
                    <option>Loading</option>
                  ) : (
                    categoriesData.map((category, index) => (
                      <option key={index} value={category.uid}>
                        {category.name}
                      </option>
                    ))
                  )}
                </Combobox>
              </ColumnGrid>
              <ColumnGrid w={"7"}>
                <Combobox
                  onValue={getProduct.supplier_uid}
                  name="supplier_uid"
                  placeholderLabel="Proveedor"
                  onChange={handleChange}
                >
                  {loading ? (
                    <option>Loading</option>
                  ) : (
                    supplierData.map((supplier, index) => (
                      <option key={index} value={supplier.uid}>
                        {supplier.business_name}
                      </option>
                    ))
                  )}
                </Combobox>
              </ColumnGrid>
            </RowGrid>
            <RowGrid>
              <ColumnGrid w={"12"}>
                <FormControl
                  onValue={getProduct.title}
                  name="title"
                  placeholder="Titulo (Opcional)"
                  onChange={handleChange}
                />
              </ColumnGrid>
            </RowGrid>
            <RowGrid>
              <ColumnGrid w={"12"}>
                <TextArea
                  onValue={getProduct.description}
                  name="description"
                  required
                  placeholder="Descripcion detallada"
                  minHeigth="120px"
                  onChange={handleChange}
                />
              </ColumnGrid>
            </RowGrid>
          </Accordion>
          <Accordion title="Precios y costos" description="">
            <RowGrid>
              <ColumnGrid w={"4"}>
                <Combobox
                  onValue={getProduct.pricing.unit_of_measurement}
                  name="unit_of_measurement"
                  placeholderLabel="Unidad de medida"
                  onChange={handlePricing}
                >
                  {loading ? (
                    <option>Cargando</option>
                  ) : (
                    unit_of_measurement.map((item, index) => (
                      <option key={index} value={item.uid}>
                        {item.name}
                      </option>
                    ))
                  )}
                </Combobox>
              </ColumnGrid>
              <ColumnGrid w={"2"}>
                <FormControl
                  required
                  type="number"
                  placeholderLabel="Cantidad"
                  onValue={getProduct.pricing.cuantity}
                  name="cuantity"
                  onChange={handlePricing}
                />
              </ColumnGrid>
              <ColumnGrid w={"3"}>
                <FormControl
                  required
                  onValue={getProduct.pricing.price_unity}
                  name="price_unity"
                  type="number"
                  placeholderLabel="Valor unitario"
                  onChange={handlePricing}
                />
              </ColumnGrid>
              <ColumnGrid w={"3"}>
                <FormControl
                  onValue={formatNumberMoney(getProduct.pricing.igv)}
                  name="igv"
                  disabled
                  placeholderLabel="IGV Unitario 18%"
                />
              </ColumnGrid>
            </RowGrid>
            <RowGrid>
              <ColumnGrid w={"4"}>
                <FormControl
                  onValue={getProduct.pricing.total}
                  type="number"
                  name="total"
                  disabled
                  placeholderLabel="Importe Total"
                />
              </ColumnGrid>
              <ColumnGrid w={"4"}>
                <FormControl
                  onValue={getProduct.pricing.igv_total}
                  disabled
                  type="number"
                  placeholderLabel="IGV Total"
                />
              </ColumnGrid>
            </RowGrid>
          </Accordion>
          <Accordion title="Fotos" description="">
            <FormControlFile>
              <FormControl
                multiple
                accept="image/*"
                onChange={handleFile}
                id="htehefwrg"
                type="file"
                placeholderLabel="Imagenes"
              />
              {files.length > 0 && (
                <ContainerImagePreview
                  style={{
                    backgroundImage: "url(" + fileSelected[0].fileUri + ")",
                  }}
                >
                  <div className="ContainerImage">
                    <img
                      src={
                        files.length > 0
                          ? fileSelected[0].fileUri
                          : "/assets/no-image.png"
                      }
                      alt=""
                    />
                  </div>
                </ContainerImagePreview>
              )}
              {files.length < 1 && (
                <label htmlFor="htehefwrg" style={{ cursor: "pointer" }}>
                  <div title="Agregar imagenes" className="ContainerImage">
                    <img src="/icons-custom/add-images.png" alt="" />
                  </div>
                </label>
              )}
              {files.length > 0 && (
                <>
                  <BtnCount>
                    <Eclipsis className="small" text={files.length} />
                  </BtnCount>
                  <BtnEdit className="kaoifjemfawd">
                    <Eclipsis
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="small"
                      icon={faEdit}
                      title="Editar"
                    />
                  </BtnEdit>
                  <BtnDelete className="kaoifjemfawd">
                    <Eclipsis
                      onClick={(e) => {
                        e.preventDefault();
                        deleteFile(fileSelected[0]);
                      }}
                      className="small"
                      icon={faTrash}
                      title="Eliminar"
                    />
                  </BtnDelete>
                </>
              )}
              {files.length > 0 && (
                <ContainerListImages>
                  <ListImage lengh={files.length} className="listImage">
                    {files.length > 0 && (
                      <label
                        tabIndex="10"
                        title="Agregar imagenes"
                        htmlFor="htehefwrg"
                      >
                        <ItemAdd onclick={() => console.log("first")}>
                          <img
                            id="image_upload"
                            src="/icons-custom/add-images.png"
                            alt=""
                          />
                        </ItemAdd>
                      </label>
                    )}
                    {files.length > 0 &&
                      files.map((file, index) => (
                        <ItemPhoto
                          className={
                            file.fileUri === fileSelected[0].fileUri &&
                            "selected-item"
                          }
                          key={index}
                          onClick={() => {
                            setFileSelected([file]);
                          }}
                        >
                          <img src={file.fileUri} />
                        </ItemPhoto>
                      ))}
                  </ListImage>
                </ContainerListImages>
              )}
            </FormControlFile>
          </Accordion>
          <Footer>
            <RowGrid>
              <ColumnGrid w="4">
                <ButtonRectangle
                  onClick={() => navigate("/inventory")}
                  className="default"
                  // loading
                >
                  Cancelar
                </ButtonRectangle>
              </ColumnGrid>
              <ColumnGrid w="8">
                <ButtonRectangle className="primary">Guardar</ButtonRectangle>
              </ColumnGrid>
            </RowGrid>
          </Footer>
        </Container>
      </form>
      {loadingSaved && <LoaderRelative />}
    </>
  );
};

const Container = styled.div``;
const Footer = styled.div`
  position: sticky;
  padding-top: 3px;
  bottom: 0px;
  background-color: var(--black-400);
`;

const FormControlFile = styled.div`
  position: relative;
  &:hover .listImage {
    opacity: 1;
  }
  &:hover .btnAdd {
    opacity: 1;
  }
  input {
    display: none;
  }
  label {
    height: 100%;
  }
  .ContainerImage {
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(30px);
    background-position: center;
    background-size: cover;
    border-radius: 6px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-shadow: 0 0 40px 1px var(--black-100) inset;
    img {
      max-width: 100%;
      width: auto;
      height: auto;
      max-height: 100%;
      border-radius: 5px;
    }
  }
  &:hover .kaoifjemfawd {
    opacity: 1 !important;
  }
`;

const ContainerImagePreview = styled.div`
  border-radius: 10px;
  box-shadow: 0 0 1px 1px var(--black-100) inset;
  position: relative;
`;

const BtnCount = styled.div`
  position: absolute;
  padding: 8px;
  top: 20px;
  left: 0;
  transition: 0.2s opacity;
  opacity: 1;
`;
const BtnDelete = styled.div`
  position: absolute;
  padding: 8px;
  top: 25px;
  right: 0;
  transition: 0.2s opacity;
  opacity: 0;
`;
const BtnEdit = styled.div`
  position: absolute;
  padding: 8px;
  top: 25px;
  right: 40px;
  transition: 0.2s opacity;
  opacity: 0;
`;

const ItemAdd = styled.div`
  cursor: pointer;
  max-width: 70px;
  min-width: 70px;
  height: 70px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    border: 1px solid var(--black-700);
  }
  img {
    width: 25px;
  }
`;
const ContainerListImages = styled.div`
  position: absolute;
  bottom: 5px;
  max-width: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ListImage = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  gap: 7px;
  overflow: hidden;
  overflow-x: auto;
  transition: 0.5s opacity;
  opacity: 0;
  margin: 0 10px;
  padding: 7px;
  &::-webkit-scrollbar {
    background-color: transparent;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 10px;
    border: 0;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: var(--black-600);
  }
  label {
  }
  .selected-item {
    border: 2px solid var(--blue-400);
    &:hover {
      border: 2px solid var(--blue-400);
    }
  }
`;
const ItemPhoto = styled.div`
  cursor: default;
  max-width: 70px;
  min-width: 70px;
  height: 70px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid transparent;
  transition: 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  &:hover {
    border: 1px solid var(--black-400);
  }
  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
  &:hover > div {
    opacity: 1;
  }
  > div {
    opacity: 0;
    position: absolute;
  }
`;
