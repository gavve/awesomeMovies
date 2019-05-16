import React from "react";
import { MovieContext } from "../index";

const useMovies = () => {
  const context = React.useContext(MovieContext);
  if (!context) {
    throw new Error("Component not in context");
  }

  const [state, dispatch] = context;

  function fetchMovies(query) {
    dispatch({ type: "REQUEST_MOVIES" });

    fetch(`https://www.omdbapi.com/?apikey=729a97b&s=${query}`)
      .then(response => response.json(), error => console.log(error))
      .then(data => {
        // here we have the data
        // setMovies(data.Search)
        dispatch({ type: "RECIEVED_MOVIES", movies: data.Search });
      });
  }

  function addToFavourites(movie) {
    dispatch({ type: "ADD_MOVIE_TO_FAVOURITES", movie: movie });
  }

  return {
    state,
    dispatch,
    fetchMovies,
    addToFavourites
  };
};

export default useMovies;
