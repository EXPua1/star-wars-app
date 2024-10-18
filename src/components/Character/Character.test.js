import React from "react";
import { render } from "@testing-library/react";
import Character from "./Character";

// mock
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("Character", () => {
  test("displays loading message when character data is not available", () => {
    const { getByText } = render(
      <Character character={null} films={[]} ships={[]} />
    );

    expect(getByText(/Loading character data.../i)).toBeInTheDocument();
  });

  test("displays films when film data is available", () => {
    const character = { name: "Luke Skywalker" };
    const films = [
      { title: "A New Hope" },
      { title: "The Empire Strikes Back" },
    ];

    const { getByText } = render(
      <Character character={character} films={films} ships={[]} />
    );

    expect(getByText(/Film: A New Hope/i)).toBeInTheDocument();
    expect(getByText(/Film: The Empire Strikes Back/i)).toBeInTheDocument();
  });

  test("creates graph nodes based on films and ships data", () => {
    const character = { name: "Luke Skywalker" };
    const films = [{ title: "A New Hope" }];
    const ships = [{ name: "X-Wing" }];

    const { getByText } = render(
      <Character character={character} films={films} ships={ships} />
    );

    expect(getByText(/Film: A New Hope/i)).toBeInTheDocument();
    expect(getByText(/Ship: X-Wing/i)).toBeInTheDocument();
  });
});
