import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Router } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { PostDetailsPage } from "./pages/PostDetailsPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/posts" Component={HomePage} />
      <Route path="/posts/:id" Component={PostDetailsPage} />
    </Router>
  );
}

export default App;
