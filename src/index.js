import React from "react";
import ReactDOM from "react-dom";
import useMovies from "./hooks/useMovies";

// src/components/MmovieCard.js
const MovieCard = props => {
  const { addToFavourites } = useMovies();

  function handleClick(e) {
    e.preventDefault();
    addToFavourites(props);
  }

  return (
    <div className="card" style={{ width: "18em" }}>
      <img src={props.Poster} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.Title}</h5>
        <a href="#" className="btn btn-primary" onClick={handleClick}>
          Add to favourite
        </a>
      </div>
    </div>
  );
};

// src/components/MovieList.js
const MovieList = ({ movies, title }) => {
  return (
    <>
      <h1>{title}</h1>
      {movies.map(movie => {
        return <MovieCard {...movie} />;
      })}
    </>
  );
};

// src/reducers/movieReducers.js
const initialState = {
  isFetching: false,
  movies: [],
  favouriteMovies: []
};

function MovieReducer(state, action) {
  switch (action.type) {
    case "REQUEST_MOVIES": {
      return {
        ...state,
        isFetching: true
      };
    }
    case "RECIEVED_MOVIES": {
      return {
        ...state,
        isFetching: false,
        movies: action.movies
      };
    }
    case "ADD_MOVIE_TO_FAVOURITES": {
      return {
        ...state,
        favouriteMovies: [...state.favouriteMovies, action.movie]
      };
    }
    default:
      return state;
  }
}

// src/context/useMovies.js
export const MovieContext = React.createContext();

export const MovieProvider = props => {
  const [state, dispatch] = React.useReducer(MovieReducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <MovieContext.Provider value={value} {...props} />;
};

// src/components/App.js
function MoviePage() {
  const {
    state: { movies, favouriteMovies, isFetching },
    fetchMovies
  } = useMovies();
  const [query, setQuery] = React.useState("");

  function handleClick() {
    fetchMovies(query);
  }

  return (
    <>
      <h1>Knowits feta filmgrejpryl</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button className="btn btn-success" onClick={handleClick}>
        Sök
      </button>
      <h3>{isFetching ? "Hämtar data" : ""}</h3>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <MovieList movies={movies} title="Sökresultat" />
          </div>
          <div className="col-6">
            <MovieList movies={favouriteMovies} title="Våra favoritfillmer" />
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <MovieProvider>
      <MoviePage />
    </MovieProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
