import axios from "axios";

axios.defaults.baseURL = "https://sw-api.starnavi.io/";

export const getCharacters = async (url) => {
  const { data } = await axios.get(url); // используем переданный URL
  return {
    results: data.results, // возвращаем массив персонажей
    next: data.next, // возвращаем ссылку на следующую страницу
    previous: data.previous, // возвращаем ссылку на предыдущую страницу
  };
};
export const getCharacter = async (id) => {
  const { data } = await axios.get(`/people/${id}`);
  return data;
};
