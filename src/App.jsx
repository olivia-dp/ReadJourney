import { lazy, Suspense, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing } from "./redux/auth/selectors";
import RestrictedLayout from "./components/RestrictedLayout/RestrictedLayout";
import { refreshUserThunk } from "./redux/auth/operations";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const LoginPage = lazy(() => import("./pages/LogInPage/LogInPage"));
const RegisterPage = lazy(() =>
  import("./pages/RegisterPage/RegisterPage")
);
const RecommendedPage = lazy(() => import("./pages/RecommendedPage/RecommendedPage"));
const LibraryPage = lazy(() => import("./pages/LibraryPage/LibraryPage"));


function App() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();
const isLoggedIn = useSelector(selectIsLoggedIn);
const isRefreshing = useSelector(selectIsRefreshing);
useEffect(() => {
  dispatch(refreshUserThunk());
}, [dispatch]);

if (isRefreshing) {
  return <p>Loading user...</p>; 
}

  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard/recommended" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
             </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
             </PublicRoute>
          }
        />
        <Route
      path="/dashboard"
      element={
        <RestrictedRoute>
          <RestrictedLayout />
        </RestrictedRoute>
      }
    >
      <Route path="recommended" element={<RecommendedPage />} />
      <Route path="library" element={<LibraryPage />} />
    </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
)
}

export default App
