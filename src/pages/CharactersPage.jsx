import React, { useEffect, useState } from "react";
import { getCharacters } from "../services/star-wars-api";
import { CharactersList, Container } from "../components";
import Pagination from "../components/Pagination/Pagination";

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]); // состояние для данных
  const [nextPage, setNextPage] = useState(null); // состояние для следующей страницы
  const [prevPage, setPrevPage] = useState(null); // состояние для предыдущей страницы

  const fetchCharacters = async (url) => {
    try {
      const data = await getCharacters(url);
      setCharacters(data.results); // обновляем состояние с полученными персонажами
      setNextPage(data.next); // обновляем ссылку на следующую страницу
      setPrevPage(data.previous); // обновляем ссылку на предыдущую страницу
    } catch (error) {
      console.log(error);
    }
  };

  // Загрузка первой страницы при монтировании компонента
  useEffect(() => {
    fetchCharacters("https://sw-api.starnavi.io/people/"); // начальный URL
  }, []);

  const handleNextPage = () => {
    if (nextPage) {
      fetchCharacters(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchCharacters(prevPage);
    }
  };

  return (
    <Container>
      <CharactersList characters={characters} />
      <Pagination
        nextPage={nextPage}
        prevPage={prevPage}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
      />
    </Container>
  );
};

export default CharactersPage;
