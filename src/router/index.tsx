import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PageNotFound from "../pages/PageNotFound";
import RootLayout from "../pages/Layout";
import ErrorHandler from "../components/errors/ErrorHandler";
import HomePage from "../pages";
import LoginPage from "../pages/Login"; 
import RegisterPage from "../pages/Register";
import Profile from "../pages/Profile";

// localStorage

const getUserLocalStorage =  window.localStorage.getItem("token");
const getTokenLocalStorage = getUserLocalStorage ? JSON.parse(getUserLocalStorage) : null;

// console.log(getTokenLocalStorage);


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRoute  isAllowed={getTokenLocalStorage} redirectPath="/login" >
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="Profile"
          element={
            <ProtectedRoute  isAllowed={getTokenLocalStorage} redirectPath="/login" >
              <Profile/>
            </ProtectedRoute>
          }
        />
        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!getTokenLocalStorage} redirectPath="/" >
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute isAllowed={!getTokenLocalStorage} redirectPath="/login" >
              <RegisterPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
