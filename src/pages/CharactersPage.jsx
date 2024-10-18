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
  const [isTransitioning, setIsTransitioning] = useState(false); // State for page transition
  const scrollPosition = useRef(0); // Ref to save scroll position

  const fetchCharacters = async (url) => {
    setIsLoading(true); // Set loading state
    setIsTransitioning(true); // Set transitioning state

    try {
      const data = await getCharacters(url); // Fetch character data from the API
      setNextPage(data.next); // Update state with the next page URL
      setPrevPage(data.previous); // Update state with the previous page URL

      const pageNum = new URL(url).searchParams.get("page") || 1; // Extract current page number from the URL
      setCurrentPage(Number(pageNum)); // Update current page state
      navigate(`/characters?page=${pageNum}`); // Update the address bar with the current page

      setCharacters(data.results); // Update character data
      setIsDataLoaded(true); // Set data loaded state to true
    } catch (error) {
      console.error("Error fetching characters:", error); // Log any errors during fetching
    } finally {
      setIsLoading(false); // Reset loading state
      setIsTransitioning(false); // Reset transitioning state
    }
  };

  // Fetch initial data when component mounts
  useEffect(() => {
    const initialUrl = "https://sw-api.starnavi.io/people/?page=1";
    fetchCharacters(initialUrl);
  }, []);

  const handleNextPage = () => {
    if (nextPage) {
      scrollPosition.current = window.scrollY; // Save current scroll position
      fetchCharacters(nextPage); // Fetch the next page of characters
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      scrollPosition.current = window.scrollY; // Save current scroll position
      fetchCharacters(prevPage); // Fetch the previous page of characters
    }
  };

  // Restore scroll position after characters have been updated
  useEffect(() => {
    if (isDataLoaded) {
      window.scrollTo(0, scrollPosition.current); // Restore saved scroll position
    }
  }, [characters, isDataLoaded]);

  return (
    <Container>
      {isLoading && <Loader />}
      {isDataLoaded && (
        <>
          {characters.length > 0 ? (
            <CharactersList characters={characters} />
          ) : (
            <p>No characters available</p>
          )}
          <Pagination
            nextPage={nextPage}
            prevPage={prevPage}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        </>
      )}
      {isTransitioning && <Loader />}
    </Container>
  );
};

export default CharactersPage;
