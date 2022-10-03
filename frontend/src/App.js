import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Connexion from "./pages/connexion";
import Header from "./components/header";
import EditProfile from "./pages/editprofile";
import AxiosInterceptor from "./components/axios";

const App = () => {
  return (
    <BrowserRouter>
      <AxiosInterceptor>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="*" element={<Home />} />
          <Route path="/connexion" element={<Connexion />} />
        </Routes>
      </AxiosInterceptor>
    </BrowserRouter>
  );
};

export default App;
