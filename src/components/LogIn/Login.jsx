import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Modal from "react-modal";
import { closeModal } from "./modalSlice.js";
import axios from "axios";
import "./Login.css";

const LogIn = () => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.isOpenModal);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!username || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const { data: requestTokenData } = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`
      );
      const requestToken = requestTokenData.request_token;

      await axios.post(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
        {
          username,
          password,
          request_token: requestToken,
        }
      );

      const { data: sessionData } = await axios.post(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
        {
          request_token: requestToken,
        }
      );

      setMessage(`Successful entry! Session ID: ${sessionData.session_id}`);
      dispatch(closeModal());
    } catch (error) {
      console.error(
        "Login failed: " + error.response?.data?.status_message || error.message
      );
      setMessage("Login failed. Try again.");
    }
  };

  return (
    <div style={{ backgroundColor: "#D98E04" }}>
      {message && <p>{message}</p>}
      <Modal
        isOpen={modalOpen}
        onRequestClomodalse={() => dispatch(closeModal())}
        className="my-modal"
      >
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <h2 className="login-mondal">LogIn</h2>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="email"
            className="email"
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="password"
            required
          />

          <button
            className="show"
            onClick={() => setShowPassword(!showPassword)}
            style={{ marginLeft: "10px" }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          <button className="submit">Submit</button>

          <p className="important">
            To log in, you need to have an account on TMDB. Please enter your
            username and password that you use on TMDB.
          </p>
          <p className="important">
            Note: On TMDB, the username is exactly the username (not email) that
            you specified when registering.
          </p>
        </form>

        <button className="close" onClick={() => dispatch(closeModal())}>
          X
        </button>
      </Modal>
    </div>
  );
};
export default LogIn;
