// src/App.tsx
import React, {useEffect} from "react";
import LandingPage from './pages/LandingPage';
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css"
import { useDispatch } from "react-redux";
import { fetchUserData } from "./redux/slices/authSlice";
import { AppDispatch } from "./redux/store";

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  return (

      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<LandingPage />} /> {/* Redirect to LandingPage */}
      </Routes>

  );
};
export default App;
