import {
  faAdd,
  faBug,
  faCircleInfo,
  faCopy,
  faNotEqual,
  faPen,
  faShoppingBag,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import {
  Link,
  unstable_HistoryRouter,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { Eclipsis } from "../../components/button";

import SearshSimple from "../../components/form/searshSimple";
import { Popover } from "../../components/popover";
import {
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLayout,
  SidebarSeparator,
} from "../../components/popover/utils/popover.utils";
import { Table } from "../../components/table";
import {
  copyGlobal,
  FormatDate,
  formatNumberMoney,
  LastSeen,
  TimeAgoHourFormat,
} from "../../hooks/hooks.utils";

//toast
import toast, { Toaster } from "react-hot-toast";
import { AlertBodySimple } from "../../components/alert/popup.time";
import { LayoutModal } from "../../components/modal/utils/utils.modal";
import { NewComponent } from "./utils/new.component";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  endAt,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  LoaderCircle,
  LoaderTable,
} from "../../components/loader/loaderComponets";
import InfiniteScroll from "react-infinite-scroll-component";

import moment from "moment/moment";
import "moment/locale/es";
import { ReviewComponent } from "./utils/review.component";
import { deleteObject, getStorage, ref } from "firebase/storage";
moment.locale("es");

export default function Inventory() {
  // data
  const [data, setData] = useState([]);

  // loading
  const [loadingProducts, setLoadingProducts] = useState(true);

  const navigate = useNavigate();
  const [optionState, setOptionState] = useState("");
  const [typeView, setTypeView] = useState("table");
  const [formSearshHidden, SetformSearshHidden] = useState(false);

  const [lastVisible, setlastVisible] = useState({});

  // searsh
  const [searshText, setSearshText] = useState("");
  const { option, searsh, uid } = useParams();
  const handleSubmitSearsh = (e) => {
    e.preventDefault();
    if (searshText === "") {
      navigate("/inventory");
    } else {
      navigate("/inventory/searsh/" + searshText);
      SetformSearshHidden(false);
    }
  };

  const toggleSearsh = () => {
    SetformSearshHidden(!formSearshHidden);
  };
  const handleTypeView = () => {
    if (typeView === "table") {
      setTypeView("post");
    } else {
      setTypeView("table");
    }
  };

  // history
  const sitoryGo = () => {
    window.history.go(-1);
    SetformSearshHidden(false);
    setSearshText("");
  };
  const history = () => {
    window.history.go(1);
    SetformSearshHidden(false);
    setSearshText("");
  };

  //toast
  const notify = (icon, text) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full   pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <AlertBodySimple
          icon={icon}
          text={text}
          onclick={() => toast.dismiss(t.id)}
        />
      </div>
    ));
  };

  // custom methods
  const copyCode = (icon, text, value) => {
    notify(icon, text);
    copyGlobal(value);
  };

  ///API FIREBASE/
  async function getProducts() {
    const first = query(
      collection(db, "inventory"),
      orderBy("created_at", "desc"),

      limit(25)
    );

    const unsubscribe = onSnapshot(first, (querySnapshot) => {
      setlastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), uid: doc.id });
      });
      setData([...docs]);
      setLoadingProducts(false);
    });

    return () => unsubscribe();
  }
  async function getProductsNext() {
    const first = query(
      collection(db, "inventory"),
      orderBy("created_at", "desc"),
      startAfter(lastVisible),
      limit(10)
    );

    const unsubscribe = onSnapshot(first, (querySnapshot) => {
      setlastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), uid: doc.id });
      });
      setData([...data, ...docs]);
      setLoadingProducts(false);
    });

    return () => unsubscribe();
  }
  async function searshData(q) {
    const first = query(
      collection(db, "inventory"),
      orderBy("brand"),
      startAt(q),
      endAt(q + "\uf8ff")
    );
    const unsubscribe = onSnapshot(first, (querySnapshot) => {
      setlastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), uid: doc.id });
      });
      setData([...docs]);
      setLoadingProducts(false);
    });

    return () => unsubscribe();
  }
  async function deleteProduct(item) {
    await deleteDoc(doc(db, "inventory", item.uid));
    deleteProductFiles(item.files);
  }
  async function deleteProductFiles(files) {
    if (files.length > 0) {
      const storage = getStorage();
      // bucle
      files.forEach((file) => {
        // Create a reference to the file to delete
        const desertRef = ref(storage, "inventory/" + file.fileName);
        // Delete the file
        deleteObject(desertRef)
          .then(() => {
            console.log("deleted");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }

  // Hooks react
  useEffect(() => {
    setOptionState(option);
    getProducts();
    if (searsh) {
      searshData(searsh);
      setOptionState("searsh");
    }
  }, [option, searsh, typeView]);

  //components
  const OptionComponentRow = ({ item }) => {
    const [loading, setLoading] = useState(false);
    const [favoriteValue, setFavoriteValue] = useState(null);
    const [favoriteUid, setFavoriteUid] = useState();

    async function getFavoriteDocument(uiddocument) {
      setLoading(true);
      try {
        const q = query(
          collection(db, "favorite"),
          where("document_uid", "==", uiddocument),
          where("collection", "==", "inventory"),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            setFavoriteUid(doc.id);
          });
          setFavoriteValue(true);
        } else {
          setFavoriteValue(false);
        }

        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    async function toggleFavorite() {
      if (favoriteValue) {
        await deleteDoc(doc(db, "favorite", favoriteUid));
        setFavoriteValue(false);
      } else {
        await addDoc(collection(db, "favorite"), {
          document_uid: item.uid,
          created_at: FormatDate(),
          collection: "inventory",
          user_uid: "7975389759375",
        });
        setFavoriteValue(true);
      }
    }

    function deleteProductInter() {
      if (window.confirm("¿Estas seguro de eliminar el producto?")) {
        deleteProduct(item);
      }
    }

    return (
      <TableOptionsTd onClick={() => getFavoriteDocument(item.uid)}>
        <Popover
          componentButton={
            <Eclipsis
              loading={loading}
              onClick={() => getFavoriteDocument(item.uid)}
              className="small"
              title="Opciones"
              statu={optionState === "options" && true}
              iconSvg={
                <svg
                  width="32px"
                  height="32px"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path
                    d="M16,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S17.654,13,16,13z"
                    id="XMLID_287_"
                  />
                  <path
                    d="M6,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S7.654,13,6,13z"
                    id="XMLID_289_"
                  />
                  <path
                    d="M26,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S27.654,13,26,13z"
                    id="XMLID_291_"
                  />
                </svg>
              }
            />
          }
        >
          <SidebarLayout wSidebar="270px">
            {loading ? (
              <div
                style={{
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LoaderCircle />
              </div>
            ) : (
              <SidebarBody>
                <SidebarItem
                  onClick={() => navigate("/inventory/v/" + item.uid)}
                  Text="Ver"
                  description="Ver los detalles del producto"
                  iconSvg={
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.43 5.25c-.5-.21-1.03-.41-1.58-.56-1.36-.41-2.87-.65-4.45-.68C12.27 4 12.14 4 12 4c-.13 0-.27 0-.4.01-1.58.03-3.09.27-4.45.68-.55.15-1.08.35-1.58.56C2.22 6.66 0 9.16 0 12c0 3.28 2.95 6.09 7.17 7.32 1.48.44 3.11.68 4.83.68s3.35-.24 4.83-.68C21.05 18.09 24 15.28 24 12c0-2.84-2.22-5.34-5.57-6.75zM2 12c0-1.48 1.01-2.94 2.72-4.05-.54 1.22-.84 2.6-.84 4.05 0 1.46.31 2.84.85 4.07C3.04 14.99 2 13.55 2 12zm13.38 5.62c-1.06.25-2.2.38-3.38.38s-2.32-.13-3.38-.38c-1.51-1.24-2.5-3.29-2.5-5.62s.99-4.39 2.51-5.63c.96-.22 1.98-.34 3.01-.36h.06l.05-.01h.5l.05.01h.06c1.03.02 2.05.14 3.01.36 1.52 1.24 2.51 3.3 2.51 5.63s-.99 4.38-2.5 5.62zm3.89-1.55c.54-1.23.85-2.61.85-4.07 0-1.45-.3-2.83-.84-4.05C20.99 9.06 22 10.52 22 12c0 1.55-1.04 2.99-2.73 4.07z" />
                      <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm1.5 5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z" />
                    </svg>
                  }
                />
                <SidebarItem
                  Text="Vender "
                  iconSvg={
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13 2c.55 0 1 .45 1 1v7h7c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1h-7v7c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1v-7H3c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1h7V3c0-.55.45-1 1-1h2m0-2h-2C9.346 0 8 1.346 8 3v5H3c-1.654 0-3 1.346-3 3v2c0 1.654 1.346 3 3 3h5v5c0 1.654 1.346 3 3 3h2c1.654 0 3-1.346 3-3v-5h5c1.654 0 3-1.346 3-3v-2c0-1.654-1.346-3-3-3h-5V3c0-1.654-1.346-3-3-3z" />
                    </svg>
                  }
                />
                <SidebarSeparator />
                <SidebarItem
                  onClick={async () => await toggleFavorite()}
                  className={favoriteValue ? "active" : ""}
                  Text={favoriteValue ? "Eliminar de guardados" : "Guardar"}
                  description="Agregar a los productos guardados"
                  iconSvg={
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17-.01H7.01c-1.65 0-3 1.35-3 3L4 22c0 .74.41 1.42 1.06 1.76.29.16.62.24.94.24.39 0 .77-.11 1.11-.34L12 20.4l4.89 3.26c.34.23.72.34 1.11.34.32 0 .65-.08.94-.24.65-.34 1.06-1.02 1.06-1.76V2.99c0-1.65-1.35-3-3-3zM18 22s-5.45-3.63-5.46-3.63c-.16-.1-.34-.16-.54-.16-.19 0-.37.05-.52.15C11.47 18.36 6 22 6 22l.01-19.01c0-.54.46-1 1-1H17c.54 0 1 .46 1 1V22z" />
                    </svg>
                  }
                />
                <SidebarItem
                  onClick={async () => await toggleFavorite()}
                  className={item.featured ? "active" : ""}
                  Text={item.featured ? "Eliminar de destacado" : "Destacar"}
                  iconSvg={
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17 8.67v-3.4c.62-.54 1-1.34 1-2.27 0-1.71-1.29-3-3-3H9C7.29 0 6 1.29 6 3c0 .93.38 1.73 1 2.27v3.4c-1.31.99-2 2.86-2 4.33 0 1.71 1.29 3 3 3h3v5l1 3 1-3v-5h3c1.71 0 3-1.29 3-3 0-1.47-.69-3.34-2-4.33zM16 14H8c-.6 0-1-.39-1-1 0-1.22.79-3 2-3V4c-.6 0-1-.39-1-1s.4-1 1-1h6c.6 0 1 .39 1 1s-.4 1-1 1v6c1.21 0 2 1.78 2 3 0 .61-.4 1-1 1z" />
                    </svg>
                  }
                />
                <SidebarItem
                  Text="Reporte"
                  description="Generar reporte de este producto"
                  iconSvg={
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g>
                        <path d="M24 23a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v21h21a1 1 0 0 1 1 1z" />
                        <path d="M23.6 1.8l-2.62 1.969a.97.97 0 0 1 .02.24 2.006 2.006 0 0 1-2 2A.569.569 0 0 1 18.871 6l-1.04 1.559-1.04 1.559c.14.273.211.576.209.882a1.994 1.994 0 0 1-1.88 1.989l-1.45 2.9A2 2 0 1 1 10 16v-.03l-2.03-1.218c-.177.1-.37.172-.57.21L5.95 19.32A1 1 0 0 1 5 20a1.252 1.252 0 0 1-.32-.05 1.01 1.01 0 0 1-.63-1.269l1.45-4.358A2 2 0 1 1 9 13v.03l2.03 1.219c.26-.147.552-.23.85-.24l1.45-2.9A2.006 2.006 0 0 1 15 8.005a.569.569 0 0 1 .13.01l1.04-1.559L17.211 4.9a2 2 0 0 1 2.569-2.732L22.4.2a1 1 0 1 1 1.2 1.6z" />
                      </g>
                    </svg>
                  }
                />
                <SidebarItem
                  Text="Editar"
                  description="Actualiza este producto"
                  iconSvg={
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22.707 5.536l-4.243-4.243.707-.707c.782-.78 2.048-.78 2.83 0L23.413 2c.78.78.78 2.047 0 2.828l-.707.708zM17.38 5.208l1.412 1.412-4.586 4.586-2.53 2.53-5.756 5.756L4.852 20l-1.507.656L4 19.15l.51-1.068 5.755-5.756 2.53-2.53 4.585-4.588m0-2.828l-6 6-2.53 2.53-6 6-.67 1.41-2.15 4.94c-.04.12-.04.25 0 .37.04.07.1.13.16.18.05.06.11.12.18.16.06.02.12.03.19.03.06 0 .12-.01.18-.03l4.94-2.15 1.41-.67 6-6 2.53-2.53 6-6-4.24-4.24z" />
                    </svg>
                  }
                />
                <SidebarSeparator />
                <SidebarItem
                  onClick={deleteProductInter}
                  Text="Eliminar "
                  iconSvg={
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20 2h-4v-.85C16 .52 15.48 0 14.85 0h-5.7C8.52 0 8 .52 8 1.15V2H4c-1.1 0-2 .9-2 2 0 .74.4 1.38 1 1.73v14.02C3 22.09 4.91 24 7.25 24h9.5c2.34 0 4.25-1.91 4.25-4.25V5.73c.6-.35 1-.99 1-1.73 0-1.1-.9-2-2-2zm-1 17.75c0 1.24-1.01 2.25-2.25 2.25h-9.5C6.01 22 5 20.99 5 19.75V6h14v13.75z" />
                      <path d="M8 20.022c-.553 0-1-.447-1-1v-10c0-.553.447-1 1-1s1 .447 1 1v10c0 .553-.447 1-1 1zm8 0c-.553 0-1-.447-1-1v-10c0-.553.447-1 1-1s1 .447 1 1v10c0 .553-.447 1-1 1zm-4 0c-.553 0-1-.447-1-1v-10c0-.553.447-1 1-1s1 .447 1 1v10c0 .553-.447 1-1 1z" />
                    </svg>
                  }
                />
                <SidebarItem
                  className={!item.statu ? "active" : ""}
                  Text={!item.statu ? "Habilitar" : "Deshabilitar"}
                  description={
                    !item.statu
                      ? "Habilita este producto (Disponible para la venta)"
                      : "Deshabilita estae producto (No estara disponible para la venta)"
                  }
                  iconSvg={
                    !item.statu ? (
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        style={{ transform: "rotate(45deg)" }}
                      >
                        <g>
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12A12 12 0 0 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10a10.015 10.015 0 0 1-10 10z" />
                          <path d="M17.71 16.29c.39.393.39 1.027 0 1.42a1.014 1.014 0 0 1-1.42 0L12 13.42l-4.29 4.29a1.014 1.014 0 0 1-1.42 0 1.008 1.008 0 0 1 0-1.42L10.58 12 6.29 7.71a1.004 1.004 0 0 1 1.42-1.42L12 10.58l4.29-4.29a1.004 1.004 0 0 1 1.42 1.42L13.42 12l4.29 4.29z" />
                        </g>
                      </svg>
                    ) : (
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm0 2a9.941 9.941 0 0 1 6.3 2.24L4.24 18.3A9.995 9.995 0 0 1 12 2zm0 20a9.985 9.985 0 0 1-6.36-2.28L19.72 5.64A10 10 0 0 1 12 22z" />
                      </svg>
                    )
                  }
                />
                <SidebarSeparator />
                <SidebarItem
                  onClick={() => copyCode(faCopy, "Codigo copiado", item.uid)}
                  Text="Copiar Codigo"
                  iconSvg={
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.94 0c-1.262 0-2.51.47-3.454 1.412l-2.973 2.973c-1.675 1.674-1.852 4.292-.56 6.235 0 .014.006.02.013.028l-1.31 1.313c-.008-.005-.015-.012-.03-.012-.844-.575-1.815-.852-2.787-.86-1.258.008-2.506.477-3.45 1.42L1.42 15.48c-1.916 1.915-1.888 5.08.063 7.03.985.987 2.29 1.484 3.575 1.49 1.27-.006 2.504-.475 3.448-1.418l2.98-2.98c1.66-1.66 1.86-4.27.59-6.207l1.31-1.326c.846.544 1.81.83 2.775.83 1.265 0 2.506-.478 3.45-1.42l2.98-2.98c1.907-1.91 1.88-5.073-.07-7.024C21.523.482 20.225-.008 18.94 0zm-8.327 14.855c.518 1.1.333 2.448-.546 3.327l-2.974 2.973c-.532.532-1.256.83-2.036.83-.81 0-1.575-.312-2.157-.894-.568-.565-.88-1.33-.895-2.126-.007-.788.298-1.518.837-2.058l2.973-2.973c.532-.532 1.248-.837 2.022-.83.47 0 .922.1 1.333.298l-1.894 1.895c-.397.397-.39 1.028 0 1.42.39.39 1.02.396 1.42 0l1.886-1.888.03.03zm10.55-7.767L18.19 10.06c-.533.534-1.257.83-2.037.83-.453 0-.894-.097-1.29-.282l-.03-.028 2.896-2.895c.39-.39.39-1.028 0-1.42s-1.03-.39-1.42 0l-2.9 2.902c-.194-.404-.293-.844-.3-1.305-.014-.78.29-1.51.83-2.05l2.973-2.974c.525-.54 1.25-.838 2.03-.837.815.01 1.574.328 2.156.896 1.162 1.177 1.2 3.057.062 4.193z" />
                      <path d="M11.953 10.62c0 .015.007.022.014.03l-1.312 1.31c-.007-.006-.014-.013-.028-.013l1.326-1.326z" />
                    </svg>
                  }
                />
              </SidebarBody>
            )}
          </SidebarLayout>
        </Popover>
      </TableOptionsTd>
    );
  };

  return (
    <Container
    // data-aos="fade-zoom-in"
    // data-aos-easing="ease-in-back"
    // data-aos-duration="300"
    >
      <Header>
        <h1>
          {!optionState && "Gestion de Inventario"}
          {optionState === "favorite" && "Mis favoritos"}
          {optionState === "searsh" &&
            "Resultados de la busqueda: " + '"' + searsh + '"'}
        </h1>
        <NavRigth>
          {formSearshHidden && (
            <form onSubmit={handleSubmitSearsh}>
              <InputSearshContainer>
                <SearshSimple
                  onValue={searshText}
                  onChange={(e) => setSearshText(e.target.value)}
                  placeholder="Buscar producto"
                />
              </InputSearshContainer>
            </form>
          )}

          <Eclipsis
            onClick={toggleSearsh}
            title="Buscar"
            statu={optionState === "searsh" && true}
            iconSvg={
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                width="1em"
                height="1em"
              >
                <g transform="translate(-448 -544)">
                  <g>
                    <path
                      d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z"
                      transform="translate(448 544)"
                    ></path>
                    <path
                      d="M10.39 8.75a2.94 2.94 0 0 0-.199.432c-.155.417-.23.849-.172 1.284.055.415.232.794.54 1.103a.75.75 0 0 0 1.112-1.004l-.051-.057a.39.39 0 0 1-.114-.24c-.021-.155.014-.356.09-.563.031-.081.06-.145.08-.182l.012-.022a.75.75 0 1 0-1.299-.752z"
                      transform="translate(448 544)"
                    ></path>
                    <path
                      d="M9.557 11.659c.038-.018.09-.04.15-.064.207-.077.408-.112.562-.092.08.01.143.034.198.077l.041.036a.75.75 0 0 0 1.06-1.06 1.881 1.881 0 0 0-1.103-.54c-.435-.058-.867.018-1.284.175-.189.07-.336.143-.433.2a.75.75 0 0 0 .624 1.356l.066-.027.12-.061z"
                      transform="translate(448 544)"
                    ></path>
                    <path
                      d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182zm.617-.616.444-.444a.31.31 0 0 0-.063-.052c-.093-.055-.263-.055-.35.024l.208.232.207-.206.006.007-.22.257-.026-.024.033-.034.025.027-.257.22-.007-.007zm-.027-.415c-.078.088-.078.257-.023.35a.31.31 0 0 0 .051.063l.205-.204-.233-.209z"
                      transform="translate(448 544)"
                    ></path>
                  </g>
                </g>
              </svg>
            }
          />
          <Eclipsis
            onClick={() => {
              navigate("/inventory");
              getProducts();
            }}
            title="Inicio"
            statu={!optionState && true}
            iconSvg={
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10A1 1 0 0 0 3 14h2v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669zM12 16a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
            }
          />
          <Eclipsis
            disabled
            onClick={handleTypeView}
            title={typeView === "post" ? "Tabla" : "Post"}
            iconSvg={
              typeView === "table" ? (
                <svg
                  fill="currentColor"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3H5c-1.103 0-2 .897-2 2v4h18V5c0-1.103-.897-2-2-2zM3 19c0 1.103.897 2 2 2h8V11H3v8zm12 2h4c1.103 0 2-.897 2-2v-8h-6v10z" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 330 330"
                  fill="currentColor"
                  width="24px"
                  height="24px"
                >
                  <path d="M315,30H15C6.716,30,0,36.716,0,45v60v180c0,8.284,6.716,15,15,15h300c8.284,0,15-6.716,15-15V105V45 C330,36.716,323.284,30,315,30z M150,120v60H30v-60H150z M180,120h120v60H180V120z M30,210h120v60H30V210z M180,270v-60h120v60H180z" />
                </svg>
              )
            }
          />
          <Eclipsis
            onClick={() => navigate("/inventory/favorite")}
            title="Favoritos"
            statu={optionState === "favorite" && true}
            iconSvg={
              <svg
                width="32px"
                height="32px"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M29.895,12.52c-0.235-0.704-0.829-1.209-1.549-1.319l-7.309-1.095l-3.29-6.984C17.42,2.43,16.751,2,16,2  s-1.42,0.43-1.747,1.122l-3.242,6.959l-7.357,1.12c-0.72,0.11-1.313,0.615-1.549,1.319c-0.241,0.723-0.063,1.507,0.465,2.046  l5.321,5.446l-1.257,7.676c-0.125,0.767,0.185,1.518,0.811,1.959c0.602,0.427,1.376,0.469,2.02,0.114l6.489-3.624l6.581,3.624  c0.646,0.355,1.418,0.311,2.02-0.114c0.626-0.441,0.937-1.192,0.811-1.959l-1.259-7.686l5.323-5.436  C29.958,14.027,30.136,13.243,29.895,12.52z" />
              </svg>
            }
          />

          <Popover
            componentButton={
              <Eclipsis
                title="Opciones"
                statu={optionState === "options" && true}
                iconSvg={
                  <svg
                    width="32px"
                    height="32px"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                  >
                    <path
                      d="M16,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S17.654,13,16,13z"
                      id="XMLID_287_"
                    />
                    <path
                      d="M6,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S7.654,13,6,13z"
                      id="XMLID_289_"
                    />
                    <path
                      d="M26,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S27.654,13,26,13z"
                      id="XMLID_291_"
                    />
                  </svg>
                }
              />
            }
          >
            <SidebarLayout>
              <SidebarBody>
                <SidebarItem
                  Href={"/inventory/create"}
                  Icon={faAdd}
                  Text="Nuevo"
                />
                <SidebarItem
                  iconSvg={
                    <svg
                      width="256px"
                      height="256px"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                    >
                      <path d="M136,88H120V35.3103L91.65625,63.64648A7.99983,7.99983,0,1,1,80.34375,52.332l42-41.98926a8.00063,8.00063,0,0,1,11.3125,0l42,41.98926a7.99983,7.99983,0,1,1-11.3125,11.31445L136,35.3103Zm64,0H136v40a8,8,0,0,1-16,0V88H56a16.01833,16.01833,0,0,0-16,16V208a16.01833,16.01833,0,0,0,16,16H200a16.01833,16.01833,0,0,0,16-16V104A16.01833,16.01833,0,0,0,200,88Z" />
                    </svg>
                  }
                  Text="Exportar (JSON)"
                />
                <SidebarItem
                  iconSvg={
                    <svg
                      width="6.3500002px"
                      height="6.3500002px"
                      viewBox="0 0 6.3500002 6.3500002"
                      fill="currentColor"
                    >
                      <g>
                        <path d="M 1.5867234,-6.0000002e-8 C 1.0049946,-6.0000002e-8 0.52787411,0.47712021 0.52787411,1.0588503 V 5.29115 c 0,0.5817402 0.47712049,1.0588501 1.05884929,1.0588501 H 4.762242 c 0.5817394,0 1.0588493,-0.4771099 1.0588493,-1.0588501 V 2.6468671 H 4.275967 c -0.6794606,0 -1.2345512,-0.5571573 -1.2345512,-1.2366171 V -6.0000002e-8 Z m 1.984375,0.001032 V 1.4102483 c 0,0.3954499 0.309417,0.7069336 0.7048686,0.7069336 H 5.8221259 C 5.8062244,1.2959781 5.5476048,0.72875881 5.1043404,0.40049051 4.6804778,0.08659171 4.1411776,0.00417771 3.5710984,0.00103194 Z M 1.5867234,1.1249943 H 2.3815079 A 0.2645835,0.2645835 0 0 1 2.6450567,1.3890606 0.2645835,0.2645835 0 0 1 2.3815079,1.6546777 H 1.5867234 A 0.2645835,0.2645835 0 0 1 1.3226586,1.3890606 0.2645835,0.2645835 0 0 1 1.5867234,1.1249943 Z m 0,0.9921875 H 2.3815079 A 0.2645835,0.2645835 0 0 1 2.6450567,2.3812481 0.2645835,0.2645835 0 0 1 2.3815079,2.6468652 H 1.5867234 A 0.2645835,0.2645835 0 0 1 1.3226586,2.3812481 0.2645835,0.2645835 0 0 1 1.5867234,2.1171818 Z m 0.8769509,0.8071858 v 1.0759033 c 0,0.0371 -0.021802,0.058394 -0.058912,0.058394 H 1.3360942 C 1.4141859,3.4724946 1.8784821,3.0056661 2.4636743,2.9243676 Z m 0.5291666,0.038757 c 0.5589218,0.1543598 0.9746166,0.6632758 0.9746166,1.26969 0,0.7274901 -0.5949104,1.3239504 -1.3224008,1.3239504 -0.6035966,0 -1.1101361,-0.4129947 -1.2671055,-0.9684166 h 1.0268109 c 0.3211513,0 0.5880788,-0.2669278 0.5880788,-0.5880777 z" />
                      </g>
                    </svg>
                  }
                  Text="Generar reporte"
                />
                <SidebarItem
                  iconSvg={
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4.75,20.5 L19.25,20.5 C19.6642136,20.5 20,20.8357864 20,21.25 C20,21.6296958 19.7178461,21.943491 19.3517706,21.9931534 L19.25,22 L4.75,22 C4.33578644,22 4,21.6642136 4,21.25 C4,20.8703042 4.28215388,20.556509 4.64822944,20.5068466 L4.75,20.5 L19.25,20.5 L4.75,20.5 Z M16.25,3 C18.3210678,3 20,4.67893219 20,6.75 L20,15.25 C20,17.3210678 18.3210678,19 16.25,19 L7.75,19 C5.67893219,19 4,17.3210678 4,15.25 L4,6.75 C4,4.67893219 5.67893219,3 7.75,3 L16.25,3 Z"></path>
                    </svg>
                  }
                  Text="Ver tutorial"
                />
                <SidebarItem Icon={faBug} Text="Reportar error" />
                <SidebarItem
                  iconSvg={
                    <svg
                      width="32px"
                      height="32px"
                      viewBox="0 0 32 32"
                      fill="currentColor"
                    >
                      <path d="M27.526,18.036L27,17.732c-0.626-0.361-1-1.009-1-1.732s0.374-1.371,1-1.732l0.526-0.304  c1.436-0.83,1.927-2.662,1.098-4.098l-1-1.732c-0.827-1.433-2.666-1.925-4.098-1.098L23,7.339c-0.626,0.362-1.375,0.362-2,0  c-0.626-0.362-1-1.009-1-1.732V5c0-1.654-1.346-3-3-3h-2c-1.654,0-3,1.346-3,3v0.608c0,0.723-0.374,1.37-1,1.732  c-0.626,0.361-1.374,0.362-2,0L8.474,7.036C7.042,6.209,5.203,6.701,4.375,8.134l-1,1.732c-0.829,1.436-0.338,3.269,1.098,4.098  L5,14.268C5.626,14.629,6,15.277,6,16s-0.374,1.371-1,1.732l-0.526,0.304c-1.436,0.829-1.927,2.662-1.098,4.098l1,1.732  c0.828,1.433,2.667,1.925,4.098,1.098L9,24.661c0.626-0.363,1.374-0.361,2,0c0.626,0.362,1,1.009,1,1.732V27c0,1.654,1.346,3,3,3h2  c1.654,0,3-1.346,3-3v-0.608c0-0.723,0.374-1.37,1-1.732c0.625-0.361,1.374-0.362,2,0l0.526,0.304  c1.432,0.826,3.271,0.334,4.098-1.098l1-1.732C29.453,20.698,28.962,18.865,27.526,18.036z M16,21c-2.757,0-5-2.243-5-5s2.243-5,5-5  s5,2.243,5,5S18.757,21,16,21z" />
                    </svg>
                  }
                  Text="Configuracion"
                />
              </SidebarBody>
            </SidebarLayout>
          </Popover>
        </NavRigth>
      </Header>
      <Body>
        <InfiniteScroll
          dataLength={data.length}
          next={() => getProductsNext()}
          hasMore={true}
        />

        {!optionState || optionState || searsh === "create" ? (
          <>
            {loadingProducts || data.length > 0 ? (
              <Table>
                <thead>
                  <tr>
                    <th style={{ width: "50px", textAlign: "center" }}>#</th>
                    <th style={{ width: "150px" }}>Marca</th>
                    <th>Descripcion</th>
                    <th style={{ width: "150px", textAlign: "center" }}></th>
                    <th style={{ width: "100px" }}>Precio</th>
                    <th style={{ width: "40px", textAlign: "center" }}>
                      Stock
                    </th>
                    <th style={{ width: "40px", textAlign: "center" }}></th>
                  </tr>
                </thead>
                {loadingProducts ? (
                  <tbody>
                    <tr>
                      <td>
                        <LoaderTable />{" "}
                      </td>
                      <td>
                        <LoaderTable />
                      </td>
                      <td>
                        <LoaderTable />
                      </td>
                      <td>
                        <LoaderTable />
                      </td>
                      <td>
                        <LoaderTable />
                      </td>
                      <td>
                        <LoaderTable />
                      </td>
                      <td>
                        <LoaderTable />
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {data.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          !item.statu ? "disable_style trbody" : "trbody"
                        }
                        style={{ cursor: "pointer" }}
                        onDoubleClick={() =>
                          navigate("/inventory/v/" + item.uid)
                        }
                      >
                        <td
                          title={"Doble click para ver"}
                          style={{ width: "50px", textAlign: "center" }}
                        >
                          <div
                            style={{
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {!item.statu ? (
                              <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <title>Producto Deshabilitado</title>
                                <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm0 2a9.941 9.941 0 0 1 6.3 2.24L4.24 18.3A9.995 9.995 0 0 1 12 2zm0 20a9.985 9.985 0 0 1-6.36-2.28L19.72 5.64A10 10 0 0 1 12 22z" />
                              </svg>
                            ) : (
                              <>{index + 1}</>
                            )}
                          </div>
                        </td>
                        <td title={"Doble click para ver"}>{item.brand}</td>
                        <td title={"Doble click para ver"}>
                          {item.description.slice(0, 130)}{" "}
                          {item.description.length > 130 && "..."}
                        </td>
                        <td title={"Doble click para ver"}>
                          {TimeAgoHourFormat(item.created_at)}
                        </td>
                        <td title={"Doble click para ver"}>
                          {formatNumberMoney(item.pricing.price_unity)}
                        </td>
                        <td
                          title={"Doble click para ver"}
                          style={{ width: "40px", textAlign: "center" }}
                        >
                          {item.pricing.cuantity}
                        </td>
                        <td style={{ cursor: "default" }} className="tdoption">
                          <OptionComponentRow item={item} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </Table>
            ) : (
              <>
                <ContainerNoData>
                  <img src="/assets/profile-first-repo-dark.svg" alt="" />
                  {searsh ? (
                    <h4>
                      No se encontraron resultados de la busqueda "{searshText}"
                    </h4>
                  ) : (
                    <h4>
                      Tu inventario no tiene productos{" "}
                      <Link className="link-btn" to="/inventory/create">
                        Click aqui
                      </Link>{" "}
                      para agregar uno nuevo
                    </h4>
                  )}
                </ContainerNoData>
              </>
            )}
          </>
        ) : (
          <h1>Home</h1>
        )}
      </Body>
      <Footer></Footer>
      {/* modals */}
      <Toaster position="bottom-left" reverseOrder={false} />
      {option === "create" && (
        <div>
          <LayoutModal title="Agregar producto" Width="500px" maxHeigth="600px">
            <NewComponent notify={notify} />
          </LayoutModal>
        </div>
      )}
      {option === "v" && (
        <div>
          <LayoutModal
            frameOnclick
            title="Review del producto"
            className="blur-back"
            Width="600px"
            maxHeigth="600px"
          >
            <ReviewComponent uid={uid} />
          </LayoutModal>
        </div>
      )}
    </Container>
  );
}

const InputSearshContainer = styled.div`
  width: 300px;
`;
const Container = styled.div``;
const Header = styled.div`
  display: flex;
  align-items: center;
`;
const Body = styled.div`
  padding: 10px 0;
  table {
    tbody {
      .disable_style {
        td {
          color: var(--write-700) !important;
        }
      }
      .trbody:hover .tdoption > div > div > div {
        opacity: 1;
      }
      .tdoption > div > div > div {
        opacity: 0;
        transition: 0.2s;
      }
    }
  }
`;
const Footer = styled.div``;
const NavRigth = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;
`;
const NavigateLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const TableOptionsTd = styled.div``;

const LoadingContainer = styled.div`
  width: 100px;
  height: 400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const ContainerNoData = styled.div`
  justify-content: center;
  text-align: center;
  img {
    margin: 0 auto;
    animation: moveimage 3s linear infinite alternate-reverse;

    @keyframes moveimage {
      0% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
  h4 {
    max-width: 300px;
    margin: 0 auto;
    font-size: 14px;
    color: var(--write-200);
  }
`;
