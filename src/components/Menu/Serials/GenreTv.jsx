import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./GenreTv.css";

const GenreTv = () => {
  const [tvShows, setTvShows] = useState([]);
  const { genreId } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTv = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreId}`
        );
        setTvShows(response.data.results);
      } catch (error) {
        console.error("Failed to fetch serials:", error);
      }
    };
    fetchTv();
  }, [genreId]);

  const handleClickTvShows = (id) => {
    navigate(`/tv/show/${id}`);
  };

  return (
    <div className="genre-tv">
      <div className="genre-tv-wrapper">
        <h2 className="genre-tv-title">Serials in this Genre</h2>
        <div className="genre-tv-card">
          {tvShows.map((show) => (
            <div
              className="serials-genre-item"
              key={show.id}
              onClick={() => handleClickTvShows(show.id)}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w200${show.poster_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h3 className="serials-genre-h2">{show.name || show.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default GenreTv;
