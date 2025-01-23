import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./Search.css";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;

  const searchMovies = useCallback(
    async (query) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
            query
          )}&language=en-US&page=1`
        );

        const data = response.data;

        if (data.results) {
          setResults(data.results);
          setError("");
        } else {
          setError("No results found.");
          setResults([]);
        }
      } catch (error) {
        setError("An error occurred while searching.");
        console.error(error);
      }
    },
    [apiKey]
  );

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      searchMovies(query);
    }
  }, [searchMovies, searchParams]);

  return (
    <div className="search-error">
      <h2 style={{ paddingLeft: "20px" }}>Search Result:</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="search-details">
        {results.length > 0 && (
          <div className="search-description">
            {results.map((movie) => (
              <div key={movie.id} className="search-item">
                <div className="description-img">
                  <img
                    className={
                      movie.poster_path ? "poster-image" : "placeholder-image"
                    }
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                        : "https://via.placeholder.com/342x750?text=No+Image"
                    }
                    alt={movie.poster_path ? movie.title : "No Image"}
                  />
                </div>
                <div className="description-item">
                  <h3 className="search-title">{movie.title}</h3>
                  <p className="search-overview">
                    {movie.overview && movie.overview.length > 0 ? (
                      <>
                        Overview: <br />
                        <span>{movie.overview}</span>
                      </>
                    ) : (
                      <span>Don&apos;t have overview </span>
                    )}
                  </p>
                  <p className="search-release-date">
                    Release Date: {movie.release_date}
                  </p>

                  <p className="search-trailer">
                    <Link
                      to={`https://www.youtube.com/results?search_query=${movie.title} trailer`}
                      target="_self"
                      rel="noopener noreferrer"
                    >
                      See the thriller
                    </Link>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;
