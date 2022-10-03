import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Connexion from "./pages/Connexion";
import Header from "./components/Header";
import EditProfile from "./pages/EditProfile";
import AxiosInterceptor from "./components/AxiosInterceptor";

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
