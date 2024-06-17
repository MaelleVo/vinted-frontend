import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Cookies
import Cookies from "js-cookie";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleNewsletterChange = (event) => {
    const checked = event.target.checked;
    setNewsletter(checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username, email, password, newsletter);
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username,
          email,
          password,
          newsletter,
        }
      );
      console.log(response.data);
      // console.log(response.data.token); // => token here
      const token = response.data.token;
      console.log(token);
      Cookies.set("token", token, { expires: 1 });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signup container">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className="checkbox-div">
          <input
            id="checkbox"
            type="checkbox"
            name="newsletter"
            checked={newsletter}
            onChange={handleNewsletterChange}
          />
          <label htmlFor="checkbox">S'inscrire à notre newsletter</label>
        </div>

        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <button type="submit" value="Submit" style={{ cursor: "pointer" }}>
          S'inscrire
        </button>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <p className="link-account">Tu as déjà un compte ? Connecte-toi !</p>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
