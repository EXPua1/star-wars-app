// service/star-wars-api.test.js
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import {
  getCharacters,
  getCharacter,
  getMovieById,
  getShipById,
} from "./star-wars-api.js";

const mock = new AxiosMockAdapter(axios);

describe("Star Wars API functions", () => {
  afterEach(() => {
    mock.reset(); // Сбрасываем моки после каждого теста
  });

  test("getCharacters should return character data", async () => {
    const mockResponse = {
      results: [{ name: "Luke Skywalker" }],
      next: null,
      previous: null,
    };

    mock.onGet("https://sw-api.starnavi.io/people").reply(200, mockResponse);

    const data = await getCharacters("https://sw-api.starnavi.io/people");
    expect(data).toEqual(mockResponse);
  });

  test("getCharacter should return a specific character", async () => {
    const mockResponse = {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
    };

    mock.onGet("https://sw-api.starnavi.io/people/1").reply(200, mockResponse);

    const data = await getCharacter(1);
    expect(data).toEqual(mockResponse);
  });

  test("getMovieById should return movie data", async () => {
    const mockResponse = {
      title: "A New Hope",
      episode_id: 4,
      opening_crawl: "It is a period of civil war...",
    };

    mock.onGet("https://sw-api.starnavi.io/films/1").reply(200, mockResponse);

    const data = await getMovieById(1);
    expect(data).toEqual(mockResponse);
  });

  test("getShipById should return ship data", async () => {
    const mockResponse = {
      name: "X-Wing",
      model: "T-65 X-wing starfighter",
    };

    mock
      .onGet("https://sw-api.starnavi.io/starships/1")
      .reply(200, mockResponse);

    const data = await getShipById(1);
    expect(data).toEqual(mockResponse);
  });

  test("getCharacters should handle errors", async () => {
    mock.onGet("https://sw-api.starnavi.io/people").reply(500);

    await expect(
      getCharacters("https://sw-api.starnavi.io/people")
    ).rejects.toThrow();
  });
});
