import React, { useEffect, useState, useRef } from "react";
import { getCharacters } from "../services/star-wars-api";
import { CharactersList, Container, Loader } from "../components";
import Pagination from "../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";

const CharactersPage = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]); // State for character data
  const [nextPage, setNextPage] = useState(null); // State for the next page URL
  const [prevPage, setPrevPage] = useState(null); // State for the previous page URL
  const [currentPage, setCurrentPage] = useState(1); // State for the current page number
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const [isDataLoaded, setIsDataLoaded] = useState(false); // State to track if data has loaded
  const scrollPosition = useRef(0); // Ref to save scroll position
  const [isTransitioning, setIsTransitioning] = useState(false); // State for page transition

  // Save scroll position before page change
  const saveScrollPosition = () => {
    scrollPosition.current = window.scrollY;
  };

  // Restore saved scroll position after data loads
  const restoreScrollPosition = () => {
    window.scrollTo(0, scrollPosition.current);
  };

  const fetchCharacters = async (url) => {
    setIsTransitioning(true); // Set transitioning state
    setIsLoading(true); // Set loading state
    setIsDataLoaded(true);
    try {
      const data = await getCharacters(url); // Fetch character data from the API
      setNextPage(data.next); // Update state with the next page URL
      setPrevPage(data.previous); // Update state with the previous page URL

      const pageNum = new URL(url).searchParams.get("page") || 1; // Extract current page number from the URL
      setCurrentPage(Number(pageNum)); // Update current page state
      navigate(`/characters?page=${pageNum}`); // Update the address bar with the current page

      // Delay character data update for smooth transition
      setTimeout(() => {
        setCharacters(data.results); // Update character data
        setIsDataLoaded(true); // Set data loaded state to true
        setIsTransitioning(false); // Reset transitioning state
      }, 1); // Delay for smoothness
    } catch (error) {
      setIsTransitioning(false);
      console.log(error); // Log any errors during fetching
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Fetch initial data when component mounts
  useEffect(() => {
    const initialUrl = "https://sw-api.starnavi.io/people/?page=1";
    fetchCharacters(initialUrl);
  }, []);

  // Restore scroll position after characters have been updated
  useEffect(() => {
    if (isDataLoaded) {
      restoreScrollPosition();
    }
  }, [characters, isDataLoaded]);

  const handleNextPage = () => {
    if (nextPage) {
      saveScrollPosition(); // Save current scroll position before loading new page
      fetchCharacters(nextPage); // Fetch the next page of characters
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      saveScrollPosition(); // Save current scroll position before loading previous page
      fetchCharacters(prevPage); // Fetch the previous page of characters
    }
  };

  return (
    <Container>
      {isLoading && !isTransitioning && <Loader />}
      {/* Show Loader during initial load */}
      {isDataLoaded ? ( // Проверяем, загрузка завершена
        characters.length > 0 ? ( // Проверяем, есть ли персонажи
          <CharactersList characters={characters} /> // Отображаем список персонажей
        ) : (
          <p>No characters available</p>
        )
      ) : null}
      {isDataLoaded && (
        <Pagination
          nextPage={nextPage}
          prevPage={prevPage}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
        />
      )}
      {isTransitioning && <Loader />}
      {isTransitioning && <div style={{ height: "50px" }} />}{" "}
    </Container>
  );
};

export default CharactersPage;
