import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import CharactersList from "./CharactersList";
import React from "react";

test("renders CharactersList component", () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<CharactersList characters={[]} />} />
      </Routes>
    </MemoryRouter>
  );

  // check that the loading message is displayed
  expect(getByText(/No characters available/i)).toBeInTheDocument(); // Замените текст на тот, который ожидаете
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
