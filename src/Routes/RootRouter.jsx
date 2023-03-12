import React from "react";
import { BrowserRouter} from "react-router-dom";
import PublicLayout  from "../Components/Layouts/PublicLayout";
import {PublicRoute} from './PublicRoute'
import AppLayout from "../Components/Layouts/AppLayout";
import { useSelector } from "react-redux";
import PrivateLayout from "../Components/Layouts/PrivateLayout";
import { PrivateRoute } from "./PrivateRoute";
import PrivateRenderRoutes from "./PrivateRenderRoutes";
import PublicRenderRoutes from "./PublicRenderRoutes";

const GuestRoute = () => {
  return (
    <PublicLayout>
      <PublicRenderRoutes routes={PublicRoute} />  
    </PublicLayout>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <>
      <PrivateLayout>       
        <PrivateRenderRoutes routes={PrivateRoute} />     
      </PrivateLayout>
    </>
  );
};

const RootRouter = () => {
  const token = useSelector((state) => state.auth.token);
  // updateAuthToken(token);
  console.log("TOken", token)
  // const baseName = process.env.REACT_APP_BASE_NAME;
  const isAuthenticated = !!token;
  // const isAuthenticated = true;
  // const isAuthenticated = false;
  console.log(isAuthenticated, "isAuthenticated")

  return (
    <BrowserRouter basename={""}>
      {/* <DocumentTitle isAuthenticated={isAuthenticated} /> */}
      <AppLayout isAuthenticated={isAuthenticated}>{isAuthenticated ? <GuestRoute />: <AuthenticatedRoutes />}</AppLayout>
    </BrowserRouter>
  );
};

export default RootRouter;

