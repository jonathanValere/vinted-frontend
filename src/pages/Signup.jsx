import styles from "./Signup.module.css";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default function SignUp({ visible, setVisible }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });

  const backOwn =
    "https://site--backend-vinted--lkcrzmx4xyh5.code.run/user/signup";

  // Gestion du formulaire -------
  const handleChangeGeneric = (event, field) => {
    // Copie du state
    const copyUser = { ...user };

    // Vérification pour la newsletter
    field === "newsletter"
      ? (copyUser["newsletter"] = !copyUser["newsletter"])
      : (copyUser[field] = event.target.value);

    // Mise à jour du state
    return setUser(copyUser);
  };

  // Gestion de la validation du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(backOwn, user);
      // Création du cookie qui expire au bout d'un jour
      Cookies.set("userToken", response.data.token, { expires: 1 });
      // Mise à zéro le message d'erreur
      setErrorMessage("");
      // Revenir à la page d'accueil
      return navigate("/");
    } catch (error) {
      const { message } = error.response.data;
      setErrorMessage(message);
    }
  };

  return (
    <section className={styles["section-signup"]}>
      <div className="container">
        <div className={styles["form-container"]}>
          <h1>S'inscrire</h1>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="">
              <input
                type="text"
                value={user.username}
                placeholder="Nom d'utilisateur"
                onChange={(event) => handleChangeGeneric(event, "username")}
              />
            </label>
            <label htmlFor="">
              <input
                type="email"
                value={user.email}
                placeholder="Email"
                onChange={(event) => handleChangeGeneric(event, "email")}
              />
            </label>
            <label htmlFor="">
              <input
                type="password"
                value={user.password}
                placeholder="Mot de passe"
                onChange={(event) => handleChangeGeneric(event, "password")}
              />
            </label>
            <label htmlFor="" className={styles["label-checkbox"]}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  value={user.newsletter}
                  checked={user.newsletter}
                  onChange={(event) => handleChangeGeneric(event, "newsletter")}
                />
                <span>S'inscrire à notre newsletter</span>
              </div>
              <p className={styles.cgu}>
                En m'inscrivant je confirme avoir lu et accepté les Termes &
                Conditions et Politique de Confidentialité de Vinted. Je
                confirme avoir au moins 18 ans.
              </p>
            </label>
            <button>S'inscrire</button>
            <Link to="/">Tu as déjà un compte ? Connecte-toi !</Link>
          </form>
        </div>
      </div>
      <button onClick={() => setVisible(!visible)}>Afficher</button>
    </section>
  );
}
