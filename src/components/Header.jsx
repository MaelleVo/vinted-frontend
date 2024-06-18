// import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = ({ search, setSearch }) => {
  const token = Cookies.get("token");
  // Cookies.get("token");
  // console.log(Cookies.get("token"));
  // console.log(token);

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <>
      <div className="navbar container">
        <Link to="/">
          <img src="/logo-vinted.png" alt="logo" />
        </Link>
        <div className="search-input">
          <FontAwesomeIcon className="icon-search" icon="magnifying-glass" />
          <input
            type="text"
            placeholder="Rechercher des articles"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>

        {token ? (
          <Link to="/signup">
            <button className="none">S'inscrire</button>
          </Link>
        ) : (
          <Link to="/signup">
            <button>S'inscrire</button>
          </Link>
        )}
        {token ? (
          <button id="red" onClick={handleLogout}>
            Se déconnecter
          </button>
        ) : (
          <Link to="/login">
            <button>Se connecter</button>
          </Link>
        )}
        {token ? (
          <Link to="/publish">
            <button className="last-button">Vends tes articles</button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="last-button">Vends tes articles</button>
          </Link>
        )}
      </div>
      {/* <div className="toogle-div">
        <label htmlFor="toggle-label" className="toggle-label">
          Trier par:
          <input type="checkbox" className="toggle-input" />
        </label>
      </div> */}
    </>
  );
};

export default Header;
