import React from "react";
import { getCharacters } from "../services/star-wars-api";
import { useEffect, useState } from "react";

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]); // state for data

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const data = await getCharacters();
        setCharacters(data); // adding characters data
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCharacter(); //call funcion
  }, []);

  return <div>CharactersPage</div>;
};

export default CharactersPage;
