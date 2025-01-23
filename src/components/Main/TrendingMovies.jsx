import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TrendingMovies.css";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";

// import { Box, Link } from "@mui/material";

// import { Link } from "react-router-dom";

const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const logoImg =
    "https://Alevtina-98.github.io/popcorn-time/assets/img/Popcorn_Time_logo.png";

  // console.log(apiKey);

  useEffect(() => {
    const fetchtrendingAllMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`
        );
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchtrendingAllMovies();
  }, [apiKey]);

  const handleClick = (item) => {
    navigate("/details", { state: item });
  };

  return (
    <main className="main">
      <div>
        <img src={logoImg} alt="logo" className="anim-logo" />
      </div>
      <div className="trending-movies">
        <h2>Popular Movies</h2>
        <div className="movies-card">
          {trendingMovies.map((item) => (
            <div key={item.id} onClick={() => handleClick(item)}>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
              />
              <h3 className="title-movie">{item.title || item.name}</h3>
            </div>
          ))}
        </div>
      </div>
      <div>
        <img src={logoImg} alt="logo" className="anim-logo" />
      </div>
    </main>
  );
};

export default TrendingMovies;
