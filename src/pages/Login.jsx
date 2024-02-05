// Import styles component
import styles from "./Login.module.css";

// Import des packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login({ setToken, setVisible, url }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const urlLogin = "https://site--backend-vinted--lkcrzmx4xyh5.code.run/user/login";
  // const urlLogin = "http://localhost:3000/user/login";
  const urlLogin = url + "/user/login";

  const handleChangeGeneric = (event, field) => {
    // Copie du state "user"
    const copyUser = { ...user };
    // Modification de la copie
    copyUser[field] = event.target.value;
    // Mise à jour du state avec la copie
    setUser(copyUser);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // la variable data me permet de récupérer le token provenant du serveur
      const { data } = await axios.post(urlLogin, user);

      // Je crée un cookie "userToken"
      Cookies.set("userToken", data.token, {
        secure: true,
      });
      // Je modifie le state token avec la valeur du token
      setToken(Cookies.get("userToken"));
      return navigate("/publish");
    } catch (error) {
      const { message } = error.response.data;
      return setError(message);
    }
  };

  return (
    <section className={styles["section-login"]}>
      <div className="container">
        <div className={styles["form-container"]}>
          <h1>Se connecter</h1>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="email">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Adresse email"
                value={user.email}
                onChange={(event) => handleChangeGeneric(event, "email")}
              />
            </label>
            <label htmlFor="password">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Mot de passe"
                value={user.password}
                onChange={(event) => handleChangeGeneric(event, "password")}
              />
            </label>
            <button type="submit">Se connecter</button>
            <p id={styles["btn-go-signup"]} onClick={() => setVisible(true)}>
              Tu n'as pas encore de compte ? Inscris-toi !
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
