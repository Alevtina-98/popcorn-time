import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../LogIn/modalSlice";
import "./Header.css";

const logo = "/assets/img/Popcorn_Time_logo.png";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleLoginClick = () => {
    dispatch(openModal());
  };
  // console.log(dispatch(openModal()));

  return (
    <header className="header">
      <div className="popcorn-logo">
        <NavLink to="/popcorn time">
          <img src={logo} alt="logo" />
        </NavLink>
        <h4 className="popcorn-time">
          <NavLink to="/popcorn time">Popcorn Time</NavLink>
        </h4>
      </div>
      <div>
        <input type="text" placeholder="Search..." onChange={changeHandler} />
        <button onClick={handleSearch} className="search">
          Search
        </button>
      </div>
      <div className="buttons-header">
        <button className="login" onClick={handleLoginClick}>
          <NavLink to="/login">Log In</NavLink>
        </button>
      </div>
    </header>
  );
};

export default Header;
