import "./App.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import authservice from "./Appwrite/auth";
import { Footer, Header } from "./Components";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-slate-700">
      <div className="w-full block">
        <Header />
        <main>{/* <outlet /> */}</main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
