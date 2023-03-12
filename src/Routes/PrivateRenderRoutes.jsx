import { Navigate, Route, Routes } from "react-router-dom";

const PrivateRenderRoutes = ({
  routes = [
    {
      path: "/",
      element: () => <></>,
    },
  ],
}) => (
  <Routes>
    {routes.map((route, routeIdx) => (
      <Route path={route.path} key={routeIdx} element={route.element}/>
    ))}
    <Route
      path="*"
      element={<Navigate to="/login" replace />}
    />
  </Routes>
);
export default PrivateRenderRoutes