import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./MoviesTrendingDetails.css";

const MoviesTrendingDetalils = () => {
  const location = useLocation();
  const movie = location.state;
  const [cast, setCast] = useState([]);
  const [movieTrendingVideos, setMovieTrendingVideos] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const [castTrendingResponse, videoTrendingResponse] = await Promise.all(
          [
            axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`
            ),

            axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`
            ),
          ]
        );

        const findTrendingMovieVideo = videoTrendingResponse.data.results.find(
          (video) => video.type === "Trailer"
        );
        setMovieTrendingVideos(
          findTrendingMovieVideo ? [findTrendingMovieVideo] : []
        );
        const mainCast = castTrendingResponse.data.cast.slice(0, 5);
        setCast(mainCast);
        // console.log(mainCast);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCast();
  }, [movie.id, apiKey]);

  return (
    <div className="details-movie">
      <div
        className="movie-part-1"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
          backgroundSize: "90% auto",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          objectFit: "cover",
          // backgroundColor: "rgb(166, 3, 17,0.9)",
          height: "100vh",
          position: "relative",
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
        />
        <div className="description-movie">
          <h2 className="title-movie">
            {movie.media_type === "movie" ? movie.title : movie.name}
          </h2>
          <h3 className="original-title-movie">
            Original name: {movie.original_title || movie.original_name}
          </h3>
          <p className="country-movie">
            Country:
            {movie.origin_country && movie.origin_country.length > 0 ? (
              Array.isArray(movie.origin_country) ? (
                movie.origin_country.join(", ")
              ) : (
                movie.origin_country
              )
            ) : (
              <span>No country information available</span>
            )}
          </p>

          <p className="genre-movie">
            Genre:
            {!movie.media_type || movie.media_type.length === 0
              ? "No information about genre"
              : movie.media_type}{" "}
          </p>
          <p className="release-date-movie">
            Release Date:
            {!movie.release_date || movie.release_date.length === 0
              ? "No release date information"
              : movie.release_date}
          </p>

          <p className="overview-movie">
            Overview:
            <br />
            <span>{movie.overview}</span>
          </p>
        </div>
      </div>
      <div className="cast">
        <h4 className="cast-title">Main cast</h4>
        {cast && Array.isArray(cast) && cast.length > 0 ? (
          <ul>
            {cast.map((actor) => (
              <li key={actor.id}>
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name || "Unknown actor"}
                  />
                ) : (
                  <div className="no-image">
                    <p>No image available.</p>
                  </div>
                )}
                <p>
                  {actor.name} as {actor.character}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-info-cast">No cast information available.</p>
        )}
      </div>
      <div className="video">
        <h3 className="trailer">Trailer</h3>
        {!movieTrendingVideos || movieTrendingVideos.length === 0 ? (
          <p className="no-videos">No videos available</p>
        ) : (
          movieTrendingVideos.map((video) => (
            <iframe
              key={video.id}
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.title}
              className="video-youtube"
              width="560"
              height="315"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></iframe>
          ))
        )}
      </div>
    </div>
  );
};

export default MoviesTrendingDetalils;
