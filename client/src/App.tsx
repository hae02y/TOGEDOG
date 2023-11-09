import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PetFeed from "./pages/PetFeed";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element="" />
        <Route path="/feeds" element={<PetFeed />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
