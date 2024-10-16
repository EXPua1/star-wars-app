import axios from "axios";

export const getCharacters = async (url) => {
  const { data } = await axios.get(url);
  return {
    results: data.results,
    next: data.next,
    previous: data.previous,
  };
};

export const getCharacter = async (id) => {
  const { data } = await axios.get(`https://sw-api.starnavi.io/people/${id}`);
  return data;
};

export const getMovieById = async (filmId) => {
  const { data } = await axios.get(
    `https://sw-api.starnavi.io/films/${filmId}`
  );
  return data;
};

export const getShipById = async (shipId) => {
  const { data } = await axios.get(
    `https://sw-api.starnavi.io/starships/${shipId}`
  );
  return data;
};
