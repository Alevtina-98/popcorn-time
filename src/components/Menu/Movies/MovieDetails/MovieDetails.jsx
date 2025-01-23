import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";

const MovieDetails = () => {
  const [detailsMovies, setDetailsMovies] = useState(null);
  const [movieCast, setMovieCast] = useState([]);
  const [movieVideos, setMovieVideos] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;
  const { id } = useParams();

  const loader =
    "https://Alevtina-98.github.io/popcorn-time/assets/img/Popcorn_Time_logo.png";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieResponse, videoResponse, castMovieResponse] =
          await Promise.all([
            axios.get(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
            ),
            axios.get(
              `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
            ),
            axios.get(
              `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
            ),
            axios.get(
              `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
            ),
          ]);
        setDetailsMovies(movieResponse.data);
        console.log(movieResponse.data);

        const sliceCast = castMovieResponse.data.cast.slice(0, 5);
        setMovieCast(sliceCast);

        const findMovieVideo = videoResponse.data.results.find(
          (video) => video.type === "Trailer"
        );
        setMovieVideos(findMovieVideo ? [findMovieVideo] : []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  if (!detailsMovies || !movieVideos || !movieCast) {
    return (
      <div
        className="loader"
        style={{ backgroundImage: `url(${loader})` }}
      ></div>
    );
  }
  return (
    <div className="movie-details">
      <div
        className="movie-part-1"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${detailsMovies.backdrop_path})`,
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
          src={`https://image.tmdb.org/t/p/w500${detailsMovies.poster_path}`}
          alt={detailsMovies.name || detailsMovies.title}
        />
        <div className="description">
          <h2 className="title">{detailsMovies.title || detailsMovies.name}</h2>
          <h3 className="original-title">
            Original name:{" "}
            {detailsMovies.original_title || detailsMovies.original_name}
          </h3>
          <p className="country-movie">
            Country:{" "}
            {detailsMovies.origin_country &&
            detailsMovies.origin_country.length > 0 ? (
              Array.isArray(detailsMovies.origin_country) ? (
                detailsMovies.origin_country.join(", ")
              ) : (
                detailsMovies.origin_country
              )
            ) : (
              <span>No country information available</span>
            )}
          </p>
          <p className="release-date">
            Release date:{" "}
            {detailsMovies.release_date &&
            detailsMovies.release_date.length > 0 ? (
              detailsMovies.release_date
            ) : (
              <span className="no-realease-date">
                {" "}
                No release date information
              </span>
            )}
          </p>
          <p className="overview">
            Overview: <br />
            <span>{detailsMovies.overview}</span>{" "}
          </p>
        </div>
      </div>
      <div className="cast">
        <h4 className="cast-title">Main cast</h4>
        {movieCast && Array.isArray(movieCast) && movieCast.length > 0 ? (
          <ul>
            {movieCast.map((actor) => (
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
        {!movieVideos || movieVideos.length === 0 ? (
          <p className="no-videos">No videos available for this show</p>
        ) : (
          movieVideos.map((video) => (
            <iframe
              key={video.id}
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.title}
              width="560"
              height="315"
              frameBorder="0"
              className="video-youtube"
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

export default MovieDetails;
