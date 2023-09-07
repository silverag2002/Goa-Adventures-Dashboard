import { useLocation, Outlet, Navigate } from "react-router-dom";
// import useAuth from "base/hooks/useAuth";

const RequireAuth = () => {
  //   const { auth } = useAuth();
  //   const location = useLocation();
  //   return auth?.user ? (
  //     <Outlet />
  //   ) : (
  //     <Navigate to="/" state={{ from: location }} replace />
  //   );
};
export default RequireAuth;
