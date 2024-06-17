import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Cookies
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        { email, password }
      );
      console.log(response);
      // console.log(response.data.token); // => token here
      const token = response.data.token;
      //   console.log(token);
      Cookies.set("token", token, { expires: 1 });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login container">
      <h2>Se connecter</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" value="Submit" style={{ cursor: "pointer" }}>
          Se connecter
        </button>
      </form>

      <Link to="/signup" style={{ textDecoration: "none" }}>
        <p>Pas encore de compte ? Inscris-toi !</p>
      </Link>
    </div>
  );
};

export default Login;
