import "./Footer.css";
const logo =
  "https://Alevtina-98.github.io/popcorn-time/assets/img/Popcorn_Time_logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <p className="all-rights">All rights reserved</p>

      <div className="footer-logo">
        <img src={logo} alt="logo" />
        <p> © 2025 Popcorn Time</p>
      </div>
    </div>
  );
};
export default Footer;
