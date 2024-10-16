import { React, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "modern-normalize";
import "./index.css";
import { Container, Header, Navigation, Section } from "./components";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import CharactersPage from "./pages/CharactersPage";

const availableRoutes = [
  { path: "/", name: "Home" },
  { path: "/characters", name: "Characters" },
];

const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const routeExists = availableRoutes.some(
    (route) => route.path === currentPath
  );

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Container>
        <Header />
        {routeExists && <Navigation />}
      </Container>

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/characters" element={<CharactersPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Suspense>
  );
};

export default App;
