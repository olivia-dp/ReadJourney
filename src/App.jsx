import { lazy, Suspense, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
// import PublicRoute from "./components/PublicRoute/PublicRoute";
// import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import { useDispatch } from "react-redux";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const LoginPage = lazy(() => import("./pages/LogInPage/LogInPage"));
const RegisterPage = lazy(() =>
  import("./pages/RegisterPage/RegisterPage")
);

function App() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();


  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <Routes>
        {/* <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        /> */}
        <Route
          path="/register"
          element={
            // <PublicRoute>
              <RegisterPage />
            // </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            // <PublicRoute>
              <LoginPage />
            // </PublicRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
