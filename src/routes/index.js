import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Help from "../pages/help";
import Home from "../pages/home";
import Inventory from "../pages/inventory";
import Ofert from "../pages/ofert";
import Recent from "../pages/recent";
import Report from "../pages/report";
import Sale from "../pages/sale";
import Searsh from "../pages/searsh";
import Supplier from "../pages/supplier";
import User from "../pages/user";
import UserProfile from "../pages/user/profile";
import Wallet from "../pages/wallet";
import { NavRouterInclude } from "./utils/Nav&Sidebar";

// components

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"

          element={
            <NavRouterInclude navName="home">
              <Home />
            </NavRouterInclude>
          }
        />
        <Route
          path="/:option"
          
          element={
            <NavRouterInclude navName="home">
              <Home />
            </NavRouterInclude>
          }
        />

        <Route
          path="/recent"
          element={
            <NavRouterInclude navName="recent">
              <Recent />
            </NavRouterInclude>
          }
        />



        <Route
          path="/inventory"
          element={
            <NavRouterInclude navName="inventory">
              <Inventory />
            </NavRouterInclude>
          }
        />
        <Route
          path="/inventory/:option/:uid"
          element={
            <NavRouterInclude navName="inventory">
              <Inventory />
            </NavRouterInclude>
          }
        />
        <Route
          path="/inventory/:option"
          element={
            <NavRouterInclude navName="inventory">
              <Inventory />
            </NavRouterInclude>
          }
        />
        <Route
          path="/inventory/searsh/:searsh"
          element={
            <NavRouterInclude navName="inventory">
              <Inventory />
            </NavRouterInclude>
          }
        />




        <Route
          path="/sale"
          element={
            <NavRouterInclude navName="sale">
              <Sale />
            </NavRouterInclude>
          }
        />
        <Route
          path="/sale/:option"
          element={
            <NavRouterInclude navName="sale">
              <Sale />
            </NavRouterInclude>
          }
        />

        <Route
          path="/ofert"
          element={
            <NavRouterInclude navName="ofert">
              <Ofert />
            </NavRouterInclude>
          }
        />

        <Route
          path="/report"
          element={
            <NavRouterInclude navName="report">
              <Report />
            </NavRouterInclude>
          }
        />

        <Route
          path="/supplier"
          element={
            <NavRouterInclude navName="supplier">
              <Supplier />
            </NavRouterInclude>
          }
        />

        <Route
          path="/users"
          element={
            <NavRouterInclude navName="user">
              <User />
            </NavRouterInclude>
          }
        />

        <Route
          path="/user/:uid"
          element={
            <NavRouterInclude navName="userProfile">
              <UserProfile />
            </NavRouterInclude>
          }
        />

        <Route
          path="/wallet"
          element={
            <NavRouterInclude navName="wallet">
              <Wallet />
            </NavRouterInclude>
          }
        />

        <Route
          path="/help"
          element={
            <NavRouterInclude navName="help">
              <Help />
            </NavRouterInclude>
          }
        />

        <Route
          path="/help"
          element={
            <NavRouterInclude navName="help">
              <Help />
            </NavRouterInclude>
          }
        />

        <Route
          path="/searsh/:searsh"
          element={
            <NavRouterInclude navName="">
              <Searsh />
            </NavRouterInclude>
          }
        />

        {/* <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
