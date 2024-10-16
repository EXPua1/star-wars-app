import { React, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "modern-normalize";
import "./index.css";
import { Container, Header, Section } from "./components";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Container>
        <Header />
      </Container>

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Suspense>
  );
};

export default App;
