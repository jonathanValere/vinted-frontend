import styles from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function Modal({ setVisible }) {
  const [isEmailExist, setIsEmailExist] = useState("");
  const backLeReacteur =
    "https://lereacteur-vinted-api.herokuapp.com/user/signup";
  const backOwn =
    "https://site--backend-vinted--lkcrzmx4xyh5.code.run/user/signup";
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });

  // Gestion du formulaire
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
      Cookies.set("userToken", response.data.token, { expires: 1 });
      setIsEmailExist("");
      setVisible(false);
      navigate("/");
    } catch (error) {
      const { message } = error.response.data;
      setIsEmailExist(message);
    }
  };

  const handleGoLogin = () => {
    setVisible(false);
    return navigate("/login");
  };

  return (
    <div className={styles["modal-root"]}>
      <div className={styles.modal}>
        <FontAwesomeIcon icon="xmark" onClick={() => setVisible(false)} />
        <div className={styles["form-container"]}>
          <h1>S'inscrire</h1>
          {isEmailExist && <p className={styles.error}>{isEmailExist}</p>}
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
            <p id={styles["btn-go-login"]} onClick={handleGoLogin}>
              Tu as déjà un compte ? Connecte-toi !
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
