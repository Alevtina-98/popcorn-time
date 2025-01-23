import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./GenreMovies.css";

const GengeMovies = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };
    fetchMovies();
  }, [genreId]);

  const handleClickMovie = (id) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="genre-movies">
      <div className="genre-movies-wrapper">
        <h2 className="genre-movies-title">Movies in this Genre</h2>
        <div className="genre-movies-card">
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleClickMovie(movie.id)}
              className="item-movies"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w200${movie.poster_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h3>{movie.title}</h3>
              {/* <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default GengeMovies;
