import axios from "axios";

axios.defaults.baseURL = "https://sw-api.starnavi.io/";

export const getCharacters = async () => {
  const { data } = await axios.get("/people");
  return data.results;
};
export const getCharacter = async (id) => {
  const { data } = await axios.get(`/people/${id}`);
  return data;
};
