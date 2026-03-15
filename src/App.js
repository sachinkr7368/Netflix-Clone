import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./utils/firebase-config";

const Login = React.lazy(() => import("./pages/Login"));
const MoviePage = React.lazy(() => import("./pages/Movies"));
const Netflix = React.lazy(() => import("./pages/Netflix"));
const Player = React.lazy(() => import("./pages/Player"));
const Signup = React.lazy(() => import("./pages/Signup"));
const TVShows = React.lazy(() => import("./pages/TVShows"));
const UserListedMovies = React.lazy(() => import("./pages/UserListedMovies"));

function Loading() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "black", color: "white", fontSize: "1.5rem" }}>
      Loading...
    </div>
  );
}

function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children, isAuthenticated }) {
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoadingAuth) return <Loading />;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route exact path="/login" element={<PublicRoute isAuthenticated={isAuthenticated}><Login /></PublicRoute>} />
            <Route exact path="/signup" element={<PublicRoute isAuthenticated={isAuthenticated}><Signup /></PublicRoute>} />
            <Route exact path="/player" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Player /></ProtectedRoute>} />
            <Route exact path="/tv" element={<ProtectedRoute isAuthenticated={isAuthenticated}><TVShows /></ProtectedRoute>} />
            <Route exact path="/movies" element={<ProtectedRoute isAuthenticated={isAuthenticated}><MoviePage /></ProtectedRoute>} />
            <Route exact path="/new" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Player /></ProtectedRoute>} />
            <Route exact path="/mylist" element={<ProtectedRoute isAuthenticated={isAuthenticated}><UserListedMovies /></ProtectedRoute>} />
            <Route exact path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Netflix /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
