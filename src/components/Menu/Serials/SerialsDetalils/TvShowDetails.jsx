import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TvShowDetalils.css";

const TvSnowDetails = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [tvShowVideos, setTvShowVideos] = useState([]);
  const [tvShowCast, setTvShowCast] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;
  const loader =
    "https://Alevtina-98.github.io/popcorn-time/assets/img/Popcorn_Time_logo.png";

  useEffect(() => {
    const fetchTvShowDetails = async () => {
      try {
        const [detailsResponse, videoResponse, castResponse] =
          await Promise.all([
            axios.get(
              `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
            ),
            axios.get(
              `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}`
            ),
            axios.get(
              `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}`
            ),
          ]);

        setTvShow(detailsResponse.data);

        const castShow = castResponse.data.cast.slice(0, 5);

        setTvShowCast(castShow);

        const findVideo = videoResponse.data.results.find(
          (video) => video.type === "Trailer"
        );
        setTvShowVideos(findVideo ? [findVideo] : []);
        console.log(videoResponse.data.results);
      } catch (error) {
        console.error("Failed to fetch TV show details:", error);
      }
    };
    fetchTvShowDetails();
  }, [id]);

  if (!tvShow || !tvShowVideos || !tvShowCast.length) {
    return (
      <div
        className="loader"
        style={{ backgroundImage: `url(${loader})` }}
      ></div>
    );
  }

  return (
    <div className="tv-show-details">
      <div
        className="tv-shows-part-1"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${tvShow.backdrop_path})`,
          backgroundSize: "90% auto",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          objectFit: "cover",
          height: "100vh",
          position: "relative",
        }}
      >
        <img
          className="tv-img"
          src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
          alt={tvShow.name || tvShow.title}
        />

        <div className="description">
          <h2 className="title">{tvShow.name || tvShow.title}</h2>
          <h3 className="original-title">
            Original name: {tvShow.original_title || tvShow.original_name}
          </h3>
          <p className="country">
            Country:
            {tvShow.origin_country && tvShow.origin_country.length > 0 ? (
              Array.isArray(tvShow.origin_country) ? (
                tvShow.origin_country.join(", ")
              ) : (
                tvShow.origin_country
              )
            ) : (
              <span>No country information available</span>
            )}
          </p>
          <p className="release-date">
            Release date:
            {tvShow.last_air_date && tvShow.last_air_date > 0
              ? tvShow.last_air_date
              : "No information about date"}
          </p>
          <p className="overview">
            Overview: <br />
            <span>
              {tvShow.overview.length > 0 ? (
                tvShow.overview
              ) : (
                <span>No information </span>
              )}
            </span>
          </p>
        </div>
      </div>
      <div className="cast">
        <h3 className="cast-title">Main Cast</h3>
        {tvShowCast ? (
          <ul>
            {tvShowCast.map((actor) => (
              <li key={actor.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                />
                <p>{actor.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No cast information available.</p>
        )}
      </div>
      <div className="video">
        <h3 className="trailer">Trailer</h3>
        {tvShowVideos.length === 0 ? (
          <p>No videos available for this show</p>
        ) : (
          tvShowVideos.map((video) => (
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

export default TvSnowDetails;
