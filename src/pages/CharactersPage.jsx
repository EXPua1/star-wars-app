import React, { useEffect, useState } from "react";
import { getCharacters } from "../services/star-wars-api";
import { CharactersList, Container } from "../components";
import Pagination from "../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";

const CharactersPage = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]); // State for character data
  const [nextPage, setNextPage] = useState(null); // State for the next page URL
  const [prevPage, setPrevPage] = useState(null); // State for the previous page URL
  const [currentPage, setCurrentPage] = useState(1); // State for the current page number
  const [isLoading, setIsLoading] = useState(false);

  const fetchCharacters = async (url) => {
    setIsLoading(true);
    try {
      const data = await getCharacters(url); // Fetch character data from the API
      setCharacters(data.results); // Update state with fetched characters
      setNextPage(data.next); // Update state with the next page URL
      setPrevPage(data.previous); // Update state with the previous page URL

      const pageNum = new URL(url).searchParams.get("page") || 1; // Extract current page number from the URL
      setCurrentPage(Number(pageNum)); // Update current page state
      navigate(`/characters?page=${pageNum}`); // Update the address bar with the current page
    } catch (error) {
      console.log(error); // Log any errors during fetching
    } finally {
      setIsLoading(false);
    }
  };

  // Load the first page when the component mounts
  useEffect(() => {
    setIsLoading(true);
    try {
      fetchCharacters("https://sw-api.starnavi.io/people/?page/"); // Initial API call to fetch the first page of characters
    } catch (error) {
      console.log(error); // Log any errors during fetching
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNextPage = () => {
    if (nextPage) {
      fetchCharacters(nextPage); // Fetch the next page of characters
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchCharacters(prevPage); // Fetch the previous page of characters
    }
  };

  return (
    <Container>
      {!isLoading && (
        <CharactersList
          characters={characters}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
      <Pagination
        nextPage={nextPage} // Pass the next page URL to Pagination
        prevPage={prevPage} // Pass the previous page URL to Pagination
        onNext={handleNextPage} // Function to handle next page navigation
        onPrev={handlePrevPage} // Function to handle previous page navigation
      />
    </Container>
  );
};

export default CharactersPage;
