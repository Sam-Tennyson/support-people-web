import { Navigate, Route, Routes } from "react-router-dom";

const PublicRenderRoutes = ({
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
      element={<Navigate to="/" replace />}
    />
  </Routes>
);
export default PublicRenderRoutes