import { React, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "modern-normalize";
import "./index.css";
import { Container, Footer, Header, Loader, Navigation } from "./components";

const pages = {
  HomePage: lazy(() => import("./pages/HomePage")),
  CharactersPage: lazy(() => import("./pages/CharactersPage")),
  CharacterDetailPage: lazy(() => import("./pages/CharactersDetailPage")),
  NotFound: lazy(() => import("./pages/NotFound")),
};

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
    <Suspense fallback={<Loader />}>
      <Container>
        <Header />
        {routeExists && <Navigation />}

        <Routes>
          <Route path="/" element={<pages.HomePage />} />
          <Route path="/characters" element={<pages.CharactersPage />} />
          <Route
            path="/characters/:id"
            element={<pages.CharacterDetailPage />}
          />
          <Route path="*" element={<pages.NotFound />} />
        </Routes>

        <Footer />
      </Container>
    </Suspense>
  );
};

export default App;
