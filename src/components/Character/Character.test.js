import React from "react";
import { render } from "@testing-library/react";
import Character from "./Character";

describe("CharacterGraph", () => {
  test("displays loading message when character data is not available", () => {
    const { getByText } = render(
      <Character character={null} films={[]} ships={[]} />
    );

    // check that the loading message is displayed
    expect(getByText(/Loading character data.../i)).toBeInTheDocument();
  });
});
