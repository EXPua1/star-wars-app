import React, { useEffect, useState } from "react";
import { Character, Container, Navigation } from "../components";
import { useLocation, useParams } from "react-router-dom";
import {
  getCharacter,
  getMovieById,
  getShipById,
} from "../services/star-wars-api";

const CharacterDetailPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);
  const [ships, setShips] = useState(null);
  const location = useLocation();
  const characterName = location.state?.name; // taking name of character from state

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const characterData = await getCharacter(id);
        setCharacter(characterData);
        console.log(characterData);
        const filmData = await Promise.all(
          characterData.films.map((filmId) => getMovieById(filmId))
        );
        setFilms(filmData);
        console.log(filmData); // log film for check
        const shipData = await Promise.all(
          characterData.starships.map((shipId) => getShipById(shipId))
        );
        setShips(shipData); // adding ships to state
        console.log(shipData); // log ships for check
      } catch (error) {}
    };
    fetchCharacter();
  }, [id]);

  return (
    <Container>
      <Navigation characterName={characterName} />
      <Character character={character} films={films} ships={ships} />
    </Container>
  );
};

export default CharacterDetailPage;
