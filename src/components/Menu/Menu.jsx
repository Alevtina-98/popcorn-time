import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Menu.css";

const Menu = () => {
  const [movieGenres, setMovieGenres] = useState([]);
  const [isOpenMovieMenu, setIsOpenMovieMenu] = useState(false);
  const [tvGenres, setTvGenres] = useState([]);
  const [isOpenTvMenu, setIsOpenTvMenu] = useState(false);
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );
        setMovieGenres(response.data.genres);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGenres();
  }, [apiKey]);

  useEffect(() => {
    const fetchTv = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`
        );
        setTvGenres(response.data.genres);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTv();
  }, [apiKey]);

  const handleFocusMovie = (genreId) => {
    navigate(`/movies/genres/${genreId}`);
  };
  const handleFocusTv = (genreId) => {
    navigate(`/tv/genres/${genreId}`);
  };

  return (
    <div className="menu">
      <div className="movies">
        <button
          className="films-btn"
          onFocus={() => setIsOpenMovieMenu(!isOpenMovieMenu)}
        >
          Films
        </button>
        {isOpenMovieMenu && (
          <div className="dropdown-content">
            {movieGenres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleFocusMovie(genre.id)}
                className="genre-btn-movies"
              >
                {genre.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="serials">
        <button
          className="serials-btn"
          onFocus={() => setIsOpenTvMenu(!isOpenTvMenu)}
        >
          Serials
        </button>
        {isOpenTvMenu && (
          <div className="dropdown-content">
            {tvGenres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleFocusTv(genre.id)}
                className="genre-btn-serials"
              >
                {genre.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Menu;
