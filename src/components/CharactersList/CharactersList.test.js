import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import CharactersPage from "../../pages/CharactersPage";
import * as api from "../../services/star-wars-api"; // Путь к вашему API
import React from "react";
import CharactersList from "./CharactersList";

jest.mock("../../services/star-wars-api");

test("renders CharactersPage component with no characters", async () => {
  // mock getCharacters
  api.getCharacters.mockResolvedValueOnce({
    results: [],
    next: null,
    previous: null,
  });

  const { findByText } = render(
    <MemoryRouter initialEntries={["/characters"]}>
      <Routes>
        <Route path="/characters" element={<CharactersPage />} />
      </Routes>
    </MemoryRouter>
  );

  // wait for the text to be in the document
  expect(await findByText(/No characters available/i)).toBeInTheDocument();
});

test("renders characters when available", () => {
  const characters = [
    { id: 1, name: "Luke Skywalker" },
    { id: 2, name: "Darth Vader" },
  ];

  const { getByText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<CharactersList characters={characters} />} />
      </Routes>
    </MemoryRouter>
  );

  //checking name of characters in the list
  expect(getByText(/Luke Skywalker/i)).toBeInTheDocument();
  expect(getByText(/Darth Vader/i)).toBeInTheDocument();
});

test("renders the correct number of characters", () => {
  const characters = [
    { id: 1, name: "Luke Skywalker" },
    { id: 2, name: "Darth Vader" },
  ];

  const { container } = render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<CharactersList characters={characters} />} />
      </Routes>
    </MemoryRouter>
  );

  const listItems = container.querySelectorAll("li");
  expect(listItems.length).toBe(characters.length); // check that the number of list items matches the number of characters
});
