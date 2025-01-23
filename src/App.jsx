import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./components/Search/Search";
import Header from "./components/Header/Header";
import Login from "./components/LogIn/Login";
import TrendingMovies from "./components/Main/TrendingMovies";
import MoviesTrendingDetalies from "./components/Main/MoviesTrendingDetails/MoviesTrendingDetails";
import Menu from "./components/Menu/Menu";
import GenreTv from "./components/Menu/Serials/GenreTv";
import TvShowDetails from "./components/Menu/Serials/SerialsDetalils/TvShowDetails";
import GenreMovies from "./components/Menu/Movies/GenreMovies";
import MovieDetails from "./components/Menu/Movies/MovieDetails/MovieDetails";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Menu />
        <Routes>
          <Route path="/popcorn time" element={<TrendingMovies />} />
          <Route index element={<TrendingMovies />} />
          {/* <Route path="/menu" element={<Menu />} /> */}
          <Route path="/movies/genres/:genreId" element={<GenreMovies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/tv/genres/:genreId" element={<GenreTv />} />
          <Route path="/tv/show/:id" element={<TvShowDetails />} />
          <Route path="/details" element={<MoviesTrendingDetalies />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
