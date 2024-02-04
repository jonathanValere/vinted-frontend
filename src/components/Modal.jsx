import styles from "./Modal.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Modal({ setVisible }) {
  const [isError, setIsError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [newsletter, setNewsletter] = useState(false);

  const url = "https://site--backend-vinted--lkcrzmx4xyh5.code.run/user/signup";
  // const backLocal = "http://localhost:3000/user/signup";
  const navigate = useNavigate();

  // Gestion de la validation du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Instanciation de l'objet formData
    const formData = new FormData();
    // Ajouter des données
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("newsletter", newsletter);

    try {
      const { data } = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Je crée un cookie à partir du Token généré par le serveur
      Cookies.set("userToken", data.token);
      // Si un message d'erreur était présent, je remets à zéro
      setIsError("");
      // Je masque la modal
      setVisible(false);
      // Redirection vers la page login
      navigate("/login");
    } catch (err) {
      if (err.data.status === 500) {
        console.error("An error occurred");
      } else {
        console.error(err.data.msg);
      }
    }
  };

  const handleGoLoginPage = () => {
    setVisible(false);
    return navigate("/login");
  };

  return (
    <div className={styles["modal-root"]}>
      <div className={styles.modal}>
        <FontAwesomeIcon icon="xmark" onClick={() => setVisible(false)} />
        <div className={styles["form-container"]}>
          <h1>S'inscrire</h1>
          {isError && <p className={styles.error}>{isError}</p>}
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="">
              <input
                type="text"
                value={username}
                placeholder="Nom d'utilisateur"
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
            <label htmlFor="">
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label htmlFor="">
              <input
                type="password"
                value={password}
                placeholder="Mot de passe"
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <label htmlFor="avatar">
              <input
                type="file"
                placeholder="Choisir son avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </label>
            <label htmlFor="" className={styles["label-checkbox"]}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  value={newsletter}
                  checked={newsletter}
                  onChange={() => setNewsletter(!newsletter)}
                />
                <span>S'inscrire à notre newsletter</span>
              </div>
              <p className={styles.cgu}>
                En m'inscrivant je confirme avoir lu et accepté les Termes &
                Conditions et Politique de Confidentialité de Vinted. Je
                confirme avoir au moins 18 ans.
              </p>
            </label>
            <button type="submit">S'inscrire</button>
            <p id={styles["btn-go-login"]} onClick={handleGoLoginPage}>
              Tu as déjà un compte ? Connecte-toi !
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
